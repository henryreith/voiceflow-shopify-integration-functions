# Voiceflow Shopify Integration Functions
A collection of VoiceFlow functions to integrate VoiceFlow and Shopify. I will add more over the coming days. 

## Setting Up The Integration
For easy management and security, the Shopify API details are imported into the function from variables. To save yourself from having to reenter all your API details each time, i suggest setting up variables:
- shopifyAPIKey,
- shopifyAPISecretKey,
- shopifyAccessToken,
- shopifyShopName

Then for each variable add the corrisponding API detail as it's default value e.g. https://www.awesomescreenshot.com/image/49353124?key=ff1baa37d313525e7d39281f3f68dde3

You will also need to setup a (custom app)[https://help.shopify.com/en/manual/apps/app-types/custom-apps "Shopify Custom Apps"] in Shopify and give it the required access scopes it needs to carry out each script. See here: https://www.awesomescreenshot.com/image/49353545?key=dcefb75ee81228cb8b9689283bdad3c7

## List of Avaliable Functions
- Get customer order data based on the users email address. (requires the 'read_orders' access scope)
