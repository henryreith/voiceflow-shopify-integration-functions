export default async function main(args) {
  // Destructuring to get email from inputVars, plus all the Shopify API data 
  const { email, shopifyAPIKey, shopifyAPISecretKey, shopifyAccessToken, shopifyShopName } = args.inputVars;

  // Check if email is provided
  if (!email) {
    return {
      next: { path: 'error' },
      trace: [{
        type: 'text',
        payload: { message: "Missing email" }
      }]
    };
  }
  
  // Endpoint to get orders for a specific customer email
  const requestUrl = `https://${shopifyAPIKey}:${shopifyAPISecretKey}@${shopifyShopName}.myshopify.com/admin/api/2024-04/orders.json?status=any&email=${email}`;
  
  try {
    // Making the GET request to the Shopify API with headers
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': shopifyAccessToken
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseRequest = await response;
    const responseData = responseRequest.json; // Accessing the response body
    const orderData = responseData.orders;
    
    // Ensure the response contains order data
    if (!orderData || orderData.length === 0) {
      throw new Error('No orders found for this email.');
    }

    // Build carousel object from the order data
    const carousel = {
      'layout': 'Carousel',
      'cards': []
    };

    // Iterate over each order in the data array
    orderData.forEach((order) => {
      const title = `Order #${order.name}`;
      const body = `Status: ${order.financial_status}\nTotal: ${order.total_price} ${order.currency}`;
      const statusUrl = order.order_status_url;

      carousel.cards.push({
        imageUrl: "", // Replace with a relevant image URL if available (requires another API call that i will do in an updated script)
        title: title,
        description: {
          text: body
        },
        buttons: [
          {
            name: "View Order",
            payload: {
              actions: [
                {
                  type: "open_url",
                  url: statusUrl // Adds the order status URL to view the order if it's available
                }
              ]
            }
          }
        ]
      });
    });

    // Return the carousel trace
    return {
      next: { path: 'success' },
      trace: [
        {
          type: "carousel",
          payload: carousel
        }
      ]
    };

  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [{
        type: 'debug',
        payload: { message: `Failed to fetch order data: ${error.message}` }
      }]
    };
  }
}
