import { Request, Response, Router } from "express";
import axios from "axios";

export const setGoogleShoppingRoutes = (routes: Router) => {
    // Step 1: Replace these values with your Google Content API credentials
    const clientId = "your_google_client_id";
    const clientSecret = "your_google_client_secret";
    const redirectUri = "your_redirect_uri";
    let googleAccessToken: string;

    // Step 2: Endpoint to obtain access token from Google Content API
    routes.post('/v1/google/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.post('https://accounts.google.com/o/oauth2/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    code: request.body.code, // The authorization code received from the frontend
                },
            });

            googleAccessToken = tokenResponse.data.access_token;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to obtain Google access token");
        }
    });

    // Route to list products using Google Content API
    routes.get('/v1/google/listProducts', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/google/getAccessToken first.");
            }

            const apiResponse = await axios.get('https://www.googleapis.com/content/v2/products', {
                headers: {
                    'Authorization': `Bearer ${googleAccessToken}`,
                },
                params: {
                    // Add your query parameters here based on the API documentation
                },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to list products from Google Content API");
        }
    });

    // Route to search products using Google Content API
    routes.post('/v1/google/searchProducts', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/google/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://www.googleapis.com/content/v2/products/search', {
                // Add your search parameters here based on the API documentation
                request: { /* Your search request data */ }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to search products from Google Content API");
        }
    });

    // Additional routes for other Google Content API actions can be added here

    // Example route to update product information
    routes.post('/v1/google/updateProduct', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/google/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://www.googleapis.com/content/v2/products/update', {
                // Add your product update data here based on the API documentation
                product: { /* Your product update input data */ }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update product using Google Content API");
        }
    });

    // Example route to delete a product
    routes.delete('/v1/google/deleteProduct/:productId', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/google/getAccessToken first.");
            }

            const apiResponse = await axios.delete(`https://www.googleapis.com/content/v2/products/${request.params.productId}`, {
                headers: {
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete product using Google Content API");
        }
    });

    // Additional routes for other product-related actions can be added here

    routes.post('/v1/google/createProduct', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://content.googleapis.com/content/v2.1/${merchantId}/products`, {
                "offerId": "book123",
                "title": "A Tale of Two Cities",
                // Adicione os outros atributos do produto conforme necessário
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar o produto usando a API Content do Google");
        }
    });

    // Rota para listar produtos usando a API Content for Shopping
    routes.get('/v1/google/listProducts', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://content.googleapis.com/content/v2.1/${merchantId}/products`, {
                headers: {
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar produtos usando a API Content do Google");
        }
    });

    // Rota para recuperar um produto específico usando a API Content for Shopping
    routes.get('/v1/google/getProduct/:productId', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://content.googleapis.com/content/v2.1/${merchantId}/products/${request.params.productId}`, {
                headers: {
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar um produto usando a API Content do Google");
        }
    });

    // Rota para atualizar a disponibilidade de um produto usando a API Content for Shopping
    routes.post('/v1/google/updateProductAvailability/:productId', async (request: Request, response: Response) => {
        try {
            if (!googleAccessToken) {
                return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://content.googleapis.com/content/v2.1/${merchantId}/products/${request.params.productId}`, {
                "availability": "out of stock"
                // Adicione outros dados de atualização conforme necessário
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar a disponibilidade de um produto usando a API Content do Google");
        }
    });

};