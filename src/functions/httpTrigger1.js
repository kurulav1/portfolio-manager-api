const { app } = require('@azure/functions');
const fetch = require('node-fetch');
app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'products/{category:alpha}/{id:int?}',
    handler: async (request, context) => {
        context.log(`HTTP function processed request for URL "${request.url}"`);

        try {
            // Forward the request to the Express app
            const response = await fetch(`https://portfolio-manager-1.azurewebsites.net${request.url}`, {
                method: request.method,
                headers: request.headers,
                body: request.rawBody
            });

            // Retrieve response from the Express app
            const responseBody = await response.text();

            // Return the response from the Express app
            return {
                status: response.status,
                headers: response.headers.raw(),
                body: responseBody
            };
        } catch (error) {
            context.log.error(`Error forwarding request: ${error.message}`);
            return {
                status: 500,
                body: `Error forwarding request: ${error.message}`
            };
        }
    }
});
