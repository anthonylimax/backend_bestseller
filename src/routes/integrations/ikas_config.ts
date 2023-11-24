import { Request, Response, Router } from "express";
import axios, { AxiosRequestConfig } from "axios";

export const setIkasRoutes = (routes: Router) => {
    let ikasAccessToken: string;

    routes.post('/v1/ikas/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.post('https://api.myikas.com/api/v1/admin/oauth/token', {
                grant_type: 'client_credentials',
                client_id: 'your_client_id',
                client_secret: 'your_client_secret',
            });

            ikasAccessToken = tokenResponse.data.access_token;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to obtain ikas access token");
        }
    });

    routes.post('/v1/ikas/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = ikasAccessToken
            response.json(tokenResponse);
        } catch (error) {
            console.error(error);
        }
    });

    routes.get('/v1/ikas/listProducts', async (request: Request, response: Response) => {
        try {
            const apiResponse = await ikasAccessToken('/api/v1/admin/listProduct', {
                includeDeleted: false,
                pagination: { page: 1, perPage: 10 },
                sort: 'name',
            });

            response.json(apiResponse);
        } catch (error) {
            console.error(error);
        }
    });

    routes.post('/v1/ikas/searchProducts', async (request: Request, response: Response) => {
        try {
            const apiResponse = await makeIkasApiRequest('/api/v1/admin/searchProducts', {
                input: { /* Your search input data */ }
            });

            response.json(apiResponse);
        } catch (error) {
            console.error(error);
        }
    });

    // Adicione rotas semelhantes para outras ações relacionadas a produtos

    routes.post('/v1/ikas/uploadImage', async (request: Request, response: Response) => {
        try {
            const apiResponse = await makeIkasApiRequest('/api/v1/admin/product/upload/image', {
                productImage: { /* Your image upload input data */ }
            });

            response.json(apiResponse);
        } catch (error) {
            console.error(error);
        }
    });
    routes.post('/v1/ikas/manageProducts', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/manageProducts', {
                // Add your manage product data here based on the API documentation
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to manage products via ikas API");
        }
    });
    routes.post('/v1/ikas/saveProduct', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/graphql', {
                query: `
                    mutation {
                        saveProduct(
                            input: { /* Your product input data */ }
                        ) {
                            // Define the structure of the response as needed
                        }
                    }
                `,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to save or update product via ikas API");
        }
    });
    routes.post('/v1/ikas/listOrders', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/graphql', {
                query: `
                    mutation {
                        listOrder(
                            id: { /* Your ID filter input data */ },
                            archived: false,
                            currencyCode: "USD",
                            customerId: { /* Your customer ID filter input data */ },
                            itemCount: { /* Your item count filter input data */ },
                            orderPaymentStatus: "PAID",
                            orderStatus: "PROCESSING",
                            salesChannelId: { /* Your sales channel ID filter input data */ },
                            shippingMethod: "STANDARD",
                            storefrontId: { /* Your storefront ID filter input data */ },
                            totalPrice: { /* Your total price filter input data */ }
                        ) {
                            id
                            archived
                            currencyCode
                            customerId
                            itemCount
                            orderPaymentStatus
                            orderStatus
                            salesChannelId
                            shippingMethod
                            storefrontId
                            totalPrice
                        }
                    }
                `,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to list orders from ikas API");
        }
    });

    // Route to search orders
    routes.post('/v1/ikas/searchOrders', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/graphql', {
                query: `
                    mutation {
                        searchOrders(
                            input: { /* Your search input data */ }
                        ) {
                            // Define the structure of the response as needed
                        }
                    }
                `,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to search orders from ikas API");
        }
    });

    // Route to save or update an order
    routes.post('/v1/ikas/saveOrder', async (request: Request, response: Response) => {
        try {
            if (!ikasAccessToken) {
                return response.status(400).send("Access token not obtained. Call /v1/ikas/getAccessToken first.");
            }

            const apiResponse = await axios.post('https://api.myikas.com/api/v1/admin/graphql', {
                query: `
                    mutation {
                        saveOrder(
                            input: { /* Your order input data */ }
                        ) {
                            // Define the structure of the response as needed
                        }
                    }
                `,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ikasAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to save or update order via ikas API");
        }
    });
// Adicione rotas para ações relacionadas ao checkout
routes.post('/v1/ikas/getCheckout', async (request: Request, response: Response) => {
    try {
        const apiResponse = await makeIkasApiRequest('/api/v1/admin/getCheckout', {
            checkoutId: 'your_checkout_id', // Substitua pelo seu ID de checkout
        });

        response.json(apiResponse);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o checkout via API do ikas");
    }
});

routes.post('/v1/ikas/createOrder', async (request: Request, response: Response) => {
    try {
        const apiResponse = await makeIkasApiRequest('/api/v1/admin/createOrder', {
            // Adicione seus dados de criação de pedido aqui
        });

        response.json(apiResponse);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar pedido via API do ikas");
    }
});

routes.post('/v1/ikas/updateOrderStatus', async (request: Request, response: Response) => {
    try {
        const apiResponse = await makeIkasApiRequest('/api/v1/admin/updateOrderStatus', {
            // Adicione seus dados de atualização de status do pedido aqui
        });

        response.json(apiResponse);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o status do pedido via API do ikas");
    }
});

};
