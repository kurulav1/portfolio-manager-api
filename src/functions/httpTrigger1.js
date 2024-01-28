const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        // Forward the request to the Express app
        const response = await fetch(`https://portfolio-manager-1.azurewebsites.net${req.url}`, {
            method: req.method,
            headers: req.headers,
            body: req.rawBody // Assuming the body is already in the correct format
        });

        // Retrieve response from the Express app
        const responseBody = await response.text();

        context.res = {
            // Propagate status and headers from the Express app response
            status: response.status,
            headers: response.headers.raw(),
            body: responseBody
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error forwarding request: " + error.message
        };
    }
};
