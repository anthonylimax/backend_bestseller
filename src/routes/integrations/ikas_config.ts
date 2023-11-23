import { Request, Response, Router } from "express";
import axios from "axios";

export const setIkasRoutes = (routes: Router) => {
    // Step 1: Replace these values with your ikas Private App credentials
    const clientId = "your_client_id";
    const clientSecret = "your_client_secret";
    const yourStoreName = "your_store_name";
    let ikasAccessToken: string;

    // Step 2: Endpoint to obtain access token from ikas
    routes.post('/v1/ikas/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.post(`https://${yourStoreName}.myikas.com/api/admin/oauth/token`, {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            });

            ikasAccessToken = tokenResponse.data.access_token;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to obtain ikas access token");
        }
    });

    // Route to list products
    routes.get('/v1/ikas/listProducts', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/listProduct', {
                // Add your query parameters here based on the API documentation
                includeDeleted: false,
                pagination: { page: 1, perPage: 10 },
                sort: 'name',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to list products from ikas API");
        }
    });

    // Route to search products
    routes.post('/v1/ikas/searchProducts', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/searchProducts', {
                // Add your search parameters here based on the API documentation
                input: { /* Your search input data */ }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to search products from ikas API");
        }
    });

    // Additional routes for other product-related actions can be added here

    // Example route to upload an image
    routes.post('/v1/ikas/uploadImage', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/product/upload/image', {
                // Add your image upload data here based on the API documentation
                productImage: { /* Your image upload input data */ }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to upload image to ikas API");
        }
    });


};