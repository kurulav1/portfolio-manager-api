const { app } = require('@azure/functions');
const fetch = require('node-fetch'); // node-fetch is used to make HTTP requests

app.http('portfolio-http-trigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const expressBaseUrl = 'portfolio-manager-1.azurewebsites.net';

        const forwardUrl = `${expressBaseUrl}/api${request.url}`;

        const response = await fetch(forwardUrl, {
            method: request.method,
            headers: request.headers,
            body: request.method === 'GET' ? null : JSON.stringify(request.body),
        });

        const responseData = await response.json();

        return {
            status: response.status,
            body: responseData,
            headers: response.headers,
        };
    }
});
