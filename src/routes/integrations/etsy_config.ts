import { Request, Response, Router } from "express";
import axios from "axios";

let accessToken: string | null = null;

export const setRoutes = (routes: Router) => {
    routes.post('/authenticate', async (request: Request, response: Response) => {
        try {
            const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTH_CODE } = request.body;

            const tokenData = {
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: AUTH_CODE,
                redirect_uri: REDIRECT_URI,
            };

            const headers = {
                'Content-Type': 'application/json',
            };

            const authResponse = await axios.post('https://openapi.etsy.com/v3/public/oauth/token', tokenData, { headers });

            if (authResponse.status === 200) {
                accessToken = authResponse.data.access_token;
                response.send({ message: "Autenticação bem-sucedida" });
            } else {
                response.status(authResponse.status).send("Falha na autenticação");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não foi possível autenticar");
        }
    });
    routes.post('/getBuyerTaxonomyProperties', async (request: Request, response: Response) => {
        try {
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
            const taxonomyId = '<TAXONOMY_ID>'; // Substitua pelo ID da taxonomia desejada

            const getPropertiesByBuyerTaxonomyIdUrl = `https://openapi.etsy.com/v3/application/buyer-taxonomy/nodes/${taxonomyId}/properties`;

            const headers = {
                'Content-Type': 'application/json',
                'api_key': '<SUA_API_KEY>', // Substitua pela sua chave da API Etsy
            };

            const etsyApiResponse = await axios.get(getPropertiesByBuyerTaxonomyIdUrl, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    routes.post('/getSellerTaxonomyNodes', async (request: Request, response: Response) => {
        try {
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
            const getSellerTaxonomyNodesUrl = 'https://openapi.etsy.com/v3/application/seller-taxonomy/nodes';

            const headers = {
                'Content-Type': 'application/json',
                'api_key': '<SUA_API_KEY>', // Substitua pela sua chave da API Etsy
            };

            const etsyApiResponse = await axios.get(getSellerTaxonomyNodesUrl, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    routes.post('/getSellerTaxonomyProperties', async (request: Request, response: Response) => {
        try {
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
            const taxonomyId = '<TAXONOMY_ID>'; // Substitua pelo ID da taxonomia desejada
            const getPropertiesByTaxonomyIdUrl = `https://openapi.etsy.com/v3/application/seller-taxonomy/nodes/${taxonomyId}/properties`;

            const headers = {
                'Content-Type': 'application/json',
                'api_key': '<SUA_API_KEY>', // Substitua pela sua chave da API Etsy
            };

            const etsyApiResponse = await axios.get(getPropertiesByTaxonomyIdUrl, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getPropertiesByTaxonomy/:taxonomyId', async (request: Request, response: Response) => {
        try {
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
            const { taxonomyId } = request.params;

            // Exemplo de chamada à API getPropertiesByTaxonomyId
            const getPropertiesByTaxonomyIdUrl = `https://openapi.etsy.com/v3/application/seller-taxonomy/nodes/${taxonomyId}/properties`;

            const headers = {
                'Content-Type': 'application/json',
                'api_key': '<SUA_API_KEY>', // Substitua pela sua chave da API Etsy
            };

            const etsyApiResponse = await axios.get(getPropertiesByTaxonomyIdUrl, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/createDraftListing', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            // Dados da solicitação de criação de rascunho de listagem
            const requestData = {
                shop_id: 123, // Substitua pelo ID da loja desejada
                quantity: 10,
                title: "Exemplo de Listagem",
                description: "Descrição da listagem de exemplo.",
                price: 19.99,
                who_made: "i_did",
                when_made: "made_to_order",
                taxonomy_id: 456, // Substitua pelo ID da taxonomia desejada
                shipping_profile_id: 789, // Substitua pelo ID do perfil de envio desejado
                // Adicione outros campos conforme necessário para atender aos requisitos da API
            };

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.post('https://openapi.etsy.com/v3/application/createDraftListing', requestData, { headers });

            if (etsyApiResponse.status === 201) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(201).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingsByShop/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;

            // Dados da solicitação para obter listagens por loja
            const queryParams = {
                state: "active", // Substitua conforme necessário
                limit: 25,
                offset: 0,
                sort_on: "created",
                sort_order: "desc",
                includes: ["Shipping", "Images", "Shop", "User", "Translations", "Inventory", "Videos"],
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings`, { headers, params: queryParams });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.delete('/deleteListing/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const listingId = request.params.listing_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/listings/${listingId}`, { headers });

            if (etsyApiResponse.status === 204) {
                response.sendStatus(204);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListing/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const listingId = request.params.listing_id;
    
            const queryParams = {
                includes: ["Shipping", "Images", "Shop", "User", "Translations", "Inventory", "Videos"],
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingId}`, { headers, params: queryParams });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/findAllListingsActive', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const queryParams = {
                limit: 25,
                offset: 0,
                sort_on: "created",
                sort_order: "desc",
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get('https://openapi.etsy.com/v3/application/findAllListingsActive', { headers, params: queryParams });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/findAllActiveListingsByShop/:shop_id/listings/active', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;

            const queryParams = {
                limit: 25,
                sort_on: "created",
                sort_order: "desc",
                offset: 0,
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active`, { headers, params: queryParams });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingsByListingIds', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const queryParams = {
                listing_ids: [/* adicione os IDs desejados */],
                includes: ["Shipping", "Images", "Shop", "User", "Translations", "Inventory", "Videos"],
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get('https://openapi.etsy.com/v3/application/listings/batch', { headers, params: queryParams });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getFeaturedListingsByShop/:shop_id/listings/featured', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
    
            const queryParams = {
                limit: 25,
                offset: 0,
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/featured`, { headers, params: queryParams });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.delete('/deleteListingProperty/:shop_id/:listing_id/:property_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const propertyId = request.params.property_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/listings/${listingId}/properties/${propertyId}`, { headers });
    
            if (etsyApiResponse.status === 204) {
                response.sendStatus(204);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.put('/updateListingProperty/:shop_id/:listing_id/:property_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const propertyId = request.params.property_id;

            const requestBody = {
                value_ids: [/* adicione os IDs desejados */],
                values: [/* adicione os valores desejados */],
                scale_id: 1, // Substitua pelo valor apropriado
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/properties/${propertyId}`, requestBody, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingProperty/:listing_id/:property_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const listingId = request.params.listing_id;
            const propertyId = request.params.property_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingId}/properties/${propertyId}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingProperties/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/properties`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.patch('/updateListing/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
    
            const requestBody = {
                image_ids: [/* adicione os IDs desejados */],
                title: "string", // Substitua pela string apropriada
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
    
            const etsyApiResponse = await axios.patch(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}`, requestBody, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.put('/updateListingDeprecated/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;

            const requestBody = {
                image_ids: [/* adicione os IDs desejados */],
                title: "string", // Substitua pela string apropriada
                // Adicione outros parâmetros conforme necessário para atender aos requisitos da API
            };

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}`, requestBody, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingsByShopReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const receiptId = request.params.receipt_id;
    
            const limit = request.query.limit || 25;
            const offset = request.query.offset || 0;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/receipts/${receiptId}/listings?limit=${limit}&offset=${offset}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingsByShopReturnPolicy/:shop_id/:return_policy_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const returnPolicyId = request.params.return_policy_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/policies/return/${returnPolicyId}/listings`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingsByShopSectionId/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const shopSectionIds = request.query.shop_section_ids;
    
            const limit = request.query.limit || 25;
            const offset = request.query.offset || 0;
            const sortOn = request.query.sort_on || "created";
            const sortOrder = request.query.sort_order || "desc";
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings?shop_section_ids=${shopSectionIds}&limit=${limit}&offset=${offset}&sort_on=${sortOn}&sort_order=${sortOrder}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.delete('/deleteListingFile/:shop_id/:listing_id/files/:listing_file_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const listingFileId = request.params.listing_file_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/files/${listingFileId}`, { headers });

            if (etsyApiResponse.status === 204) {
                response.status(204).send(); // Sem conteúdo, pois é uma exclusão bem-sucedida
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingFile/:shop_id/:listing_id/files/:listing_file_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const listingFileId = request.params.listing_file_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/files/${listingFileId}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getAllListingFiles/:shop_id/:listing_id/files', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/files`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/uploadListingFile/:shop_id/:listing_id/files', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
    
            const listingFileId = request.body.listing_file_id;
            const fileData = request.body.file; // Conteúdo binário do arquivo
            const fileName = request.body.name;
            const rank = request.body.rank || 1; // Rank padrão é 1 se não fornecido
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            };
    
            const formData = new FormData();
            formData.append('listing_file_id', listingFileId);
            formData.append('file', fileData, { filename: fileName });
            formData.append('rank', rank);
    
            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/files`, formData, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.delete('/deleteListingImage/:shop_id/:listing_id/images/:listing_image_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const listingImageId = request.params.listing_image_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/images/${listingImageId}`, { headers });

            if (etsyApiResponse.status === 204) {
                response.status(204).send(); // Sem conteúdo, pois é uma exclusão bem-sucedida
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingImageDeprecated/:shop_id/:listing_id/images/:listing_image_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
            const listingImageId = request.params.listing_image_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/images/${listingImageId}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingImage/:listing_id/images/:listing_image_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const listingId = request.params.listing_id;
            const listingImageId = request.params.listing_image_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingId}/images/${listingImageId}`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingImages/:listing_id/images', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const listingId = request.params.listing_id;
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
    
            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingId}/images`, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/uploadListingImage/:shop_id/:listing_id/images', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }
    
            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;
    
            const imageFile = request.body.image; // Conteúdo binário do arquivo
            const listingImageId = request.body.listing_image_id;
            const rank = request.body.rank || 1; // Rank padrão é 1 se não fornecido
            const overwrite = request.body.overwrite || false; // Sobrescrever imagem existente
            const isWatermarked = request.body.is_watermarked || false;
            const altText = request.body.alt_text || "";
    
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            };
    
            const formData = new FormData();
            formData.append('image', imageFile, { filename: 'image.jpg' });
            formData.append('listing_image_id', listingImageId);
            formData.append('rank', rank);
            formData.append('overwrite', overwrite);
            formData.append('is_watermarked', isWatermarked);
            formData.append('alt_text', altText);
    
            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/images`, formData, { headers });
    
            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingImagesDeprecated/:shop_id/:listing_id/images', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const shopId = request.params.shop_id;
            const listingId = request.params.listing_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings/${listingId}/images`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingInventory/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const listingId = request.params.listing_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listingId}/inventory`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o inventário de uma listagem
    routes.put('/updateListingInventory/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const listingId = request.params.listing_id;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const requestData = {
                products: [
                    // ... dados do produto a serem fornecidos
                ],
                price_on_property: [
                    // ... dados sobre propriedades de preço
                ],
                quantity_on_property: [
                    // ... dados sobre propriedades de quantidade
                ],
                sku_on_property: [
                    // ... dados sobre propriedades de SKU
                ]
            };

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/listings/${listingId}/inventory`, requestData, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingOffering/:listing_id/:product_id/:product_offering_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { listing_id, product_id, product_offering_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listing_id}/products/${product_id}/offerings/${product_offering_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter um produto de listagem
    routes.get('/getListingProduct/:listing_id/:product_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { listing_id, product_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listing_id}/inventory/products/${product_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/createListingTranslation/:shop_id/:listing_id/:language', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id, language } = request.params;
            const { title, description, tags } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const data = new URLSearchParams({
                title,
                description,
                tags: JSON.stringify(tags),
            });

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/translations/${language}`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter uma tradução de listagem
    routes.get('/getListingTranslation/:shop_id/:listing_id/:language', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id, language } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/translations/${language}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar uma tradução de listagem
    routes.put('/updateListingTranslation/:shop_id/:listing_id/:language', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id, language } = request.params;
            const { title, description, tags } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const data = new URLSearchParams({
                title,
                description,
                tags: JSON.stringify(tags),
            });

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/translations/${language}`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getListingVariationImages/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/variation-images`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar imagens de variação em uma listagem
    routes.post('/updateVariationImages/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id } = request.params;
            const { variation_images } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            const data = {
                variation_images,
            };

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/variation-images`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.delete('/deleteListingVideo/:shop_id/:listing_id/:video_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id, video_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/videos/${video_id}`, { headers });

            if (etsyApiResponse.status === 204) {
                response.status(204).end();
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter informações de um vídeo de uma listagem
    routes.get('/getListingVideo/:listing_id/:video_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { listing_id, video_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listing_id}/videos/${video_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter todos os vídeos de uma listagem
    routes.get('/getListingVideos/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { listing_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listing_id}/videos`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para fazer o upload de um vídeo para uma listagem
    routes.post('/uploadListingVideo/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id } = request.params;
            const { video_id, video, name } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            };

            const data = new FormData();
            data.append('video_id', video_id);
            data.append('video', video, { filename: name });

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/videos`, data, { headers });

            if (etsyApiResponse.status === 201) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(201).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopPaymentAccountLedgerEntry/:shop_id/:ledger_entry_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, ledger_entry_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/payment-account/ledger-entries/${ledger_entry_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter todos os registros do histórico de conta de pagamento da loja
    routes.get('/getShopPaymentAccountLedgerEntries/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { min_created, max_created, limit, offset } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                min_created,
                max_created,
                limit,
                offset,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/payment-account/ledger-entries`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter pagamentos de um histórico de conta de pagamento da loja
    routes.get('/getPaymentAccountLedgerEntryPayments/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { ledger_entry_ids } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                ledger_entry_ids,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/payment-account/ledger-entries/payments`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter um pagamento específico de um recibo
    routes.get('/getShopPaymentByReceiptId/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}/payments`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter uma lista de pagamentos de uma loja
    routes.get('/getPayments/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { payment_ids } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                payment_ids,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/payments`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o status de um recibo de uma loja no Etsy
    routes.put('/updateShopReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;
            const { was_shipped, was_paid } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const data = {
                was_shipped,
                was_paid,
            };

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o status de um recibo de uma loja no Etsy
    routes.put('/updateShopReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;
            const { was_shipped, was_paid } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const data = {
                was_shipped,
                was_paid,
            };

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopReceipts/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { min_created, max_created, min_last_modified, max_last_modified, limit, offset, sort_on, sort_order, was_paid, was_shipped, was_delivered, was_canceled } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                min_created,
                max_created,
                min_last_modified,
                max_last_modified,
                limit,
                offset,
                sort_on,
                sort_order,
                was_paid,
                was_shipped,
                was_delivered,
                was_canceled,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para criar uma remessa de recibo de uma loja no Etsy
    routes.post('/createReceiptShipment/:shop_id/:receipt_id/tracking', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;
            const { tracking_code, carrier_name, send_bcc, note_to_buyer } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const data = {
                tracking_code,
                carrier_name,
                send_bcc,
                note_to_buyer,
            };

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}/tracking`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopReceiptTransactionsByListing/:shop_id/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, listing_id } = request.params;
            const { limit, offset } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                limit,
                offset,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/listings/${listing_id}/transactions`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter transações associadas a um recibo específico em uma loja no Etsy
    routes.get('/getShopReceiptTransactionsByReceipt/:shop_id/:receipt_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, receipt_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/receipts/${receipt_id}/transactions`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter uma transação específica em uma loja no Etsy
    routes.get('/getShopReceiptTransaction/:shop_id/:transaction_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, transaction_id } = request.params;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/transactions/${transaction_id}`, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter transações associadas a uma loja no Etsy
    routes.get('/getShopReceiptTransactionsByShop/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { limit, offset } = request.query;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const params = {
                limit,
                offset,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/transactions`, { headers, params });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getReviewsByListing/:listing_id', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { listing_id } = request.params;
            const { limit, offset, min_created, max_created } = request.query;

            const params = {
                limit,
                offset,
                min_created,
                max_created,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/listings/${listing_id}/reviews`, { params, headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter avaliações de uma loja no Etsy
    routes.get('/getReviewsByShop/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { limit, offset, min_created, max_created } = request.query;

            const params = {
                limit,
                offset,
                min_created,
                max_created,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/reviews`, { params, headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter transportadoras de envio disponíveis para um país
    routes.get('/getShippingCarriers', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { origin_country_iso } = request.query;

            const params = {
                origin_country_iso,
            };

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shipping-carriers`, { params, headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para criar um novo perfil de envio para uma loja no Etsy
    routes.post('/createShopShippingProfile/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { title, origin_country_iso, primary_cost, secondary_cost, min_processing_time, max_processing_time, processing_time_unit, destination_country_iso, destination_region, origin_postal_code, shipping_carrier_id, mail_class, min_delivery_days, max_delivery_days } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const data = new URLSearchParams({
                title,
                origin_country_iso,
                primary_cost,
                secondary_cost,
                min_processing_time,
                max_processing_time,
                processing_time_unit,
                destination_country_iso,
                destination_region,
                origin_postal_code,
                shipping_carrier_id,
                mail_class,
                min_delivery_days,
                max_delivery_days,
            });

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/createShopShippingProfile`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShopShippingProfiles/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles`, { headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para deletar um perfil de envio de uma loja no Etsy
    routes.delete('/deleteShopShippingProfile/:shop_id/:shipping_profile_id', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`, { headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 204) {
                response.status(204).send();
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter um perfil de envio específico de uma loja no Etsy
    routes.get('/getShopShippingProfile/:shop_id/:shipping_profile_id', async (request: Request, response: Response) => {
        try {
            // Verifique se a chave da API está disponível
            if (!accessToken) {
                response.status(401).send("Chave da API não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`, { headers: { 'api_key': accessToken } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar um perfil de envio de uma loja no Etsy
    routes.put('/updateShopShippingProfile/:shop_id/:shipping_profile_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso existe
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;
            const { title, origin_country_iso, min_processing_time, max_processing_time, processing_time_unit, origin_postal_code } = request.body;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const data = new URLSearchParams({
                title,
                origin_country_iso,
                min_processing_time,
                max_processing_time,
                processing_time_unit,
                origin_postal_code,
            });

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}`, data, { headers });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/createShopShippingProfileDestination/:shop_id/:shipping_profile_id/destinations', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;
            const { primary_cost, secondary_cost, destination_country_iso, destination_region, shipping_carrier_id, mail_class, min_delivery_days, max_delivery_days } = request.body;

            const data = new URLSearchParams({
                primary_cost,
                secondary_cost,
                destination_country_iso,
                destination_region,
                shipping_carrier_id,
                mail_class,
                min_delivery_days,
                max_delivery_days,
            });

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`, data, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 201) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(201).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter destinos de envio de um perfil de envio em uma loja no Etsy
    routes.get('/getShopShippingProfileDestinations/:shop_id/:shipping_profile_id/destinations', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para deletar um destino de envio de um perfil de envio em uma loja no Etsy
    routes.delete('/deleteShopShippingProfileDestination/:shop_id/:shipping_profile_id/destinations/:shipping_profile_destination_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id, shipping_profile_destination_id } = request.params;

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 204) {
                response.status(204).send();
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar um destino de envio de um perfil de envio em uma loja no Etsy
    routes.put('/updateShopShippingProfileDestination/:shop_id/:shipping_profile_id/destinations/:shipping_profile_destination_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id, shipping_profile_destination_id } = request.params;
            const { primary_cost, secondary_cost, destination_country_iso, destination_region, shipping_carrier_id, mail_class, min_delivery_days, max_delivery_days } = request.body;

            const data = new URLSearchParams({
                primary_cost,
                secondary_cost,
                destination_country_iso,
                destination_region,
                shipping_carrier_id,
                mail_class,
                min_delivery_days,
                max_delivery_days,
            });

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/destinations/${shipping_profile_destination_id}`, data, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/createShopShippingProfileUpgrade/:shop_id/:shipping_profile_id/upgrades', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;
            const { type, upgrade_name, price, secondary_price, shipping_carrier_id, mail_class, min_delivery_days, max_delivery_days } = request.body;

            const data = new URLSearchParams({
                type,
                upgrade_name,
                price,
                secondary_price,
                shipping_carrier_id,
                mail_class,
                min_delivery_days,
                max_delivery_days,
            });

            const etsyApiResponse = await axios.post(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`, data, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter atualizações de perfil de envio
    routes.get('/getShopShippingProfileUpgrades/:shop_id/:shipping_profile_id/upgrades', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id } = request.params;

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para deletar uma atualização de perfil de envio
    routes.delete('/deleteShopShippingProfileUpgrade/:shop_id/:shipping_profile_id/upgrades/:upgrade_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id, upgrade_id } = request.params;

            const etsyApiResponse = await axios.delete(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 204) {
                response.status(204).send();
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar uma atualização de perfil de envio
    routes.put('/updateShopShippingProfileUpgrade/:shop_id/:shipping_profile_id/upgrades/:upgrade_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id, shipping_profile_id, upgrade_id } = request.params;
            const { upgrade_name, type, price, secondary_price, shipping_carrier_id, mail_class, min_delivery_days, max_delivery_days } = request.body;

            const data = new URLSearchParams({
                upgrade_name,
                type,
                price,
                secondary_price,
                shipping_carrier_id,
                mail_class,
                min_delivery_days,
                max_delivery_days,
            });

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}/shipping-profiles/${shipping_profile_id}/upgrades/${upgrade_id}`, data, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.get('/getShop/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;

            const etsyApiResponse = await axios.get(`https://openapi.etsy.com/v3/application/shops/${shop_id}`, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar informações de uma loja
    routes.put('/updateShop/:shop_id', async (request: Request, response: Response) => {
        try {
            // Verifique se o token de acesso está disponível
            if (!accessToken) {
                response.status(401).send("Token de acesso não disponível. Realize a autenticação primeiro.");
                return;
            }

            const { shop_id } = request.params;
            const { title, announcement, sale_message, digital_sale_message, policy_additional } = request.body;

            const data = new URLSearchParams({
                title,
                announcement,
                sale_message,
                digital_sale_message,
                policy_additional,
            });

            const etsyApiResponse = await axios.put(`https://openapi.etsy.com/v3/application/shops/${shop_id}`, data, { headers: { 'Authorization': `Bearer ${accessToken}` } });

            if (etsyApiResponse.status === 200) {
                const etsyResponseData = etsyApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(etsyResponseData);
            } else {
                response.status(etsyApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    
};