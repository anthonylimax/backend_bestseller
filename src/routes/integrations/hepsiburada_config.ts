import { Request, Response, Router, NextFunction } from "express";
import axios from "axios";

let accessToken: string | null = null;

export const setRoutes = (routes: Router) => {
    let hepsijetAccessToken: string;

    // Rota para obter token do serviço /auth/getToken
    routes.get('/v1/hepsijet/getToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.get('https://integration-apitest.hepsijet.com/auth/getToken', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('username:password').toString('base64') // Substitua username e password pelos valores apropriados
                }
            });

            hepsijetAccessToken = tokenResponse.data.accessToken;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to obtain token from Hepsijet");
        }
    });

    // Middleware para verificar se o token de acesso da Hepsijet existe
    const checkHepsijetTokenMiddleware = (request: Request, response: Response, next: NextFunction) => {
        // Verifica se o token de acesso da Hepsijet existe
        if (!hepsijetAccessToken) {
            return response.status(401).send("Hepsijet access token not found. Call /v1/hepsijet/getToken first.");
        }
        // Continua para a próxima função (handler da rota)
        next();
    };
    routes.post('/v1/hepsiburada/rejectStatusCorresponding', async (request: Request, response: Response) => {
        try {
            const rejectResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/reject-prematch', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('username:password').toString('base64') // Substitua username e password pelos valores apropriados
                }
            });

            response.json(rejectResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to reject status corresponding on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/importProduct', async (request: Request, response: Response) => {
        try {
            const productInfo = request.body; // Certifique-se de incluir as informações do produto no corpo da solicitação
    
            const importResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/import', productInfo, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            response.json(importResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to import product to Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/fastListing', async (request: Request, response: Response) => {
        try {
            const productInfo = request.body; // Certifique-se de incluir as informações do produto no corpo da solicitação
    
            const fastListingResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/fastlisting', productInfo, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            response.json(fastListingResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to perform fast listing on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/deleteProductProcess', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const apiResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/delete-process', {
                // Adicione os parâmetros necessários com base na documentação
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete product with pending action on Hepsiburada");
        }
    });
    
    // Rota para verificar o status do produto
    routes.post('/v1/hepsiburada/checkProductStatus', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const apiResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/check-product-status?version=1', {
                // Adicione os parâmetros necessários com base na documentação
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to check product status on Hepsiburada");
        }
    });
    
    // Rota para aprovar um produto com status correspondente
    routes.post('/v1/hepsiburada/approvePrematch', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const apiResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/approve-prematch', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to approve product with prematch status on Hepsiburada");
        }
    });
    
    // Rota para recuperar informações de trackingId
    routes.get('/v1/hepsiburada/trackingIdHistory', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const apiResponse = await axios.get('https://mpop-sit.hepsiburada.com/product/api/products/trackingId-history?version=2&page=0&size=1000', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve trackingId history from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/productStatus/:trackingId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { trackingId } = request.params;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/status/${trackingId}?version=1&page=0&size=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve product status from Hepsiburada");
        }
    });
    
    // Rota para obter informações de produtos com base no status do comerciante
    routes.get('/v1/hepsiburada/productsByMerchantAndStatus', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { merchantId, productStatus } = request.query;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/products-by-merchant-and-status?merchantId=${merchantId}&productStatus=${productStatus}&version=1&page=0&size=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve product information from Hepsiburada");
        }
    });
    
    // Rota para verificar o resultado da solicitação de exclusão com base no trackingId
    routes.get('/v1/hepsiburada/deleteProcessResult/:trackingId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { trackingId } = request.params;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/delete-process/${trackingId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve delete process result from Hepsiburada");
        }
    });
    
    // Rota para listar todos os produtos de um comerciante
    routes.get('/v1/hepsiburada/allProductsOfMerchant/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { merchantId } = request.params;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/all-products-of-merchant/${merchantId}?page=0&size=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve all products of merchant from Hepsiburada");
        }
    });
    
    // Rota para obter informações de características das categorias
    routes.get('/v1/hepsiburada/categoryAttributes/:categoryId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { categoryId } = request.params;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/categories/${categoryId}/attributes?version=1`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve category attributes from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/categoryAttributeValues/:categoryId/:attributeId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        const { categoryId, attributeId } = request.params;
    
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/categories/${categoryId}/attribute/${attributeId}/values?version=4&page=0&size=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve category attribute values from Hepsiburada");
        }
    });
    
    // Rota para obter todas as categorias
    routes.get('/v1/hepsiburada/allCategories', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/categories/get-all-categories?leaf=true&status=ACTIVE&available=true&version=1&page=0&size=1000`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to retrieve all categories from Hepsiburada");
        }
    });
    
    // Rota para importar atualizações de produtos
    routes.post('/v1/hepsiburada/importProducts', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const version = request.query.version as string;
            
            // Certifique-se de que o middleware apropriado está configurado para lidar com arquivos
            const file = request.file;
    
            const formData = new FormData();
            formData.append('version', version);
            formData.append('file', file.buffer, file.originalname);
    
            const apiResponse = await axios.post('https://mpop-sit.hepsiburada.com/ticket-api/api/integrator/import', formData, {
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to import product updates to Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/products/status/:trackingId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { trackingId } = request.params;
            const version = 1; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/status/${trackingId}?version=${version}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch product status from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/products/all-products-of-merchant/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const version = 1; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/products/all-products-of-merchant/${merchantId}?version=${version}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch all products of merchant from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/categories/:categoryId/attributes', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { categoryId } = request.params;
            const version = 1; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/categories/${categoryId}/attributes?version=${version}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch category attributes from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/categories/:categoryId/attribute/:attributeId/values', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { categoryId, attributeId } = request.params;
            const version = 4; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/product/api/categories/${categoryId}/attribute/${attributeId}/values?version=${version}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch attribute values from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/importStatus/:trackingId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { trackingId } = request.params;
            const version = 1; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/ticket-api/api/integrator/status/${trackingId}?version=${version}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch import status from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/importHistory/:merchantId/:hbSku', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, hbSku } = request.params;
            const version = 1; // Defina a versão conforme necessário
    
            const apiResponse = await axios.get(`https://mpop-sit.hepsiburada.com/ticket-api/api/integrator/merchant/${merchantId}/hbSku/${hbSku}?version=${version}`, {
                headers: {
                    'Accept': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch import history from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/buyboxOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/buybox-orders/merchantid/${merchantId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch buybox orders from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/listings/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const offset = 0;
            const limit = 10;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}?offset=${offset}&limit=${limit}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch listings from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updateListings/:merchantId/inventory-uploads', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/inventory-uploads`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update listings on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/inventoryUploadStatus/:merchantId/:inventoryUploadId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, inventoryUploadId } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/inventory-uploads/id/${inventoryUploadId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch inventory upload status from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updateStock/:merchantId/stock-uploads', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/stock-uploads`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update stock on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/inventoryUploadStatus/:merchantId/:id', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, id } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/stock-uploads/id/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch stock upload status from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updatePrice/:merchantId/price-uploads', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/price-uploads`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update price on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/priceUploadStatus/:merchantId/:id', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, id } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/price-uploads/id/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch price upload status from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updateShippingInfo/:merchantId/shipping-info-uploads', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/shipping-info-uploads`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update shipping info on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/shippingInfoUploadStatus/:merchantId/:id', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, id } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/shipping-info-uploads/id/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch shipping info upload status from Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/shippingInfoUploadStatus/:merchantId/:id', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, id } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/shipping-info-uploads/id/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch shipping info upload status from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updateAdditionalInfo/:merchantId/additional-info-uploads', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/additional-info-uploads`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update additional info on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/additionalInfoUploadStatus/:merchantId/:id', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, id } = request.params;
    
            const apiResponse = await axios.get(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/additional-info-uploads/id/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch additional info upload status from Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/activateListing/:merchantId/sku/:sku/activate', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, sku } = request.params;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/sku/${sku}/activate`, {}, {
                headers: {
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to activate listing on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/deactivateListing/:merchantId/sku/:sku/deactivate', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, sku } = request.params;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/sku/${sku}/deactivate`, {}, {
                headers: {
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to deactivate listing on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/updateListingInfo/:merchantId/sku/:sku/merchantsku/:merchantSku', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, sku, merchantSku } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/sku/${sku}/merchantsku/${merchantSku}`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update listing info on Hepsiburada");
        }
    });
    routes.delete('/v1/hepsiburada/deleteListing/:merchantId/sku/:sku/merchantsku/:merchantSku', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, sku, merchantSku } = request.params;
    
            const apiResponse = await axios.delete(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/sku/${sku}/merchantsku/${merchantSku}`, {
                headers: {
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to delete listing on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/bulkUnlock/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://listing-external-sit.hepsiburada.com/Listings/merchantid/${merchantId}/bulk-unlock`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to bulk unlock products on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/cargoFirms/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://shipping-external-sit.hepsiburada.com/cargoFirms/${merchantId}`, {
                headers: {
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get cargo firms on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/createShippingProfile', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const requestBody = request.body;
    
            const apiResponse = await axios.post('https://shipping-external-sit.hepsiburada.com/profile/createByMerchantId', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create shipping profile on Hepsiburada");
        }
    });
    routes.put('/v1/hepsiburada/updateShippingProfile', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const requestBody = request.body;
    
            const apiResponse = await axios.put('https://shipping-external-sit.hepsiburada.com/profile/updateByMerchantId', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update shipping profile on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/listShippingProfiles/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://shipping-external-sit.hepsiburada.com/profiles/${merchantId}`, {
                headers: {
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to list shipping profiles on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/createTestOrder/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://oms-stub-external-sit.hepsiburada.com/orders/merchantid/${merchantId}`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create test order on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/changeableCargoCompanies/:merchantId/orderLineId/:orderLineId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, orderLineId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/delivery/changeablecargocompanies/merchantid/${merchantId}/orderlineid/${orderLineId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get changeable cargo companies for the order on Hepsiburada");
        }
    });
    routes.put('/v1/hepsiburada/changeCargoCompany/:merchantId/orderLineId/:orderLineId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, orderLineId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.put(`https://oms-external-sit.hepsiburada.com/lineitems/merchantid/${merchantId}/orderlineid/${orderLineId}/cargocompany`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to change cargo company for the order on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/changeableCargoCompanies/:merchantId/packageNumber/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/changablecargocompanies`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get changeable cargo companies for the packaged order on Hepsiburada");
        }
    });
    routes.put('/v1/hepsiburada/changePackageCargoCompany/:merchantId/packageNumber/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.put(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/changecargocompany`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to change cargo company for the packaged order on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/cancelOrderItem/:merchantId/lineId/:lineId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, lineId } = request.params;
            const requestBody = {
                reasonId: 83 // Update with the correct reasonId
            };
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/lineitems/merchantid/${merchantId}/id/${lineId}/cancelbymerchant`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send cancellation information for the order item on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/packageableItems/:merchantId/lineItemId/:lineItemId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, lineItemId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/lineitems/merchantid/${merchantId}/packageablewith/lineitemid/${lineItemId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get packageable items for the order item on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/packageInfo/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get package information for the merchant on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/packagePens/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to pack pens on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/splitPackage/:merchantId/packagenumber/:packagenumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packagenumber } = request.params;
            const requestBody = request.body;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packagenumber}/split`, requestBody, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to split the package on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/unpackPackage/:merchantId/packagenumber/:packagenumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packagenumber } = request.params;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packagenumber}/unpack`, null, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to unpack the package on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/completedOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/orders/merchantid/${merchantId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get completed orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/cancelledOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/orders/merchantid/${merchantId}/cancelled`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get cancelled orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/paymentAwaitingOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/orders/merchantid/${merchantId}/paymentawaiting`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get payment awaiting orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/deliveredOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/delivered`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get delivered orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/shippedOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/shipped`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get shipped orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/unpackedPackages/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/status/unpacked`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get unpacked packages on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/undeliveredOrders/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/undelivered`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get undelivered orders on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/orderDetails/:merchantId/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, orderNumber } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/orders/merchantid/${merchantId}/ordernumber/${orderNumber}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get order details on Hepsiburada");
        }
    });
    routes.put('/v1/hepsiburada/invoiceLink/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
            const { invoiceLink } = request.body;
    
            const apiResponse = await axios.put(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/invoice`, { faturaLink: invoiceLink }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send invoice link on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/shippingInfo/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get shipping info on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/deliverPackage/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/deliver`, {}, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to deliver package on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/inTransitPackage/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
            const { trackingInfo } = request.body;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/intransit`, trackingInfo, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to set in-transit status on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/undeliverPackage/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
            const { undeliverInfo } = request.body;
    
            const apiResponse = await axios.post(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/undeliver`, undeliverInfo, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to set undelivered status on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/barcode/:merchantId/:packageNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId, packageNumber } = request.params;
            const { format } = request.query;
    
            const apiResponse = await axios.get(`https://oms-external-sit.hepsiburada.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/labels`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                },
                params: {
                    format: format || 'pdf'
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to generate barcode on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/createClaim/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { merchantId } = request.params;
            const { newSKU, orderNumber, type, reason } = request.body;
    
            const createClaimRequest = {
                newSKU,
                orderNumber,
                type,
                reason
            };
    
            const apiResponse = await axios.post(`https://claim-stub-external-sit.hepsiburada.com/claims/merchant/${merchantId}/create`, createClaimRequest, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create claim on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/listQuestions', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { desc, page, size } = request.query;
    
            const apiResponse = await axios.get('https://api-asktoseller-merchant-sit.hepsiburada.com/api/v1.0/issues', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                },
                params: {
                    desc,
                    page,
                    size
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch questions on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/createQuestion', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { issueCount } = request.body;
    
            const apiResponse = await axios.post('https://api-asktoseller-merchant-sit.hepsiburada.com/api/v1.0/issues', {
                issueCount
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create question on Hepsiburada");
        }
    });
    routes.get('/v1/hepsiburada/questionDetails/:number', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { number } = request.params;
    
            const apiResponse = await axios.get(`https://api-asktoseller-merchant-sit.hepsiburada.com/api/v1.0/issues/${number}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch question details on Hepsiburada");
        }
    });
    routes.post('/v1/hepsiburada/answerQuestion/:number', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
        try {
            const { number } = request.params;
            const { files, answer } = request.body;
    
            const formData = new FormData();
            formData.append('answer', answer);
    
            files.forEach((file: any) => {
                formData.append('files', file, file.name);
            });
    
            const apiResponse = await axios.post(`https://api-asktoseller-merchant-sit.hepsiburada.com/api/v1.0/issues/${number}/answer`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${hepsijetAccessToken}`
                }
            });
    
            response.status(apiResponse.status).json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to answer question on Hepsiburada");
        }
    });
// Obtendo informações baseadas no status das perguntas feitas ao vendedor
routes.get('/v1/hepsiburada/questionStatusCount', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://api-asktoseller-merchant-sit.hepsiburada.com/api/v1.0/issues/count', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to fetch question status count on Hepsiburada");
    }
});
// Listando o desempenho financeiro com base nos detalhes do pedido e do produto
routes.get('/v1/hepsiburada/financialPerformance/:merchantId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const { merchantId } = request.params;
        const { DueDateStart, DueDateEnd, OrderDateStart, OrderDateEnd, Offset, Limit, OrderNumber, Sku } = request.query;

        const apiResponse = await axios.get(`https://mpfinance-external-sit.hepsiburada.com/orders/merchantid/${merchantId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            },
            params: {
                DueDateStart,
                DueDateEnd,
                OrderDateStart,
                OrderDateEnd,
                Offset,
                Limit,
                OrderNumber,
                Sku
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to fetch financial performance on Hepsiburada");
    }
});
// Rejeição de status correspondente
routes.post('/v1/hepsiburada/rejectStatusMatch', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.post('https://mpop-sit.hepsiexpress.com/product/api/products/reject-prematch', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to reject status match on Hepsiburada");
    }
});
// Envio de informações do produto
routes.post('/v1/hepsiburada/importProductInfo', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const version = 1; // Defina a versão conforme necessário
        const file = request.body; // Certifique-se de processar o arquivo corretamente

        const apiResponse = await axios.post(`https://mpop-sit.hepsiexpress.com/product/api/products/import?version=${version}`, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to import product information on Hepsiburada");
    }
});
// Carregamento rápido do produto
routes.post('/v1/hepsiburada/fastProductListing', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.post('https://mpop-sit.hepsiexpress.com/product/api/products/fastlisting', {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to perform fast product listing on Hepsiburada");
    }
});
// Eşleşen statü onay
routes.post('/v1/hepsiburada/approveStatusMatch', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.post('https://mpop-sit.hepsiexpress.com/product/api/products/approve-prematch', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to approve status match on Hepsiburada");
    }
});
// TrackingId Geçmişini Sorgulama
routes.get('/v1/hepsiburada/trackingIdHistory', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const version = 2; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/products/trackingId-history?version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to fetch trackingId history on Hepsiburada");
    }
});
// Statü Bazlı Ürün Bilgisi Çekme
routes.get('/v1/hepsiburada/productInfoByStatus', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const merchantId = 'yourMerchantId'; // Substitua com seu ID de comerciante
        const productStatus = 'WAITING'; // Substitua com o status desejado
        const version = 1; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/products/products-by-merchant-and-status?merchantId=${merchantId}&productStatus=${productStatus}&version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to fetch product information by status on Hepsiburada");
    }
});
// TrackingId Geçmişini Sorgulama
routes.get('/v1/hepsiburada/trackingIdHistory', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const version = 2; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/products/trackingId-history?version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar histórico de trackingId no Hepsiburada");
    }
});
// Ürün Durumu Sorgulama
routes.get('/v1/hepsiburada/productStatus/:trackingId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const trackingId = request.params.trackingId;
        const version = 1; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/products/status/${trackingId}?version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar status do produto no Hepsiburada");
    }
});
// Statü Bazlı Ürün Bilgisi Çekme
routes.get('/v1/hepsiburada/productInfoByStatus', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const merchantId = 'yourMerchantId'; // Substitua com seu ID de comerciante
        const productStatus = 'WAITING'; // Substitua com o status desejado
        const taskStatus = false; // Substitua com o status da tarefa desejada
        const version = 1; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/products/products-by-merchant-and-status?merchantId=${merchantId}&productStatus=${productStatus}&taskStatus=${taskStatus}&version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar informações de produto por status no Hepsiburada");
    }
});
// Kategori Özelliklerini Alma
routes.get('/v1/hepsiburada/categoryAttributes/:categoryId/:productTypeId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const categoryId = request.params.categoryId;
        const productTypeId = request.params.productTypeId;
        const version = 1; // Defina a versão conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/categories/${categoryId}/${productTypeId}/attributes?version=${version}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar atributos de categoria no Hepsiburada");
    }
});
// Özellik Değerini Alma
routes.get('/v1/hepsiburada/categoryAttributeValues/:categoryId/:productTypeId/:attributeId', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const categoryId = request.params.categoryId;
        const productTypeId = request.params.productTypeId;
        const attributeId = request.params.attributeId;
        const version = 4; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/categories/${categoryId}/${productTypeId}/attribute/${attributeId}/values?version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar valores de atributos de categoria no Hepsiburada");
    }
});
// Kategori Bilgilerini Alma
routes.get('/v1/hepsiburada/allCategories', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const leaf = true; // Substitua com o valor desejado
        const status = 'ACTIVE'; // Substitua com o valor desejado
        const available = true; // Substitua com o valor desejado
        const type = 'HX'; // Substitua com o valor desejado
        const version = 1; // Defina a versão conforme necessário
        const page = 0; // Defina a página conforme necessário
        const size = 1000; // Defina o tamanho conforme necessário

        const apiResponse = await axios.get(`https://mpop-sit.hepsiexpress.com/product/api/categories/get-all-categories?leaf=${leaf}&status=${status}&available=${available}&type=${type}&version=${version}&page=${page}&size=${size}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${hepsijetAccessToken}`
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao buscar informações de todas as categorias no Hepsiburada");
    }
});
// Chamada para o Cliente
routes.post('/v1/hepsiburada/callToCustomer/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const requestBody = {
            name: 'Nome do Cliente', // Substitua com o nome do cliente
            phoneNumber: 'Número do Telefone' // Substitua com o número de telefone do cliente
        };

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/callToCustomer/${orderNumber}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fazer chamada para o cliente no Hepsiburada");
    }
});
// Reivindicar Entrega
routes.post('/v1/hepsiburada/claimDelivery/:orderNumber/:claimGroupReferenceNumber/:deliveryCode', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const claimGroupReferenceNumber = request.params.claimGroupReferenceNumber;
        const deliveryCode = request.params.deliveryCode;

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/claim/deliverDelivery/orderNumber/${orderNumber}/claimGroupReferenceNumber/${claimGroupReferenceNumber}/deliveryCode/${deliveryCode}`, {}, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao reivindicar entrega no Hepsiburada");
    }
});
// Obter Itens de Linha de Reivindicação por Número do Pedido
routes.get('/v1/hepsiburada/claimOrderLines/:orderNumber/:claimGroupReferenceNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const claimGroupReferenceNumber = request.params.claimGroupReferenceNumber;

        const apiResponse = await axios.get(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/claim/orderLines/orderNumber/${orderNumber}/claimGroupReferenceNumber/${claimGroupReferenceNumber}`, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter itens de linha de reivindicação por número do pedido no Hepsiburada");
    }
});
// Reivindicar Entrega do Navio
routes.post('/v1/hepsiburada/claimShipDelivery/:orderNumber/:claimGroupReferenceNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const claimGroupReferenceNumber = request.params.claimGroupReferenceNumber;

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/claim/shipDelivery/orderNumber/${orderNumber}/claimGroupReferenceNumber/${claimGroupReferenceNumber}`, {}, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao reivindicar entrega do navio no Hepsiburada");
    }
});
// Entregar Entrega
routes.post('/v1/hepsiburada/deliverDelivery/:orderNumber/:deliveryCode', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const deliveryCode = request.params.deliveryCode;

        const requestBody = {
            note: 'Nota de Entrega' // Substitua com a nota de entrega desejada
        };

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/deliverDelivery/orderNumber/${orderNumber}/deliveryCode/${deliveryCode}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao entregar a entrega no Hepsiburada");
    }
});
// Obter Itens de Linha do Pedido por Número do Pedido
routes.get('/v1/hepsiburada/orderLines/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;

        const apiResponse = await axios.get(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/order/orderLines/orderNumber/${orderNumber}`, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter itens de linha do pedido no Hepsiburada");
    }
});
// Atualizar Courier do Pedido
routes.get('/v1/hepsiburada/updateOrderCourier/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;

        const apiResponse = await axios.get(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/order/orderLines/orderNumber/${orderNumber}`, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o courier do pedido no Hepsiburada");
    }
});
// Atualizar Courier do Pedido com base no número do pedido
routes.put('/v1/hepsiburada/updateOrderCourier/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;

        const apiResponse = await axios.put(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/order/undelivered/itemsDelivered/orderNumber/${orderNumber}`, {}, {
            headers: {
                'Accept': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o courier do pedido no Hepsiburada");
    }
});
// Atualizar Courier do Pedido usando endpoint genérico
routes.put('/v1/hepsiburada/updateOrderCourier', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const requestBody = {
            courierName: 'Nome do Courier', // Substitua com o nome do courier desejado
            courierPhone: 'Número do Courier', // Substitua com o número do courier desejado
            orders: [] // Adicione os detalhes do pedido conforme necessário
        };

        const apiResponse = await axios.put('https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/order/updateCourier', requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o courier do pedido no Hepsiburada");
    }
});
// Atualizar Courier do Pedido com base no número do pedido e outros parâmetros
routes.put('/v1/hepsiburada/updateOrderCourier/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const requestBody = {
            claimGroupReferenceNumber: 'Número da Reivindicação', // Substitua com o número da reivindicação desejado
            courierName: 'Nome do Courier', // Substitua com o nome do courier desejado
            courierPhone: 'Número do Courier' // Substitua com o número do courier desejado
        };

        const apiResponse = await axios.put(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/order/updateCourier/orderNumber/${orderNumber}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o courier do pedido no Hepsiburada");
    }
});
// Entrega do Navio
routes.post('/v1/hepsiburada/shipDelivery/:orderNumber', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;

        const requestBody = {
            trackingUrl: 'URL de Rastreamento' // Substitua com a URL de rastreamento desejada
        };

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/shipDelivery/orderNumber/${orderNumber}`, requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar a entrega do navio no Hepsiburada");
    }
});
// Cancelar Entrega
routes.post('/v1/hepsiburada/unDeliverDelivery/:orderNumber/:deliveryCode', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const orderNumber = request.params.orderNumber;
        const deliveryCode = request.params.deliveryCode;

        const apiResponse = await axios.post(`https://hepsiexpress-delivery-integration-gateway.hepsiburada.com/v1/integration/unDeliverDelivery/orderNumber/${orderNumber}/deliveryCode/${deliveryCode}`, {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': hepsiburadaApiKey
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao cancelar a entrega no Hepsiburada");
    }
});
// Mega Mağaza Üzerinden Fiyat/Stok Bilgilerini Bulk Güncelleme İşlem Kontrolü (GET)
routes.get('/v1/hepsiexpress/inventoryUploadsControl/:megaMerchantId/:id', async (request: Request, response: Response) => {
    try {
        const megaMerchantId = request.params.megaMerchantId;
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/megaMerchantId/${megaMerchantId}/inventory-uploads/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter controle de upload de inventário no Hepsiburada");
    }
});
// Mega Mağaza Üzerinden Fiyat/Stok Bilgilerini Bulk Güncelleme (POST)
routes.post('/v1/hepsiexpress/inventoryUploads/:megaMerchantId', async (request: Request, response: Response) => {
    try {
        const megaMerchantId = request.params.megaMerchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/megaMerchantId/${megaMerchantId}/inventory-uploads`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar upload de inventário no Hepsiburada");
    }
});
// Fiyat/Stok Bilgilerini Bulk Güncelleme İşlem Kontrolü (GET)
routes.get('/v1/hepsiexpress/inventoryUploadsControl/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/inventory-uploads/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter controle de upload de inventário no Hepsiburada");
    }
});
// Fiyat/Stok Bilgilerini Bulk Güncelleme (POST)
routes.post('/v1/hepsiexpress/inventoryUploads', async (request: Request, response: Response) => {
    try {
        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post('https://listing-external-sit.hepsiexpress.com/listings/inventory-uploads', requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar upload de inventário no Hepsiburada");
    }
});
// Fiyat/Stok Bilgilerini Güncelleme (POST)
routes.post('/v1/hepsiexpress/inventoryUploads/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const requestBody = {
            listing: [
                // Adicione os detalhes do corpo conforme necessário
            ]
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/inventory-uploads`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar upload de inventário no Hepsiburada");
    }
});
// Fiyat/Stok Bilgilerini Güncelleme İşlem Kontrolü (GET)
routes.get('/v1/hepsiexpress/inventoryUploadsControl/:merchantId/:id', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/inventory-uploads/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter controle de upload de inventário no Hepsiburada");
    }
});
// Stok Bilgilerini Güncelleme (POST)
routes.post('/v1/hepsiexpress/stockUploads/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/stock-uploads`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar upload de estoque no Hepsiburada");
    }
});
// Stok Bilgilerini Güncelleme İşlem Kontrolü (GET)
routes.get('/v1/hepsiexpress/stockUploadsControl/:merchantId/:id', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/stock-uploads/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter controle de upload de estoque no Hepsiburada");
    }
});
// Fiyat Bilgilerini Güncelleme (POST)
routes.post('/v1/hepsiexpress/priceUploads/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/price-uploads`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar upload de preço no Hepsiburada");
    }
});
// Fiyat Bilgilerini Güncelleme İşlem Kontrolü (GET)
routes.get('/v1/hepsiexpress/priceUploadsControl/:merchantId/:id', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/price-uploads/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter controle de upload de preço no Hepsiburada");
    }
});
// İndirimi Id Bazlı Sorgulama (GET)
routes.get('/v1/hepsiexpress/listingDiscounts/:id/:merchantId', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const merchantId = request.params.merchantId;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listing-discounts/id/${id}/merchantId/${merchantId}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter desconto no Hepsiburada");
    }
});
// Üstü Çizili(İndirimli Fiyat) Bilgilerini Güncelleme (PUT)
routes.put('/v1/hepsiexpress/listingDiscounts/:id/:merchantId', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const merchantId = request.params.merchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.put(`https://listing-external-sit.hepsiexpress.com/listing-discounts/id/${id}/merchantId/${merchantId}`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar desconto no Hepsiburada");
    }
});
// Üstü Çizili(İndirimli Fiyat) Bilgilerini Silme (DELETE)
routes.delete('/v1/hepsiexpress/listingDiscounts/:id/:merchantId', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const merchantId = request.params.merchantId;

        const apiResponse = await axios.delete(`https://listing-external-sit.hepsiexpress.com/listing-discounts/id/${id}/merchantId/${merchantId}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir desconto no Hepsiburada");
    }
});
// İndirimi Statü Bazlı Sorgulama (GET)
routes.get('/v1/hepsiexpress/listingDiscounts/status/:id/:status', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const status = request.params.status;

        const offset = request.query.offset as string;
        const limit = request.query.limit as string;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listing-discounts/merchantId/${id}/status/${status}?offset=${offset}&limit=${limit}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter descontos por status no Hepsiburada");
    }
});
// Üstü Çizili(İndirimli Fiyat) Oluşturma (POST)
routes.post('/v1/hepsiexpress/listingDiscounts/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listing-discounts/merchantId/${merchantId}`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar desconto no Hepsiburada");
    }
});
// Bulk Üstü Çizili(İndirimli Fiyat) Oluşturma (POST)
routes.post('/v1/hepsiexpress/listingDiscounts/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar descontos em massa no Hepsiburada");
    }
});
// Bulk Üstü Çizili(İndirimli Fiyat) Güncelleme (POST)
routes.post('/v1/hepsiexpress/listingDiscounts/bulk/update', async (request: Request, response: Response) => {
    try {
        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk/update`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
                'Content-Type': 'application/*+json'
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar descontos em massa no Hepsiburada");
    }
});
// Bulk Üstü Çizili(İndirimli Fiyat) Güncelleme (PUT)
routes.put('/v1/hepsiexpress/listingDiscounts/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.put('https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk', requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar descontos em massa no Hepsiburada");
    }
});
// Mega Mağaza Üzerinden Bulk Üstü Çizili Fiyat Bilgisi Oluşturma (POST)
routes.post('/v1/hepsiexpress/listingDiscounts/megaMerchantId/:megaMerchantId/bulk', async (request: Request, response: Response) => {
    try {
        const megaMerchantId = request.params.megaMerchantId;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listing-discounts/megaMerchantId/${megaMerchantId}/bulk`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar descontos em massa no Hepsiburada via Mega Mağaza");
    }
});
// Bulk Oluşturulan İndirimi Id Bazlı Sorgulama (GET)
routes.get('/v1/hepsiexpress/listingDiscounts/bulk/create/id/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk/create/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter descontos em massa criados no Hepsiburada por Id");
    }
});
// Mega Mağaza Üzerinden Bulk Oluşturulan İndirimi Id Bazlı Sorgulama (GET)
routes.get('/v1/hepsiexpress/listingDiscounts/bulk/mega/create/id/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk/mega/create/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter descontos em massa criados no Hepsiburada via Mega Mağaza por Id");
    }
});
// Mega Mağaza Üzerinden Bulk Oluşturulan İndirim Güncelleme (PUT)
routes.put('/v1/hepsiexpress/listingDiscounts/mega/bulk/id/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const requestBody = {
            // Adicione os detalhes do corpo conforme necessário
        };

        const apiResponse = await axios.put(`https://listing-external-sit.hepsiexpress.com/listing-discounts/mega/bulk/id/${id}`, requestBody, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar descontos em massa criados no Hepsiburada via Mega Mağaza por Id");
    }
});
// Bulk Oluşturulan İndirim İşlemleri Kontrolü (GET)
routes.get('/v1/hepsiexpress/listingDiscounts/bulk/update/id/:id', async (request: Request, response: Response) => {
    try {
        const id = request.params.id;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listing-discounts/bulk/update/id/${id}`, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter informações de controle de descontos em massa criados no Hepsiburada por Id");
    }
});
// Satıcı Listing Bilgilerini Listeleme (GET)
routes.get('/v1/hepsiexpress/listings/merchantId/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const offset = request.query.offset as string;
        const limit = request.query.limit as string;
        const hbSkuList = request.query.HbSkuList as string;
        const merchantSkuList = request.query.MerchantSkuList as string;
        const salableListings = request.query['salable-listings'] as boolean;

        const apiResponse = await axios.get(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}`, {
            params: {
                offset,
                limit,
                HbSkuList: hbSkuList,
                MerchantSkuList: merchantSkuList,
                'salable-listings': salableListings,
            },
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter informações de listagem do Hepsiburada para o vendedor");
    }
});
// Listing Satışa Kapatma (POST)
routes.post('/v1/hepsiexpress/listings/merchantId/:merchantId/sku/:sku/deactivate', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const sku = request.params.sku;

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/sku/${sku}/deactivate`, null, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao desativar a listagem no Hepsiburada");
    }
});
// Listing Satışa Açma (POST)
routes.post('/v1/hepsiexpress/listings/merchantId/:merchantId/sku/:sku/activate', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const sku = request.params.sku;

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/listings/merchantId/${merchantId}/sku/${sku}/activate`, null, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao ativar a listagem no Hepsiburada");
    }
});
// Mağaza Açma (POST)
routes.post('/v1/hepsiexpress/merchant/:merchantId/serving', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/merchant/${merchantId}/serving`, null, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao abrir a loja no Hepsiburada");
    }
});
// Mağaza Kapatma (POST)
routes.post('/v1/hepsiexpress/merchant/:merchantId/notServing', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;

        const apiResponse = await axios.post(`https://listing-external-sit.hepsiexpress.com/merchant/${merchantId}/notServing`, null, {
            headers: {
                'Accept-Language': 'en', // Substitua com o idioma desejado
                'X-Correlation-Id': 'CorrelationId', // Substitua com o Correlation Id desejado
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fechar a loja no Hepsiburada");
    }
});
// Merchant Multi Polygon Upsert (POST)
routes.post('/v1/hepsiexpress/merchant/multi-polygon/upsert', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/merchant/multi-polygon/upsert', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do multi-polygon do comerciante");
    }
});
// Merchant Polygon Upsert (POST)
routes.post('/v1/hepsiexpress/merchant/polygon/upsert', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/merchant/polygon/upsert', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do polygon do comerciante");
    }
});
// Merchant Polygon Upsert V2 (POST)
routes.post('/v1/hepsiexpress/merchant/polygon/upsertv2', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/merchant/polygon/upsertv2', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do polygon do comerciante v2");
    }
});
// Merchant Polygon Upsert V3 (POST)
routes.post('/v1/hepsiexpress/merchant/polygon/upsertv3', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/merchant/polygon/upsertv3', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do polygon do comerciante v3");
    }
});
// Merchant Polygon Upsert V4 (POST)
routes.post('/v1/hepsiexpress/merchant/polygon/upsertv4', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/merchant/polygon/upsertv4', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do polygon do comerciante v4");
    }
});
// Get Merchant (GET)
routes.get('/v1/hepsiexpress/merchant/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const apiResponse = await axios.get(`https://shipping-external-sit.hepsiexpress.com/api/api/merchant/${merchantId}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter informações do comerciante");
    }
});
// Close Slot (POST)
routes.post('/v1/hepsiexpress/slot/close', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/close', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fechar o slot");
    }
});
// Bulk Close Slot (PUT)
routes.put('/v1/hepsiexpress/slot/close/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://shipping-external-sit.hepsiexpress.com/api/api/slot/close/bulk', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o fechamento em massa do slot");
    }
});
// Get Defined Slots (GET)
routes.get('/v1/hepsiexpress/slot/merchant/:merchantId/defined', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const apiResponse = await axios.get(`https://shipping-external-sit.hepsiexpress.com/api/api/slot/merchant/${merchantId}/defined`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter os slots definidos");
    }
});
// Open Slot (POST)
routes.post('/v1/hepsiexpress/slot/open', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/open', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao abrir o slot");
    }
});
// Bulk Open Slot (PUT)
routes.put('/v1/hepsiexpress/slot/open/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://shipping-external-sit.hepsiexpress.com/api/api/slot/open/bulk', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar a abertura em massa do slot");
    }
});
// Get Slot Summary (POST)
routes.post('/v1/hepsiexpress/slot/summary', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/summary', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o resumo do slot");
    }
});
// Get Slot Summary with Zone (POST)
routes.post('/v1/hepsiexpress/slot/summary/zone', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/summary/zone', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o resumo do slot com a zona");
    }
});
// Get Slot Summary with Zone (POST)
routes.post('/v1/hepsiexpress/slot/summaryWithZone', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/summaryWithZone', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o resumo do slot com a zona");
    }
});
// Get Slot Types (GET)
routes.get('/v1/hepsiexpress/slot/types', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://shipping-external-sit.hepsiexpress.com/api/api/slot/types', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter os tipos de slot");
    }
});
// Upsert Merchant Slot (POST)
routes.post('/v1/hepsiexpress/slot/upsert', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/slot/upsert', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o upsert do slot do comerciante");
    }
});
// Close Zone Slot (POST)
routes.post('/v1/hepsiexpress/zone-slot/close', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/zone-slot/close', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fechar o slot da zona");
    }
});
// Bulk Close Zone Slot (PUT)
routes.put('/v1/hepsiexpress/zone-slot/close/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://shipping-external-sit.hepsiexpress.com/api/api/zone-slot/close/bulk', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o fechamento em massa do slot da zona");
    }
});
// Open Zone Slot (POST)
routes.post('/v1/hepsiexpress/zone-slot/open', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://shipping-external-sit.hepsiexpress.com/api/api/zone-slot/open', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao abrir o slot da zona");
    }
});
// Bulk Open Zone Slot (PUT)
routes.put('/v1/hepsiexpress/zone-slot/open/bulk', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://shipping-external-sit.hepsiexpress.com/api/api/zone-slot/open/bulk', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar a abertura em massa do slot da zona");
    }
});
// Test Siparişi Oluşturma (POST)
routes.post('/v1/hepsiexpress/orders/test', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-stub-external-sit.hepsiexpress.com/v2/orders/merchantid/${merchantId}`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o pedido de teste");
    }
});
// Satıcı Kalem Bazlı İptal Bilgisi Gönderme (POST)
routes.post('/v1/hepsiexpress/orders/lineitem/:merchantId/:lineId/cancel', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const lineId = request.params.lineId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/lineitems/merchantid/${merchantId}/id/${lineId}/cancelbymerchant`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar informações de cancelamento de item por pedido de vendedor");
    }
});
// Siparişte Düzenleme Sağlama (POST)
routes.post('/v1/hepsiexpress/orders/lineitem/:merchantId/:orderNumber/cancel', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const orderNumber = request.params.orderNumber;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/lineitems/merchantid/${merchantId}/orderNumber/${orderNumber}/cancel`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar informações de cancelamento de pedido por vendedor");
    }
});
// Siparişte Düzenleme Sağlama (POST)
routes.post('/v1/hepsiexpress/orders/lineitem/:merchantId/:lineId/change', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const lineId = request.params.lineId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/lineitems/v2/merchantid/${merchantId}/id/${lineId}/change`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar a alteração no item do pedido por vendedor");
    }
});
// Toplanıyor Statüsü (PUT)
routes.put('/v1/hepsiexpress/orders/:merchantId/:orderNumber/pick', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const orderNumber = request.params.orderNumber;
        const apiResponse = await axios.put(`https://oms-external-sit.hepsiexpress.com/orders/merchantid/${merchantId}/ordernumber/${orderNumber}/pick`, {}, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o status 'Toplanıyor'");
    }
});
// Siparişe Ait Detay Listeleme (GET)
routes.get('/v1/hepsiexpress/orders/:merchantId/:orderNumber', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const orderNumber = request.params.orderNumber;
        const apiResponse = await axios.get(`https://oms-external-sit.hepsiexpress.com/orders/v2/merchantid/${merchantId}/ordernumber/${orderNumber}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter detalhes do pedido");
    }
});
// Fiş Silme (PUT)
routes.put('/v1/hepsiexpress/orders/:merchantId/:orderNumber/deleteSlip', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const orderNumber = request.params.orderNumber;
        const requestBody = request.body;
        const apiResponse = await axios.put(`https://oms-external-sit.hepsiexpress.com/orders/v2/merchantid/${merchantId}/ordernumber/${orderNumber}/deleteuploadedorderslip`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o comprovante do pedido");
    }
});
// Fiş Ekleme (PUT)
routes.put('/v1/hepsiexpress/orders/:merchantId/:orderNumber/uploadSlip', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const orderNumber = request.params.orderNumber;
        const requestBody = request.body;
        const apiResponse = await axios.put(`https://oms-external-sit.hepsiexpress.com/orders/v2/merchantid/${merchantId}/ordernumber/${orderNumber}/uploadorderslip`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fazer o upload do comprovante do pedido");
    }
});
// Hazırlandı Statüsü (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/pack', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar a solicitação de pacote para 'Hazırlandı'");
    }
});
// Teslim Edildi Statüsü (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/:packageNumber/deliver', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const packageNumber = request.params.packageNumber;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/deliver`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o status 'Teslim Edildi'");
    }
});
// Yolda Statüsü (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/:packageNumber/intransit', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const packageNumber = request.params.packageNumber;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/intransit`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o status 'Yolda'");
    }
});
// Teslim Edilemedi Statüsü (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/:packageNumber/undeliver', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const packageNumber = request.params.packageNumber;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/undeliver`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o status 'Teslim Edilemedi'");
    }
});
// Hazırlandı Statüsü Geri Alma (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/:packageNumber/unpack', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const packageNumber = request.params.packageNumber;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/unpack`, {}, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar o processo de desfazer 'Hazırlandı'");
    }
});
// Talep (POST)
routes.post('/v1/hepsiexpress/packages/:merchantId/:packageNumber/request', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const packageNumber = request.params.packageNumber;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/packages/merchantid/${merchantId}/packagenumber/${packageNumber}/request`, {}, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao fazer uma solicitação para o pacote");
    }
});
// Talep Oluşturma (POST)
routes.post('/v1/hepsiexpress/claims/:merchantId/createClaim', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/claims/merchantId/${merchantId}/create`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar uma solicitação");
    }
});
// Talep Detayını Listeleme (GET)
routes.get('/v1/hepsiexpress/claims/:merchantId/status/:status', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const status = request.params.status;
        const offset = request.query.offset || 0;
        const limit = request.query.limit || 10;

        const apiResponse = await axios.get(`https://oms-external-sit.hepsiexpress.com/claims/merchantId/${merchantId}/status/${status}?offset=${offset}&limit=${limit}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao listar detalhes da solicitação");
    }
});
// Talep Kabul Etme (POST)
routes.post('/v1/hepsiexpress/claims/:claimNumber/acceptClaim', async (request: Request, response: Response) => {
    try {
        const claimNumber = request.params.claimNumber;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/claims/number/${claimNumber}/accept`, {}, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao aceitar a solicitação");
    }
});
// Talep Reddetme (POST)
routes.post('/v1/hepsiexpress/claims/:claimNumber/rejectClaim', async (request: Request, response: Response) => {
    try {
        const claimNumber = request.params.claimNumber;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://oms-external-sit.hepsiexpress.com/claims/number/${claimNumber}/reject`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao rejeitar a solicitação");
    }
});
// Kayıt Bazlı Muhasebe Servisi (GET)
routes.get('/v1/hepsiexpress/transactions/:merchantId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const offset = request.query.offset || 0;
        const limit = request.query.limit || 10;
        // Adicione outras consultas conforme necessário

        const apiResponse = await axios.get(`https://mpfinance-external-sit.hepsiexpress.com/transactions/merchantid/${merchantId}?offset=${offset}&limit=${limit}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter transações de contabilidade");
    }
});
// Performans Servisi (GET)
routes.get('/v1/hepsiexpress/orders/:merchantId/financialPerformance', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const offset = request.query.offset || 0;
        const limit = request.query.limit || 10;
        // Adicione outras consultas conforme necessário

        const apiResponse = await axios.get(`https://mpfinance-external-sit.hepsiexpress.com/orders/merchantid/${merchantId}?offset=${offset}&limit=${limit}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o desempenho financeiro dos pedidos");
    }
});
// Teklif Oluşturma (POST)
routes.post('/v1/hepsiburada/suppliers/:merchantId/listingUpdateRequests', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://supplier-api-external-sit.hepsiburada.com/suppliers/${merchantId}/listingUpdateRequests`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/*+json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar uma solicitação de oferta");
    }
});
// Teklifleri Listeleme (POST)
routes.post('/v1/hepsiburada/suppliers/:merchantId/listingUpdateRequests/search', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://supplier-api-external-sit.hepsiburada.com/suppliers/${merchantId}/listingUpdateRequests/search`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/*+json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao listar detalhes da oferta");
    }
});
// Teklif Detayı Listeleme (GET)
routes.get('/v1/hepsiburada/suppliers/:merchantId/listingUpdateRequests/:requestId', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestId = request.params.requestId;
        const apiResponse = await axios.get(`https://supplier-api-external-sit.hepsiburada.com/suppliers/${merchantId}/listingUpdateRequests/${requestId}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter detalhes da oferta");
    }
});
// Envanter Bilgilerini Listeleme (POST)
routes.post('/v1/hepsiburada/suppliers/:merchantId/supplierlistings/search', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://supplier-api-external-sit.hepsiburada.com/suppliers/${merchantId}/supplierlistings/search`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/*+json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao listar detalhes do inventário");
    }
});
// Açık Siparişleri Listeleme (POST)
routes.post('/v1/hepsiburada/suppliers/:merchantId/openPurchaseOrders/search', async (request: Request, response: Response) => {
    try {
        const merchantId = request.params.merchantId;
        const requestBody = request.body;
        const apiResponse = await axios.post(`https://supplier-api-external-sit.hepsiburada.com/suppliers/${merchantId}/openPurchaseOrders/search`, requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/*+json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao listar detalhes dos pedidos em aberto");
    }
});
// Aksiyon Bekleyen Talep Bildirimi (POST)
routes.post('/v1/hepsiburada/claims/create', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/claims/create', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar uma solicitação de ação pendente");
    }
});
// Talep Listesi (GET)
routes.get('/v1/hepsiburada/claims/list', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/claims/list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de solicitações");
    }
});
// Günlük Durum Rapor Entegrasyonu (GET)
routes.get('/v1/hepsiburada/claims/dailyStatusReport', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/claims/list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o relatório de status diário");
    }
});
// Günlük Durum Raporu (GET)
routes.get('/v1/hepsiburada/dailyStatusReport/list', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/dailyStatusReport/list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                start_date: request.query.start_date,
                end_date: request.query.end_date,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o relatório de status diário");
    }
});
// Teslimat Listesi (GET)
routes.get('/v1/hepsiburada/delivery/list', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/delivery/list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                page: request.query.page,
                size: request.query.size,
                deliveryNumber: request.query.deliveryNumber,
                orderNumber: request.query.orderNumber,
                startUpdateDate: request.query.startUpdateDate,
                endUpdateDate: request.query.endUpdateDate,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao listar detalhes da entrega");
    }
});
// Kargo No Güncelleme (PUT)
routes.put('/v1/hepsiburada/order/update_tracking_number', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://radium.hepsiburada.com/api/order/update_tracking_number', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o número de rastreamento");
    }
});
// Fatura Linki Güncelleme (POST)
routes.post('/v1/hepsiburada/order/invoice_link', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/order/invoice_link', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o link da fatura");
    }
});
// Sipariş Yaratma (POST)
routes.post('/v1/hepsiburada/order/create', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/order/create', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar um novo pedido");
    }
});
// İptal Bilgisi (POST)
routes.post('/v1/hepsiburada/order/cancel', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/order/cancel', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar informações de cancelamento");
    }
});
// Sipariş Listeleme (GET)
routes.get('/v1/hepsiburada/order/order_status', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/order/order_status', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                startDate: request.query.startDate,
                endDate: request.query.endDate,
                page: request.query.page,
                size: request.query.size,
                status: request.query.status,
                merchantOrderNumber: request.query.merchantOrderNumber,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de pedidos");
    }
});
// Mal Kabul Yaratma/Güncelleme (POST)
routes.post('/v1/hepsiburada/po/create', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/po/create', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar ou atualizar o recebimento de mercadorias");
    }
});
// Mal Kabul Durumu Güncelleme (PUT)
routes.put('/v1/hepsiburada/po/update_status', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.put('https://radium.hepsiburada.com/api/po/update_status', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o status de recebimento de mercadorias");
    }
});
// Mal Kabul Listeleme (GET)
routes.get('/v1/hepsiburada/po/list_purchase_order', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/po/list_purchase_order', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                startDate: request.query.startDate,
                endDate: request.query.endDate,
                page: request.query.page,
                size: request.query.size,
                type: request.query.type,
                status: request.query.status,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de recebimento de mercadorias");
    }
});
// Ürün Yaratma (POST)
routes.post('/v1/hepsiburada/product/create_trend', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/product/create_trend', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar um novo produto");
    }
});
// İşlem Kontrolü (GET)
routes.get('/v1/hepsiburada/product/batch_request_status', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/product/batch_request_status', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                batchRequestId: request.query.batchRequestId,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao verificar o status do processamento em lote");
    }
});
// Stok Durum Listesi (GET)
routes.get('/v1/hepsiburada/product/stock_status_list', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/product/stock_status_list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                page: request.query.page,
                size: request.query.size,
                sku: request.query.sku,
                barcode: request.query.barcode,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de status de estoque do produto");
    }
});
// Ürün Varlık Kontrolü (POST)
routes.post('/v1/hepsiburada/product/check_product_exists', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://radium.hepsiburada.com/api/product/check_product_exists', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao verificar a existência do produto");
    }
});
// Transfer Hareket Listesi (GET)
routes.get('/v1/hepsiburada/transferPackage/list', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://radium.hepsiburada.com/api/transferPackage/list', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            },
            params: {
                page: request.query.page,
                size: request.query.size,
                status: request.query.status,
                orderNumber: request.query.orderNumber,
                to_zone: request.query.to_zone,
                from_zone: request.query.from_zone,
                package_number: request.query.package_number,
                end_date: request.query.end_date,
                start_date: request.query.start_date,
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de transferência de pacotes");
    }
});
// Enviar Pedido de Entrega (POST)
routes.post('/v1/hepsijet/delivery/sendDeliveryOrder', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/delivery/sendDeliveryOrder', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar o pedido de entrega");
    }
});
// Enviar Pedido de Entrega Aprimorado (POST)
routes.post('/v1/hepsijet/delivery/sendDeliveryOrderEnhanced', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/delivery/sendDeliveryOrderEnhanced', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar o pedido de entrega aprimorado");
    }
});
// Criar Registro do Comerciante (POST)
routes.post('/v1/hepsijet/advance/sendDeliveryAdvance/v2', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/advance/sendDeliveryAdvance/v2', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o registro do comerciante");
    }
});
// Excluir Pedido de Entrega (POST)
routes.post('/v1/hepsijet/advance/deleteDeliveryOrder/:deliveryNo', async (request: Request, response: Response) => {
    try {
        const deliveryNo = request.params.deliveryNo;
        const apiResponse = await axios.post(`https://integration-apitest.hepsijet.com/advance/deleteDeliveryOrder/${deliveryNo}`, {}, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o pedido de entrega");
    }
});

routes.post('/v1/hepsijet/delivery/deleteDeliveryOrder/:randomBarcode', async (request: Request, response: Response) => {
    try {
        const randomBarcode = request.params.randomBarcode;
        const deleteReason = request.body.deleteReason;

        const apiResponse = await axios.post(`https://integration-apitest.hepsijet.com/rest/delivery/deleteDeliveryOrder/${randomBarcode}`, {
            deleteReason
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o pedido de entrega por barcode");
    }
});
routes.post('/v1/hepsijet/advance/deleteDeliveryAdvance/:customerOrderId', async (request: Request, response: Response) => {
    try {
        const customerOrderId = request.params.customerOrderId;
        const apiResponse = await axios.post(`https://integration-apitest.hepsijet.com/rest/advance/deleteDeliveryAdvance/${customerOrderId}`, {}, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o pedido de entrega avançado por número do pedido do cliente");
    }
});
routes.post('/v1/hepsijet/delivery-update', async (request: Request, response: Response) => {
    try {
        const requestBody = request.body;
        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/delivery-update', requestBody, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o pedido de entrega");
    }
});

routes.post('/v1/hepsijet/deliveryTransaction/getDeliveryTracking', async (request: Request, response: Response) => {
    try {
        const deliveries = request.body.deliveries;

        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/rest/deliveryTransaction/getDeliveryTracking', { deliveries }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o rastreamento de entrega");
    }
});
routes.post('/v1/hepsijet/delivery/integration/track', async (request: Request, response: Response) => {
    try {
        const barcodes = request.body.barcodes;
        const isTrackAdded = request.body.isTrackAdded;

        const apiResponse = await axios.post('https://integration-apitest.hepsijet.com/rest/delivery/integration/track', { barcodes, isTrackAdded }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter informações de rastreamento");
    }
});
routes.get('/v1/hepsijet/settlement/cities', async (request: Request, response: Response) => {
    try {
        const apiResponse = await axios.get('https://integration-apitest.hepsijet.com/settlement/cities', {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter cidades para liquidação");
    }
});
routes.get('/v1/hepsijet/settlement/city/:id/towns', async (request: Request, response: Response) => {
    try {
        const cityId = request.params.id;
        const apiResponse = await axios.get(`https://integration-apitest.hepsijet.com/settlement/city/${cityId}/towns`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter bairros por cidade");
    }
});

routes.get('/v1/hepsijet/settlement/city/:id/towns', async (request: Request, response: Response) => {
    try {
        const cityId = request.params.id;
        const apiResponse = await axios.get(`https://integration-apitest.hepsijet.com/settlement/city/${cityId}/towns`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter distritos por cidade");
    }
});
routes.get('/v1/hepsijet/settlement/town/:id/districts', async (request: Request, response: Response) => {
    try {
        const townId = request.params.id;
        const apiResponse = await axios.get(`https://integration-apitest.hepsijet.com/settlement/town/${townId}/districts`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter bairros por distrito");
    }
});
routes.get('/v1/hepsijet/delivery/generateZplBarcode/:barcode/:totalParcel', async (request: Request, response: Response) => {
    try {
        const barcode = request.params.barcode;
        const totalParcel = request.params.totalParcel;
        const apiResponse = await axios.get(`https://integration-apitest.hepsijet.com/delivery/generateZplBarcode/${barcode}/${totalParcel}`, {
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao gerar código de barras ZPL");
    }
});
routes.get('/v1/hepsijet/delivery/findAvailableDeliveryDatesV2', async (request: Request, response: Response) => {
    try {
        const startDate = request.query.startDate as string;
        const endDate = request.query.endDate as string;
        const deliveryType = request.query.deliveryType as string;
        const city = request.query.city as string;
        const town = request.query.town as string;

        const apiResponse = await axios.get('https://integration-apitest.hepsijet.com/rest/delivery/findAvailableDeliveryDatesV2', {
            params: { startDate, endDate, deliveryType, city, town },
            headers: {
                'accept': 'application/json',
                // Adicione suas credenciais de autorização aqui, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter disponibilidade de datas de entrega");
    }
});
routes.post('/v1/hepsiburadaefaturam/sendInvoice', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'SendInvoice',
            parameters: {
                invoices: [
                    // Adicione os detalhes da fatura conforme necessário
                    {
                        Invoice: {
                            UblVersionId: { value: 2.1 },
                            CustomizationId: { value: 'TR1.2' },
                            // ... outros detalhes da fatura
                        },
                        // ... outros detalhes específicos da fatura
                    }
                ],
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar fatura");
    }
});

routes.post('/v1/hepsiburadaefaturam/isEInvoiceUser', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'IsEInvoiceUser',
            parameters: {
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                },
                vknTckn: '0330014038'
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao verificar usuário de E-Fatura");
    }
});

routes.post('/v1/hepsiburadaefaturam/getEInvoiceUsers', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'GetEInvoiceUsers',
            parameters: {
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                },
                pagination: {
                    PageIndex: '0',
                    PageSize: '10'
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter usuários de E-Fatura");
    }
});
routes.post('/v1/hepsiburadaefaturam/getOutboxInvoiceStatusWithLogs', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'GetOutboxInvoiceStatusWithLogs',
            parameters: {
                invoiceIds: ['9fa9a5c3-b36e-4acc-8334-05c35206634f'],
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter status de fatura com logs");
    }
});
routes.post('/v1/hepsiburadaefaturam/getInboxInvoiceView', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'GetInboxInvoiceView',
            parameters: {
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                },
                invoiceId: 'f81820fe-39d9-43c5-b1ff-5d3ed1fd9166'
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter visualização de fatura de entrada");
    }
});
routes.post('/v1/hepsiburadaefaturam/getOutboxInvoiceList', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'GetOutboxInvoiceList',
            parameters: {
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                },
                query: {
                    CreateStartDate: '2023-01-10T23:59:59.999',
                    CreateEndDate: '2023-05-04T23:59:59.999',
                    StatusNotInList: ['10']
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            
           
headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter lista de faturas de saída");
    }
});
routes.post('/v1/hepsiburadaefaturam/sendDocumentResponse', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'SendDocumentResponse',
            parameters: {
                responses: [
                    {
                        InvoiceId: 'f87225b4-50e1-4f7c-8898-a7d3bd6a8ac5',
                        ResponseStatus: 'Approved',
                        Reason: 'Fatura Red Sebebi'
                    }
                ],
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                // Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao enviar resposta de documento");
    }
});
routes.post('/v1/hepsiburadaefaturam/getInboxInvoiceList', async (request: Request, response: Response) => {
    try {
        const apiUrl = 'https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi';
        const requestData = {
            Action: 'GetInboxInvoiceList',
            parameters: {
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                },
                query: {
                    CreateStartDate: '2023-01-10T23:59:59.999',
                    CreateEndDate: '2023-05-04T23:59:59.999',
                    StatusNotInList: ['10']
                }
            }
        };

        const apiResponse = await axios.post(apiUrl, requestData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                
        
// Adicione outras informações do cabeçalho, se necessário
            }
        });

        response.status(apiResponse.status).json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter lista de faturas de entrada");
    }
});
routes.post('/v1/hepsiburada/validateInvoice', async (request: Request, response: Response) => {
    try {
        const invoiceInfo = request.body; // Make sure to include the invoice information in the request body

        const validateInvoiceResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            Action: 'ValidateInvoice',
            parameters: {
                invoice: invoiceInfo.invoice,
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        response.json(validateInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to validate invoice");
    }
});
routes.post('/v1/hepsiburada/saveAsDraft', async (request: Request, response: Response) => {
    try {
        const draftInfo = request.body; // Make sure to include the draft information in the request body

        const saveAsDraftResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            Action: 'SaveAsDraft',
            parameters: {
                invoices: draftInfo.invoices,
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        response.json(saveAsDraftResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to save as draft");
    }
});
routes.post('/v1/hepsiburada/sendDraft', async (request: Request, response: Response) => {
    try {
        const sendDraftInfo = request.body; // Make sure to include the sendDraft information in the request body

        const sendDraftResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            Action: 'SendDraft',
            parameters: {
                invoiceIds: sendDraftInfo.parameters.invoiceIds,
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        response.json(sendDraftResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to send draft");
    }
});
routes.post('/v1/hepsiburada/cancelDraft', async (request: Request, response: Response) => {
    try {
        const cancelDraftInfo = request.body; // Make sure to include the cancelDraft information in the request body

        const cancelDraftResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            Action: 'CancelDraft',
            parameters: {
                invoiceIds: cancelDraftInfo.parameters.invoiceIds,
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        response.json(cancelDraftResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to cancel draft");
    }
});
routes.post('/v1/hepsiburada/retrySendInvoices', async (request: Request, response: Response) => {
    try {
        const retrySendInfo = request.body; // Make sure to include the retrySend information in the request body

        const retrySendResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            Action: 'RetrySendInvoices',
            parameters: {
                invoiceIds: retrySendInfo.parameters.invoiceIds,
                userInfo: {
                    Username: 'HBTest1',
                    Password: 'HBTest1'
                }
            }
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        response.json(retrySendResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to retry send invoices");
    }
});
routes.post('/v1/hepsiburada/getOutboxInvoice', async (request: Request, response: Response) => {
    try {
        const invoiceId = request.body.invoiceId;
        const userInfo = {
            Username: "HBTest1",
            Password: "HBTest1"
        };

        const parameters = {
            userInfo: userInfo,
            invoiceId: invoiceId,
        };

        const result = await makeApiRequest('GetOutboxInvoice', parameters, 'GetOutboxInvoice');
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get outbox invoice from Hepsiburada");
    }
});

routes.post('/v1/hepsiburada/queryOutboxInvoiceStatus', async (request: Request, response: Response) => {
    try {
        // Adicione aqui a lógica para processar a solicitação de QueryOutboxInvoiceStatus
        // Certifique-se de chamar a função makeApiRequest adequadamente

        response.json({ status: "Not implemented yet" });
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query outbox invoice status from Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/getInboxInvoices', async (request: Request, response: Response) => {
    try {
        const queryModel = {
            ExecutionStartDate: "2023-01-10T23:59:59.999",
            ExecutionEndDate: "2023-05-04T23:59:59.999",
            PageSize: 10
        };

        const userInfo = {
            Username: "HBTest1",
            Password: "HBTest1"
        };

        const parameters = {
            userInfo: userInfo,
            query: queryModel,
        };

        const result = await makeApiRequest('GetInboxInvoices', parameters, 'GetInboxInvoices');
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoices from Hepsiburada");
    }
});

routes.post('/v1/hepsiburada/queryInvoiceGtbResponses', async (request: Request, response: Response) => {
    try {
        const invoiceIds = ["379736eb-06ff-410e-8d18-f5ae97a20166"];
        const userInfo = {
            Username: "HBTest1",
            Password: "HBTest1"
        };

        const parameters = {
            invoiceIds: invoiceIds,
            userInfo: userInfo,
        };

        const result = await makeApiRequest('QueryInvoiceGtbResponses', parameters, 'QueryInvoiceGtbResponses');
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query invoice GTB responses from Hepsiburada");
    }
});

routes.post('/v1/hepsiburada/getInboxInvoiceData', async (request: Request, response: Response) => {
    try {
        const invoiceId = "3f2e042c-3487-444f-a581-65d5bdd3e3eb";
        const userInfo = {
            Username: "HBTest1",
            Password: "HBTest1"
        };

        const parameters = {
            invoiceId: invoiceId,
            userInfo: userInfo,
        };

        const result = await makeApiRequest('GetInboxInvoiceData', parameters, 'GetInboxInvoiceData');
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoice data from Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/queueInvoiceNotification', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const queueInvoiceNotificationResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/QueueInvoiceNotification', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "QueueInvoiceNotification",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "request": {
                    "DocumentId": "4fd72b30-a5e9-4fa7-8e94-d126f1590ec2",
                    "Mailing": [
                        {
                            "EnableNotification": true,
                            "To": "testhepsiburadaefaturam@hepsiburadaefaturam.com",
                            "Attachment": {
                                "Xml": true,
                                "Pdf": true
                            }
                        }
                    ]
                }
            }
        });

        response.json(queueInvoiceNotificationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to send invoice notification on Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/getInboxInvoicesData', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const inboxInvoicesDataResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetInboxInvoicesData', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetInboxInvoicesData",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "query": {
                    "ExecutionStartDate": "2023-01-10T23:59:59.999",
                    "ExecutionEndDate": "2023-05-04T23:59:59.999",
                    "PageSize": 1,
                    "PageIndex": 1
                }
            }
        });

        response.json(inboxInvoicesDataResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoices data from Hepsiburada");
    }
});

// Rota para obter o status das faturas na caixa de entrada
routes.post('/v1/hepsiburada/queryInboxInvoiceStatus', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const queryInboxInvoiceStatusResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/QueryInboxInvoiceStatus', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "QueryInboxInvoiceStatus",
            "parameters": {
                "invoiceIds": ["005056A9-7C5D-1EED-B197-8D07FB3C0619"],
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(queryInboxInvoiceStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query inbox invoice status from Hepsiburada");
    }
});

// Rota para obter o PDF de uma fatura na caixa de entrada
routes.post('/v1/hepsiburada/getInboxInvoicePdf', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getInboxInvoicePdfResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetInboxInvoicePdf', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetInboxInvoicePdf",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "invoiceId": "005056A9-7C5D-1EED-B197-8D07FB3C0619"
            }
        });

        response.json(getInboxInvoicePdfResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoice PDF from Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/getInboxInvoice', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getInboxInvoiceResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetInboxInvoice', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetInboxInvoice",
            "parameters": {
                "invoiceId": "1d675d40-d6f6-4f45-8eac-0bbbe5d6cc63",
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(getInboxInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoice from Hepsiburada");
    }
});

// Rota para obter o PDF de uma fatura da caixa de entrada
routes.post('/v1/hepsiburada/getInboxInvoicePdf', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getInboxInvoicePdfResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetInboxInvoicePdf', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetInboxInvoicePdf",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "invoiceId": "1d675d40-d6f6-4f45-8eac-0bbbe5d6cc63"
            }
        });

        response.json(getInboxInvoicePdfResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get inbox invoice PDF from Hepsiburada");
    }
});

// Rota para alterar o status de arquivamento de uma fatura
routes.post('/v1/hepsiburada/changeInvoiceArchiveStatus', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const changeInvoiceArchiveStatusResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/ChangeInvoiceArchiveStatus', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "ChangeInvoiceArchiveStatus",
            "parameters": {
                "invoiceIds": ["c6f78d37-3eb5-4c01-93e5-5f9fa7764d10", "bce117d0-eaf1-481e-9b33-12fdcd1d2249"],
                "isInbox": "false",
                "isArchived": "true",
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(changeInvoiceArchiveStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to change invoice archive status on Hepsiburada");
    }
});

// Rota para obter o PDF de uma fatura da caixa de saída
routes.post('/v1/hepsiburada/getOutboxInvoicePdf', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getOutboxInvoicePdfResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetOutboxInvoicePdf', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetOutboxInvoicePdf",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "invoiceId": "15a1b252-5ba3-44bb-afa4-3e801738c71d"
            }
        });

        response.json(getOutboxInvoicePdfResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get outbox invoice PDF from Hepsiburada");
    }
});

// Rota para alterar o status de arquivamento de uma fatura da caixa de saída
routes.post('/v1/hepsiburada/changeOutboxInvoiceArchiveStatus', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const changeOutboxInvoiceArchiveStatusResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/ChangeInvoiceArchiveStatus', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "ChangeInvoiceArchiveStatus",
            "parameters": {
                "invoiceIds": ["c6f78d37-3eb5-4c01-93e5-5f9fa7764d10", "bce117d0-eaf1-481e-9b33-12fdcd1d2249"],
                "isInbox": "false",
                "isArchived": "true",
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(changeOutboxInvoiceArchiveStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to change outbox invoice archive status on Hepsiburada");
    }
});

// Rota para obter dados das faturas na caixa de saída
routes.post('/v1/hepsiburada/getOutboxInvoicesData', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getOutboxInvoicesDataResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi/GetOutboxInvoicesData', {
            // Substitua os comentários com os dados conforme a documentação fornecida
            "Action": "GetOutboxInvoicesData",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "query": {
                    "ExecutionStartDate": "2023-01-10T23:59:59.999",
                    "ExecutionEndDate": "2023-05-04T23:59:59.999",
                    "PageSize": 1,
                    "PageIndex": 1
                }
            }
        });

        response.json(getOutboxInvoicesDataResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get outbox invoices data from Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/getUserAliases', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const getUserAliasesResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            "Action": "GetUserAliasses",
            "parameters": {
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                },
                "vknTckn": "0330014038"
            }
        });

        response.json(getUserAliasesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to get user aliases from Hepsiburada");
    }
});

// Rota para marcar faturas como recebidas
routes.post('/v1/hepsiburada/setInvoicesTaken', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const setInvoicesTakenResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            "Action": "SetInvoicesTaken",
            "parameters": {
                "invoices": ["091e0557-5e09-4cb5-bbe6-2b223514b14d"],
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(setInvoicesTakenResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to set invoices as taken on Hepsiburada");
    }
});

// Rota para verificar o status de resposta do documento
routes.post('/v1/hepsiburada/queryDocumentResponseStatus', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const queryDocumentResponseStatusResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            "Action": "QueryDocumentResponseStatus",
            "parameters": {
                "invoiceIds": ["005056AA-EBE9-1EDD-ABD3-CEF2F3145B35"],
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(queryDocumentResponseStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query document response status from Hepsiburada");
    }
});

// Rota para cancelar uma fatura no E-Archive
routes.post('/v1/hepsiburada/cancelEArchiveInvoice', checkHepsiburadaTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const cancelEArchiveInvoiceResponse = await axios.post('https://testapi.hepsiburadaefaturam.com/api/BasicIntegrationApi', {
            "Action": "CancelEArchiveInvoice",
            "parameters": {
                "request": {
                    "InvoiceId": "604dacff-86f3-4dff-b572-b4ecbf03b76e",
                    "CancelDate": "2023-05-10T13:08:21"
                },
                "userInfo": {
                    "Username": "HBTest1",
                    "Password": "HBTest1"
                }
            }
        });

        response.json(cancelEArchiveInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to cancel E-Archive invoice on Hepsiburada");
    }
});
routes.post('/v1/hepsiburada/rejectStatusCorresponding', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const rejectResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/reject-prematch', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hepsijetAccessToken
            }
        });

        response.json(rejectResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to reject status corresponding on Hepsiburada");
    }
});

routes.post('/v1/hepsiburada/importProduct', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const productInfo = request.body;

        const importResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/import', productInfo, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hepsijetAccessToken
            }
        });

        response.json(importResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to import product to Hepsiburada");
    }
});

routes.post('/v1/hepsiburada/fastListing', checkHepsijetTokenMiddleware, async (request: Request, response: Response) => {
    try {
        const productInfo = request.body;

        const fastListingResponse = await axios.post('https://mpop-sit.hepsiburada.com/product/api/products/fastlisting', productInfo, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hepsijetAccessToken
            }
        });

        response.json(fastListingResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to perform fast listing on Hepsiburada");
    }
});
routes.get('/v1/hepsiburada/discounts/:merchantId', async (request: Request, response: Response) => {
    const merchantId = request.params.merchantId;
    const { page, pagesize } = request.query;

    try {
        const discountsResponse = await axios.get(`https://diskonto-external-sit.hepsiburada.com/self-campaign/${merchantId}/discounts`, {
            params: {
                page,
                pagesize
            },
            headers: {
                'Accept': 'application/json'
            }
        });

        response.json(discountsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query cart discounts on Hepsiburada");
    }
});
routes.get('/v1/hepsiburada/discount/:merchantId/:campaignId', async (request: Request, response: Response) => {
    const { merchantId, campaignId } = request.params;

    try {
        const discountDetailResponse = await axios.get(`https://diskonto-external-sit.hepsiburada.com/self-campaign/${merchantId}/discount/${campaignId}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        response.json(discountDetailResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query cart discount details on Hepsiburada");
    }
});

// Rota para cancelar um desconto no carrinho
routes.post('/v1/hepsiburada/cancelDiscount/:merchantId', async (request: Request, response: Response) => {
    const merchantId = request.params.merchantId;
    const { campaignId } = request.body;

    try {
        const cancelDiscountResponse = await axios.post(`https://diskonto-external-sit.hepsiburada.com/self-campaign/${merchantId}/cancel-discount`, {
            campaignId
        }, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        response.json(cancelDiscountResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to cancel cart discount on Hepsiburada");
    }
});

// Rota para sorgular as limitações dos descontos no carrinho
routes.get('/v1/hepsiburada/discountLimits/:merchantId', async (request: Request, response: Response) => {
    const merchantId = request.params.merchantId;

    try {
        const discountLimitsResponse = await axios.get(`https://diskonto-external-sit.hepsiburada.com/self-campaign/${merchantId}/limits`, {
            headers: {
                'accept': 'application/json'
            }
        });

        response.json(discountLimitsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query cart discount limits on Hepsiburada");
    }
});

// Rota para sorgular os orçamentos dos descontos no carrinho
routes.get('/v1/hepsiburada/discountBudgets/:merchantId', async (request: Request, response: Response) => {
    const merchantId = request.params.merchantId;

    try {
        const discountBudgetsResponse = await axios.get(`https://diskonto-external-sit.hepsiburada.com/self-campaign/${merchantId}/budgets`, {
            headers: {
                'accept': 'application/json'
            }
        });

        response.json(discountBudgetsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query cart discount budgets on Hepsiburada");
    }
});

// Rota para sorgular as categorias de produtos de um vendedor
routes.get('/v1/hepsiburada/sellerCategories/:merchantId', async (request: Request, response: Response) => {
    const merchantId = request.params.merchantId;

    try {
        const sellerCategoriesResponse = await axios.get(`https://diskonto-external-sit.hepsiburada.com/categories/${merchantId}`, {
            headers: {
                'accept': 'application/json'
            }
        });

        response.json(sellerCategoriesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Failed to query seller categories on Hepsiburada");
    }
});
};