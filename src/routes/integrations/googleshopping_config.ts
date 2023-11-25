import { Request, Response, Router } from "express";
import axios from "axios";

export const setGoogleShoppingRoutes = (routes: Router) => {
    // Step 1: Replace these values with your Google Content API credentials
    const clientId = "your_google_client_id";
    const clientSecret = "your_google_client_secret";
    const redirectUri = "your_redirect_uri";
    const merchantId = "";
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
    routes.post('/v1/google/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.post('https://accounts.google.com/o/oauth2/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    code: request.body.code,
                },
            });

            googleAccessToken = tokenResponse.data.access_token;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter o token de acesso do Google");
        }
    });

    // Adição da verificação do token de acesso em cada rota
    routes.delete('/v1/google/deleteAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { force } = request.query;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}`, {
                params: { force },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir a subconta do Merchant Center");
        }
    });

    routes.get('/v1/google/getAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { view } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}`, {
                params: { view },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter a conta do Merchant Center");
        }
    });

    routes.post('/v1/google/createAccount/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const accountData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts`, accountData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma subconta do Merchant Center");
        }
    });

    routes.get('/v1/google/listAccounts/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken, view, label, name } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts`, {
                params: { maxResults, pageToken, view, label, name },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar subcontas do Merchant Center");
        }
    });

    routes.post('/v1/google/linkAccounts/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const linkRequest = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/link`, linkRequest, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao executar uma ação em um link entre duas contas do Merchant Center");
        }
    });
    routes.delete('/v1/google/deleteAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { force } = request.query;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}`, {
                params: { force },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir a subconta do Merchant Center");
        }
    });

    routes.get('/v1/google/getAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { view } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}`, {
                params: { view },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter a conta do Merchant Center");
        }
    });

    routes.post('/v1/google/createAccount/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const accountData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts`, accountData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma subconta no Merchant Center");
        }
    });

    routes.get('/v1/google/listAccounts/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken, view, label, name } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts`, {
                params: { maxResults, pageToken, view, label, name },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as subcontas do Merchant Center");
        }
    });

    routes.post('/v1/google/linkAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const linkData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/link`, linkData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao vincular contas no Merchant Center");
        }
    });

    routes.get('/v1/google/listLinks/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { maxResults, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/listlinks`, {
                params: { maxResults, pageToken },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os links no Merchant Center");
        }
    });

    routes.post('/v1/google/requestPhoneVerification/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const phoneVerificationData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/requestphoneverification`, phoneVerificationData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao solicitar a verificação do telefone no Merchant Center");
        }
    });

    routes.put('/v1/google/updateAccount/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const updatedAccountData = request.body;

            const apiResponse = await axios.put(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}`, updatedAccountData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar a conta no Merchant Center");
        }
    });

    routes.post('/v1/google/updateLabels/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const updateLabelsData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/updatelabels`, updateLabelsData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar os rótulos da conta no Merchant Center");
        }
    });

    routes.post('/v1/google/verifyPhoneNumber/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const verifyPhoneNumberData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounts/${accountId}/verifyphonenumber`, verifyPhoneNumberData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao verificar o número de telefone no Merchant Center");
        }
    });

    routes.post('/v1/google/createCredentials/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId } = request.params;
            const credentialsData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/credentials`, credentialsData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao fazer upload de credenciais para a conta do Merchant Center");
        }
    });
    routes.post('/v1/google/createLabel/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId } = request.params;
            const labelData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/labels`, labelData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar um novo rótulo no Merchant Center");
        }
    });

    routes.delete('/v1/google/deleteLabel/:accountId/:labelId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId, labelId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/labels/${labelId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir o rótulo do Merchant Center");
        }
    });

    routes.get('/v1/google/listLabels/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId } = request.params;
            const { pageSize, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/labels`, {
                params: { pageSize, pageToken },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os rótulos do Merchant Center");
        }
    });

    routes.patch('/v1/google/updateLabel/:accountId/:labelId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId, labelId } = request.params;
            const updatedLabelData = request.body;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/labels/${labelId}`, updatedLabelData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o rótulo no Merchant Center");
        }
    });

    routes.post('/v1/google/createReturnCarrier/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId } = request.params;
            const returnCarrierData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/returncarrier`, returnCarrierData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma transportadora de devolução no Merchant Center");
        }
    });

    routes.delete('/v1/google/deleteReturnCarrier/:accountId/:carrierAccountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId, carrierAccountId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/returncarrier/${carrierAccountId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir a transportadora de devolução no Merchant Center");
        }
    });
    routes.get('/v1/google/listReturnCarriers/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/returncarrier`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as transportadoras de devolução disponíveis no Merchant Center");
        }
    });

    routes.patch('/v1/google/updateReturnCarrier/:accountId/:carrierAccountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { accountId, carrierAccountId } = request.params;
            const updatedReturnCarrierData = request.body;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/accounts/${accountId}/returncarrier/${carrierAccountId}`, updatedReturnCarrierData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar a transportadora de devolução no Merchant Center");
        }
    });

    routes.post('/v1/google/batchAccountStatus', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const batchAccountStatusData = request.body;

            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/accountstatuses/batch', batchAccountStatusData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar vários status de contas do Merchant Center em uma única solicitação");
        }
    });

    routes.get('/v1/google/getAccountStatus/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const { destinations } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accountstatuses/${accountId}`, {
                params: { destinations },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar o status de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listAccountStatus/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken, destinations, name } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accountstatuses`, {
                params: { maxResults, pageToken, destinations, name },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os status das subcontas na sua conta do Merchant Center");
        }
    });
    routes.post('/v1/google/batchAccountTax', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const batchAccountTaxData = request.body;

            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/accounttax/batch', batchAccountTaxData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar e atualizar configurações fiscais de várias contas em uma única solicitação");
        }
    });

    routes.get('/v1/google/getAccountTax/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounttax/${accountId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar as configurações fiscais da conta");
        }
    });

    routes.get('/v1/google/listAccountTax/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounttax`, {
                params: { maxResults, pageToken },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as configurações fiscais das subcontas da sua conta do Merchant Center");
        }
    });

    routes.put('/v1/google/updateAccountTax/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const updatedAccountTaxData = request.body;

            const apiResponse = await axios.put(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/accounttax/${accountId}`, updatedAccountTaxData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar as configurações fiscais da conta");
        }
    });

    routes.post('/v1/google/activateBoGProgram/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}/activate`, null, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao reativar o programa BoG na sua conta do Merchant Center");
        }
    });
    routes.get('/v1/google/getBoGProgramStatus/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar o status do programa BoG para sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/onboardBoGProgram/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;
            const { customerServiceEmail } = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}/onboard`, { customerServiceEmail }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao integrar o programa BoG em sua conta do Merchant Center");
        }
    });

    routes.patch('/v1/google/updateBoGProgramStatus/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;
            const { updateMask } = request.query;
            const updatedProgramStatusData = request.body;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}`, updatedProgramStatusData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { updateMask },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o status do programa BoG da sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/pauseBoGProgram/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}/pause`, null, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao pausar o programa BoG na sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/requestReviewBoGProgram/:merchantId/:regionCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionCode } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/buyongoogleprograms/${regionCode}/requestreview`, null, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao solicitar análise e ativar o programa BoG na sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/createCollection/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const collectionData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collections`, collectionData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao fazer upload de uma coleção para sua conta do Merchant Center");
        }
    });
    routes.delete('/v1/google/deleteCollection/:merchantId/:collectionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, collectionId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collections/${collectionId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir a coleção da sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getCollection/:merchantId/:collectionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, collectionId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collections/${collectionId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar a coleção da sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listCollections/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { pageSize, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collections`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as coleções na sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getCollectionStatus/:merchantId/:collectionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, collectionId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collectionstatuses/${collectionId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter o status de uma coleção da sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listCollectionStatuses/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { pageSize, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/collectionstatuses`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os status das coleções na sua conta do Merchant Center");
        }
    });
    routes.post('/v1/google/createConversionSource/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma nova fonte de conversão");
        }
    });

    routes.delete('/v1/google/deleteConversionSource/:merchantId/:conversionSourceId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, conversionSourceId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources/${conversionSourceId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao arquivar uma origem de conversão existente");
        }
    });

    routes.get('/v1/google/getConversionSource/:merchantId/:conversionSourceId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, conversionSourceId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources/${conversionSourceId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter uma fonte de conversão");
        }
    });

    routes.get('/v1/google/listConversionSources/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { pageSize, pageToken, showDeleted } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken, showDeleted },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar fontes de conversão");
        }
    });

    routes.patch('/v1/google/updateConversionSource/:merchantId/:conversionSourceId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, conversionSourceId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources/${conversionSourceId}`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar informações de uma fonte de conversão existente");
        }
    });

    routes.post('/v1/google/undeleteConversionSource/:merchantId/:conversionSourceId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, conversionSourceId } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/conversionsources/${conversionSourceId}:undelete`, null, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao reativar uma origem de conversão arquivada");
        }
    });
    routes.get('/v1/google/getCSS/:cssGroupId/:cssDomainId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { cssGroupId, cssDomainId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${cssGroupId}/csses/${cssDomainId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter um único domínio CSS por ID");
        }
    });

    routes.get('/v1/google/listCSS/:cssGroupId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { cssGroupId } = request.params;
            const { pageSize, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${cssGroupId}/csses`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar domínios CSS afiliados a um grupo CSS");
        }
    });

    routes.post('/v1/google/updateCSSLabels/:cssGroupId/:cssDomainId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { cssGroupId, cssDomainId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${cssGroupId}/csses/${cssDomainId}/updatelabels`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar rótulos atribuídos a um domínio CSS por seu grupo CSS");
        }
    });

    routes.post('/v1/google/batchCustom/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/datafeeds/batch`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir, buscar, obter, inserir e atualizar vários feeds de dados em uma única solicitação");
        }
    });

    routes.delete('/v1/google/deleteDatafeed/:merchantId/:datafeedId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, datafeedId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds/${datafeedId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir uma configuração de feed de dados da sua conta do Merchant Center");
        }
    });
    routes.post('/v1/google/fetchDatafeedNow/:merchantId/:datafeedId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, datafeedId } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds/${datafeedId}/fetchNow`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao invocar uma busca do feed de dados na sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getDatafeed/:merchantId/:datafeedId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, datafeedId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds/${datafeedId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma configuração de feed de dados da sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/insertDatafeed/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao registrar uma configuração de feed de dados na sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listDatafeeds/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { maxResults, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as configurações de feeds de dados na sua conta do Merchant Center");
        }
    });

    routes.put('/v1/google/updateDatafeed/:merchantId/:datafeedId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, datafeedId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.put(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeeds/${datafeedId}`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar uma configuração de feed de dados da sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/batchDatafeedStatus/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const requestData = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/datafeedstatuses/batch`, requestData, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter vários status de feed de dados do Merchant Center em uma única solicitação");
        }
    });
    routes.get('/v1/google/getDatafeedStatus/:merchantId/:datafeedId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, datafeedId } = request.params;
            const { country, feedLabel, language } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeedstatuses/${datafeedId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { country, feedLabel, language },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar o status de um feed de dados da sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listDatafeedStatuses/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken } = request.query;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/datafeedstatuses`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { maxResults, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os status dos feeds de dados na sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getFreeListingsProgramStatus/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/freelistingsprogram`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar o status e analisar a elegibilidade para o programa de listagem gratuita");
        }
    });

    routes.post('/v1/google/requestFreeListingsReview/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { regionCode } = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/freelistingsprogram/requestreview`, { regionCode }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao solicitar uma revisão de listagens gratuitas em uma região específica");
        }
    });

    routes.delete('/v1/google/deleteCheckoutSettings/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;

            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/freelistingsprogram/checkoutsettings`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir Checkoutconfigurações e cancelar a inscrição do comerciante no Checkoutprograma");
        }
    });
    routes.get('/v1/google/getCheckoutSettings/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/freelistingsprogram/checkoutsettings`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter as configurações do Checkout para um determinado comerciante");
        }
    });

    routes.post('/v1/google/insertCheckoutSettings/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { uriSettings } = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/freelistingsprogram/checkoutsettings`, { uriSettings }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao inscrever o comerciante no Checkoutprograma");
        }
    });

    routes.post('/v1/google/batchLiaSettings', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { entries } = request.body;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/liasettings/batch`, { entries }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar e/ou atualizar as configurações do LIA de várias contas em uma única solicitação");
        }
    });

    routes.get('/v1/google/getLiaSettings/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/liasettings/${accountId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar as configurações do LIA da conta");
        }
    });
    routes.post('/v1/google/requestInventoryVerification/:merchantId/:accountId/:country', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId, country } = request.params;

            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/liasettings/${accountId}/requestinventoryverification/${country}`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao solicitar verificação de estoque para o país especificado");
        }
    });
    routes.post('/v1/google/renderAccountIssues/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { languageCode, timeZone } = request.query;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/merchantsupport/renderaccountissues`, {
                languageCode,
                timeZone,
            }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao renderizar problemas da conta do comerciante");
        }
    });

    routes.post('/v1/google/renderProductIssues/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const { languageCode, timeZone } = request.query;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/merchantsupport/renderproductissues/${productId}`, {
                languageCode,
                timeZone,
            }, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao renderizar problemas do produto do comerciante");
        }
    });

    routes.post('/v1/google/createChargeInvoice/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderinvoices/${orderId}/createChargeInvoice`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma fatura de cobrança para um grupo de remessas");
        }
    });

    routes.post('/v1/google/createRefundInvoice/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderinvoices/${orderId}/createRefundInvoice`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma fatura de reembolso para um ou mais grupos de remessa");
        }
    });

    routes.get('/v1/google/listDisbursements/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const { maxResults, pageToken, disbursementStartDate, disbursementEndDate } = request.query;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreports/disbursements`, {
                params: {
                    maxResults,
                    pageToken,
                    disbursementStartDate,
                    disbursementEndDate,
                },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar um relatório de pagamentos da conta do Merchant Center");
        }
    });
    routes.get('/v1/google/listTransactions/:merchantId/:disbursementId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, disbursementId } = request.params;
            const { maxResults, pageToken, transactionStartDate, transactionEndDate } = request.query;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreports/disbursements/${disbursementId}/transactions`, {
                params: {
                    maxResults,
                    pageToken,
                    transactionStartDate,
                    transactionEndDate,
                },
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma lista de transações para um desembolso da conta do Merchant Center");
        }
    });

    routes.post('/v1/google/acknowledgeOrderReturn/:merchantId/:returnId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns/${returnId}/acknowledge`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao acknowlegde uma devolução de pedido em sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/createOrderReturn/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns/createOrderReturn`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma devolução de pedido em sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getOrderReturn/:merchantId/:returnId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns/${returnId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma devolução de pedido da sua conta do Merchant Center");
        }
    });

    routes.get('/v1/google/listOrderReturns/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar devoluções de pedidos na sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/processOrderReturn/:merchantId/:returnId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns/${returnId}/process`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao processar uma devolução de pedido em sua conta do Merchant Center");
        }
    });
    routes.post('/v1/google/createReturnLabel/:merchantId/:returnId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            
     
return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orderreturns/${returnId}/labels`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma etiqueta de remessa de devolução vinculada a um ID de devolução");
        }
    });

    routes.post('/v1/google/acknowledgeOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/acknowledge`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao marcar um pedido como reconhecido");
        }
    });

    routes.post('/v1/google/advanceTestOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1sandbox/${merchantId}/testorders/${orderId}/advance`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao mover um pedido de teste do estado 'inProgress' para o estado 'pendingShipment'");
        }
    });

    routes.post('/v1/google/cancelOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            
 
const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/cancel`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao cancelar todos os itens de linha de um pedido, efetuando um reembolso total");
        }
    });

    routes.post('/v1/google/cancelLineItem/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/cancelLineItem`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao cancelar um item de linha, efetuando um reembolso total");
        }
    });

    routes.post('/v1/google/cancelTestOrderByCustomer/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1sandbox/${merchantId}/testorders/${orderId}/cancelByCustomer`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            
console.error(error);
            response.status(500).send("Falha ao cancelar um pedido de teste para cancelamento iniciado pelo cliente");
        }
    });
    routes.post('/v1/google/captureOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/captureOrder`, {}, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao capturar fundos do cliente para o total do pedido atual");
        }
    });

    routes.post('/v1/google/createTestOrder/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1sandbox/${merchantId}/testorders`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar um pedido de teste");
        }
    });

    routes.post('/v1/google/createTestReturn/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/testreturn`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar um retorno de teste");
        }
    });

    routes.get('/v1/google/getOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar um pedido da conta do Merchant Center");
        }
    });

    routes.get('/v1/google/getOrderByMerchantOrderId/:merchantId/:merchantOrderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, merchantOrderId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/ordersbymerchantid/${merchantOrderId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar um pedido usando o ID do pedido do comerciante");
        }
    });

    routes.get('/v1/google/getTestOrderTemplate/:merchantId/:templateName', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, templateName } = request.params;
            const country = request.query.country || "US";
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1sandbox/${merchantId}/testordertemplates/${templateName}?country=${country}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar um modelo de pedido de teste");
        }
    });
    routes.post('/v1/google/inStoreRefundLineItem/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            
         
const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/inStoreRefundLineItem`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao lidar com o reembolso e retorno do item diretamente pelo comerciante fora do processamento de pagamentos do Google");
        }
    });

    routes.get('/v1/google/listOrders/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const maxResults = request.query.maxResults || 25;
            const pageToken = request.query.pageToken || '';
            const statuses = request.query.statuses || [];
            const placedDateStart = request.query.placedDateStart || '';
            const placedDateEnd = request.query.placedDateEnd || '';
            const orderBy = request.query.orderBy || 'placedDateAsc';
            const acknowledged = request.query.acknowledged || false;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: {
                    maxResults,
                    pageToken,
                    statuses,
                    placedDateStart,
                    placedDateEnd,
                    orderBy,
                    acknowledged,
                },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os pedidos em sua conta do Merchant Center");
        }
    });

    routes.post('/v1/google/refundItem/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/refunditem`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao emitir um reembolso parcial ou total para itens e remessa");
        }
    });

    routes.post('/v1/google/refundOrder/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/refundorder`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao emitir um reembolso parcial ou total para um pedido");
        }
    });

    routes.post('/v1/google/rejectReturnLineItem/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/rejectReturnLineItem`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            
      
console.error(error);
            response.status(500).send("Falha ao rejeitar o retorno de um item de linha");
        }
    });

    routes.post('/v1/google/returnRefundLineItem/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/returnRefundLineItem`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao devolver e reembolsar um item de linha");
        }
    });
    routes.post('/v1/google/setLineItemMetadata/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/setLineItemMetadata`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao definir (ou substituir, se já existir) anotações fornecidas pelo comerciante na forma de pares chave-valor");
        }
    });

    routes.post('/v1/google/shipLineItems/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/shipLineItems`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao marcar item(ns) como enviado(s)");
        }
    });

    routes.post('/v1/google/updateMerchantOrderId/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/updateMerchantOrderId`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o ID do pedido do comerciante para um determinado pedido");
        }
    });

    routes.post('/v1/google/updateShipment/:merchantId/:orderId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, orderId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/orders/${orderId}/updateShipment`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o status, transportadora e/ou ID de rastreamento de um envio");
        }
    });
    routes.post('/v1/google/ordertrackingsignals/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/ordertrackingsignals`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar um novo sinal de rastreamento de pedido");
        }
    });

    routes.post('/v1/google/pos/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/pos/batch', request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao realizar chamadas relacionadas ao PDV em lote");
        }
    });

    routes.delete('/v1/google/pos/delete/:merchantId/:targetMerchantId/store/:storeCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId, storeCode } = request.params;
            await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/store/${storeCode}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send();
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir uma loja para o comerciante fornecido");
        }
    });

    routes.get('/v1/google/pos/get/:merchantId/:targetMerchantId/store/:storeCode', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId, storeCode } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/store/${storeCode}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar informações sobre a loja fornecida");
        }
    });

    routes.post('/v1/google/pos/insert/:merchantId/:targetMerchantId/store', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/store`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma loja para o comerciante fornecido");
        }
    });

    routes.post('/v1/google/pos/inventory/:merchantId/:targetMerchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/inventory`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao enviar inventário para o comerciante fornecido");
        }
    });

    routes.get('/v1/google/pos/list/:merchantId/:targetMerchantId/store', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/store`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as lojas do comerciante fornecido");
        }
    });

    routes.post('/v1/google/pos/sale/:merchantId/:targetMerchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, targetMerchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pos/${targetMerchantId}/sale`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao enviar um evento de venda para o comerciante fornecido");
        }
    });
    routes.post('/v1/google/productdeliverytime/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productdeliverytime`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar ou atualizar o tempo de entrega de um produto");
        }
    });

    routes.delete('/v1/google/productdeliverytime/delete/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productdeliverytime/${productId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send();
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir o tempo de entrega de um produto");
        }
    });

    routes.get('/v1/google/productdeliverytime/get/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productdeliverytime/${productId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter o tempo de entrega de um produto pelo ID do produto");
        }
    });

    routes.post('/v1/google/products/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/products/batch', request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao executar operações em lote em produtos");
        }
    });

    routes.delete('/v1/google/products/delete/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const feedId = request.query.feedId as string;

            await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products/${productId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { feedId },
            });

            response.send();
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir um produto do Merchant Center");
        }
    });
    routes.get('/v1/google/products/get/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products/${productId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter um produto pelo ID do produto");
        }
    });

    routes.get('/v1/google/products/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const maxResults = request.query.maxResults as string;
            const pageToken = request.query.pageToken as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { maxResults, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar produtos do Merchant Center");
        }
    });

    routes.patch('/v1/google/products/update/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const updateMask = request.query.updateMask as string;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products/${productId}`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { updateMask },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar um produto no Merchant Center");
        }
    });

    routes.post('/v1/google/productstatuses/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/productstatuses/batch', request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter os status de vários produtos em uma única solicitação");
        }
    });

    routes.get('/v1/google/productstatuses/get/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const destinations = request.query.destinations as string[];

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productstatuses/${productId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { destinations },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter o status de um produto pelo ID do produto");
        }
    });

    routes.get('/v1/google/productstatuses/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const maxResults = request.query.maxResults as string;
            const pageToken = request.query.pageToken as string;
            const destinations = request.query.destinations as string[];

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productstatuses`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { maxResults, pageToken, destinations },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar os status dos produtos do Merchant Center");
        }
    });
    routes.get('/v1/google/productstatuses/repricingreports/list/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const ruleId = request.query.ruleId as string;
            const startDate = request.query.startDate as string;
            const endDate = request.query.endDate as string;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/productstatuses/${productId}/repricingreports`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { ruleId, startDate, endDate, pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar relatórios de métricas para um produto de Repricing");
        }
    });

    routes.post('/v1/google/promotions/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/promotions`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao inserir uma promoção no Merchant Center");
        }
    });

    routes.get('/v1/google/promotions/get/:merchantId/:id', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, id } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/promotions/${id}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter uma promoção pelo ID da promoção");
        }
    });

    routes.get('/v1/google/promotions/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;
            const countryCode = request.query.countryCode as string;
            const languageCode = request.query.languageCode as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/promotions`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken, countryCode, languageCode },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar promoções do Merchant Center");
        }
    });

    routes.get('/v1/google/pubsubnotificationsettings/get/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/pubsubnotificationsettings`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter configurações de notificação Pub/Sub do Merchant Center");
        }
    });
    routes.get('/v1/google/quotas/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/quotas`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar cotas diárias e uso por método para a conta do Merchant Center");
        }
    });

    routes.get('/v1/google/recommendations/generate/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const languageCode = request.query.languageCode as string;
            const allowedTag = request.query.allowedTag as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/recommendations/generate`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { languageCode, allowedTag },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao gerar recomendações para um comerciante");
        }
    });

    routes.post('/v1/google/recommendations/reportInteraction/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/recommendations/reportInteraction`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao relatar uma interação em uma recomendação para um comerciante");
        }
    });

    routes.post('/v1/google/regionalinventory/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/regionalinventory/batch', request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o inventário regional para vários produtos ou regiões em uma única solicitação");
        }
    });

    routes.post('/v1/google/regionalinventory/insert/:merchantId/:productId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, productId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products/${productId}/regionalinventory`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o inventário regional de um produto no Merchant Center");
        }
    });
    routes.post('/v1/google/regions/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/regions`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma definição de região em uma conta do Merchant Center");
        }
    });

    routes.delete('/v1/google/regions/delete/:merchantId/:regionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionId } = request.params;
            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/regions/${regionId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir uma definição de região de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/regions/get/:merchantId/:regionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/regions/${regionId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma definição de região de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/regions/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/regions`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar definições de região para uma conta do Merchant Center");
        }
    });

    routes.patch('/v1/google/regions/update/:merchantId/:regionId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, regionId } = request.params;
            const updateMask = request.query.updateMask as string;

            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/regions/${regionId}`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { updateMask },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar uma definição de região em uma conta do Merchant Center");
        }
    });

    routes.post('/v1/google/reports/search/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/reports/search`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar métricas de desempenho do comerciante correspondentes à consulta de pesquisa");
        }
    });
    routes.post('/v1/google/repricingrules/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma regra de repricing em uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/repricingrules/get/:merchantId/:ruleId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, ruleId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules/${ruleId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma regra de repricing de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/repricingrules/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;
            const countryCode = request.query.countryCode as string;
            const languageCode = request.query.languageCode as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken, countryCode, languageCode },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar regras de repricing para uma conta do Merchant Center");
        }
    });

    routes.patch('/v1/google/repricingrules/update/:merchantId/:ruleId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, ruleId } = request.params;
            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules/${ruleId}`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar uma regra de repricing em uma conta do Merchant Center");
        }
    });
    routes.post('/v1/google/repricingrules/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma regra de repricing em uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/repricingrules/get/:merchantId/:ruleId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, ruleId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules/${ruleId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar uma regra de repricing de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/repricingrules/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;
            const countryCode = request.query.countryCode as string;
            const languageCode = request.query.languageCode as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { pageSize, pageToken, countryCode, languageCode },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar regras de repricing para uma conta do Merchant Center");
        }
    });

    routes.patch('/v1/google/repricingrules/update/:merchantId/:ruleId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, ruleId } = request.params;
            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules/${ruleId}`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar uma regra de repricing em uma conta do Merchant Center");
        }
    });
    routes.get('/v1/google/repricingreports/list/:merchantId/:ruleId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, ruleId } = request.params;
            const startDate = request.query.startDate as string;
            const endDate = request.query.endDate as string;
            const pageSize = request.query.pageSize as string;
            const pageToken = request.query.pageToken as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/repricingrules/${ruleId}/repricingreports`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { startDate, endDate, pageSize, pageToken },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar relatórios de repricing para uma regra específica do Merchant Center");
        }
    });

    routes.post('/v1/google/returnaddress/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/returnaddress/batch`, request.body, {
                
            
headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao processar chamadas relacionadas a endereços de devolução em lote");
        }
    });

    routes.delete('/v1/google/returnaddress/delete/:merchantId/:returnAddressId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnAddressId } = request.params;
            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnaddress/${returnAddressId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir um endereço de devolução de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/returnaddress/get/:merchantId/:returnAddressId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnAddressId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnaddress/${returnAddressId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter um endereço de devolução de uma conta do Merchant Center");
        }
    });

    routes.post('/v1/google/returnaddress/insert/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnaddress`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao inserir um endereço de devolução em uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/returnaddress/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const maxResults = request.query.maxResults as string;
            const pageToken = request.query.pageToken as string;
            const country = request.query.country as string;

            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnaddress`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: { maxResults, pageToken, country },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar endereços de devolução para uma conta do Merchant Center");
        }
    });
    routes.post('/v1/google/returnpolicy/custombatch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/returnpolicy/batch`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao processar chamadas relacionadas a políticas de devolução em lote");
        }
    });

    routes.delete('/v1/google/returnpolicy/delete/:merchantId/:returnPolicyId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnPolicyId } = request.params;
            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicy/${returnPolicyId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir uma política de devolução de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/returnpolicy/get/:merchantId/:returnPolicyId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnPolicyId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicy/${returnPolicyId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter uma política de devolução de uma conta do Merchant Center");
        }
    });

    routes.post('/v1/google/returnpolicy/insert/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicy`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao inserir uma política de devolução em uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/returnpolicy/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicy`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar políticas de devolução para uma conta do Merchant Center");
        }
    });

    routes.post('/v1/google/returnpolicyonline/create/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.post(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicyonline`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar uma nova política de devolução online");
        }
    });
    routes.delete('/v1/google/returnpolicyonline/delete/:merchantId/:returnPolicyId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnPolicyId } = request.params;
            const apiResponse = await axios.delete(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicyonline/${returnPolicyId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.send(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir uma política de devolução online");
        }
    });

    routes.get('/v1/google/returnpolicyonline/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicyonline`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar políticas de devolução online para uma conta do Merchant Center");
        }
    });

    routes.patch('/v1/google/returnpolicyonline/patch/:merchantId/:returnPolicyId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, returnPolicyId } = request.params;
            const apiResponse = await axios.patch(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/returnpolicyonline/${returnPolicyId}`, request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar uma política de devolução online");
        }
    });

    routes.get('/v1/google/settlementreports/get/:merchantId/:settlementId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, settlementId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/settlementreports/${settlementId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter um relatório de liquidação de uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/settlementreports/list/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/settlementreports`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: request.query,
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar relatórios de liquidação para uma conta do Merchant Center");
        }
    });
    routes.get('/v1/google/settlementtransactions/list/:merchantId/:settlementId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, settlementId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/settlementreports/${settlementId}/transactions`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
                params: request.query,
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar transações para um relatório de liquidação");
        }
    });

    routes.post('/v1/google/shippingsettings/batch', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const apiResponse = await axios.post('https://shoppingcontent.googleapis.com/content/v2.1/shippingsettings/batch', request.body, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao processar solicitação de lote de configurações de envio");
        }
    });

    routes.get('/v1/google/shippingsettings/get/:merchantId/:accountId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId, accountId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/shippingsettings/${accountId}`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter configurações de envio para uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/shippingsettings/getsupportedcarriers/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/supportedCarriers`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter transportadoras suportadas para uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/shippingsettings/getsupportedholidays/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/supportedHolidays`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter feriados suportados para uma conta do Merchant Center");
        }
    });

    routes.get('/v1/google/shippingsettings/getsupportedpickupservices/:merchantId', async (request: Request, response: Response) => {
        if (!googleAccessToken) {
            return response.status(400).send("Token de acesso não obtido. Chame /v1/google/getAccessToken primeiro.");
        }

        try {
            const { merchantId } = request.params;
            const apiResponse = await axios.get(`https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/supportedPickupServices`, {
                headers: { 'Authorization': `Bearer ${googleAccessToken}` },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter serviços de coleta suportados para uma conta do Merchant Center");
        }
    });
    
};