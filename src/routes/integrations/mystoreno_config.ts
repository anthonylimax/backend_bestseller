import { Request, Response, Router } from "express";
import axios from 'axios';

const mystoreRoutes = Router();

mystoreRoutes.get('/getAuthorizationCode', async (request: Request, response: Response) => {
    try {
        const { /* parametros necessarios para a autenticacao na Mystore */ } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!/* verificar os parâmetros */) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Mystore para obter o código de autorização
        const authorizationCodeResponse = await axios.post('https://auth.mystore.no/oauth/token', {
            grant_type: 'authorization_code',
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
            /* adicione os parâmetros necessários para a autenticacao na Mystore */
        });

        // Trate a resposta da autorização (salve tokens, etc.)
        response.json(authorizationCodeResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

mystoreRoutes.get('/contentDocuments', async (request: Request, response: Response) => {
    try {
        const { marketplaceId, pageToken } = request.query;

        // Verifica se os parâmetros necessários foram fornecidos
        if (!marketplaceId) {
            return response.status(400).json({
                code: 'BadRequest',
                message: 'Request has missing or invalid parameters and cannot be parsed.',
            });
        }

        // Chama a API da Mystore para buscar documentos de conteúdo
        const searchContentDocumentsResponse = await axios.get('https://api.mystore.no/v1/contentDocuments', {
            params: {
                marketplaceId,
                pageToken,
            },
            headers: {
                'Authorization': 'Bearer your_access_token', // Substitua pelo token de acesso obtido na etapa anterior
                'Accept': 'application/json',
                // Outros cabeçalhos necessários conforme a documentação
            },
        });

        response.json(searchContentDocumentsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

mystoreRoutes.post('/refresh-token', async (request: Request, response: Response) => {
    try {
        const { refresh_token } = request.body;

        const refreshResponse = await axios.post('https://auth.mystore.no/oauth/token', {
            grant_type: 'refresh_token',
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
            refresh_token,
        });

        // Handle the refreshResponse (save new tokens, etc.)
        // Respond with the new tokens or handle errors
        response.json(refreshResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
    mystoreRoutes.get('/mystore-resources', async (request: Request, response: Response) => {
        try {
            const { page, pageSize, filter, sort } = request.query;
    
            // Constrói a URI de acordo com os parâmetros fornecidos
            const resourceUri = '/shops/malaws/products'; // Substitua 'malaws' pelo nome real da sua loja
            const queryParams = {
                page: page || 1,
                page_size: pageSize || 50,
                filter: filter || '',
                sort: sort || '',
            };
    
            // Chama a API da Mystore para buscar recursos
            const mystoreApiResponse = await axios.get(`https://api.mystore.no${resourceUri}`, {
                params: queryParams,
                headers: {
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/vnd.api+json',
                    // Outros cabeçalhos conforme a documentação
                },
            });
    
            response.json(mystoreApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar recursos na Mystore usando uma operação em lote (batch)
    mystoreRoutes.post('/create-resources-batch', async (request: Request, response: Response) => {
        try {
            const { resources } = request.body;
    
            // Chama a API da Mystore para criar recursos usando uma operação em lote
            const batchCreateResponse = await axios.post('https://api.mystore.no/batch', {
                operations: resources.map((resource: any) => ({
                    method: 'POST',
                    path: '/shops/malaws/products', // Substitua 'malaws' pelo nome real da sua loja
                    payload: resource,
                })),
            }, {
                headers: {
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/vnd.api+json',
                    // Outros cabeçalhos conforme a documentação
                },
            });
    
            response.json(batchCreateResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/create-products', async (request: Request, response: Response) => {
        try {
            const createProductsData = request.body;
    
            // Chama a API da Mystore para criar produtos com variantes
            const createProductsResponse = await axios.post('https://api.mystore.no/shops/shopname/atomic-batch', createProductsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(createProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar pedidos com produtos e variantes
    mystoreRoutes.post('/create-orders', async (request: Request, response: Response) => {
        try {
            const createOrdersData = request.body;
    
            // Chama a API da Mystore para criar pedidos com produtos e variantes
            const createOrdersResponse = await axios.post('https://api.mystore.no/shops/shopname/atomic-batch', createOrdersData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(createOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/create-product-variants', async (request: Request, response: Response) => {
        try {
            const createProductVariantsData = request.body;
    
            // Chama a API da Mystore para criar product variants
            const createProductVariantsResponse = await axios.post('https://api.mystore.no/product-variants', createProductVariantsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(createProductVariantsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter o CDN base URL para imagens
    mystoreRoutes.get('/cdn-base-url', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para obter o CDN base URL
            const cdnBaseUrlResponse = await axios.get('https://api.mystore.no/settings', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            const cdnBaseUrl = cdnBaseUrlResponse.data.full_image_cdn_base_url;
    
            response.json({ cdnBaseUrl });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todas as assinaturas de newsletter
    mystoreRoutes.get('/newsletter-subscriptions', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para obter assinaturas de newsletter
            const customersResponse = await axios.get('https://api.mystore.no/customers', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            const visitorsResponse = await axios.get('https://api.mystore.no/visitors', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            // Filtra as assinaturas de newsletter
            const newsletterSubscriptions = [
                ...customersResponse.data.filter((customer: any) => customer.newsletter === 1),
                ...visitorsResponse.data,
            ];
    
            response.json({ newsletterSubscriptions });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para configurar redirecionamentos
    mystoreRoutes.post('/setup-redirects', async (request: Request, response: Response) => {
        try {
            const redirectsData = request.body;
    
            // Chama a API da Mystore para configurar redirecionamentos
            const setupRedirectsResponse = await axios.post('https://api.mystore.no/redirects', redirectsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(setupRedirectsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar Order Totals
    mystoreRoutes.post('/create-order-totals', async (request: Request, response: Response) => {
        try {
            const createOrderTotalsData = request.body;
    
            // Chama a API da Mystore para criar Order Totals
            const createOrderTotalsResponse = await axios.post('https://api.mystore.no/order-totals', createOrderTotalsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(createOrderTotalsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para ajustar inventário meta
    mystoreRoutes.patch('/adjust-inventory-meta/:id', async (request: Request, response: Response) => {
        try {
            const orderProductId = request.params.id;
            const adjustInventoryMeta = request.body;
    
            // Chama a API da Mystore para ajustar inventário meta
            const adjustInventoryMetaResponse = await axios.patch(`https://api.mystore.no/order-products/${orderProductId}`, adjustInventoryMeta, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(adjustInventoryMetaResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/update-product-variants', async (request: Request, response: Response) => {
        try {
            const updateProductVariantsData = request.body;
    
            // Chama a API da Mystore para obter e atualizar Product Variants
            const updateProductVariantsResponse = await axios.post('https://api.mystore.no/atomic-batch', updateProductVariantsData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(updateProductVariantsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os produtos
    mystoreRoutes.get('/products', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para obter todos os produtos
            const listProductsResponse = await axios.get('https://api.mystore.no/shops/shopname/products', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo produto
    mystoreRoutes.post('/create-product', async (request: Request, response: Response) => {
        try {
            const createProductData = request.body;
    
            // Chama a API da Mystore para criar um novo produto
            const createProductResponse = await axios.post('https://api.mystore.no/shops/shopname/products', createProductData, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer seu_access_token', // Substitua pelo token de acesso obtido na autenticação
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(createProductResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/view-product/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um produto
            const viewProductResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um produto
    mystoreRoutes.patch('/update-product/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
            const updateProductData = request.body;
    
            // Chama a API da Mystore para atualizar um produto
            const updateProductResponse = await axios.patch(`https://api.mystore.no/shops/shopname/products/${productId}`, updateProductData, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(updateProductResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para deletar um produto
    mystoreRoutes.delete('/delete-product/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para deletar um produto
            const deleteProductResponse = await axios.delete(`https://api.mystore.no/shops/shopname/products/${productId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(deleteProductResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as categorias de um produto
    mystoreRoutes.get('/list-categories/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todas as categorias de um produto
            const listCategoriesResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/categories`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/list-product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todos os atributos de um produto
            const listProductAttributesResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-attributes`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductAttributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as variantes de um produto
    mystoreRoutes.get('/list-product-variants/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todas as variantes de um produto
            const listProductVariantsResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-variants`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductVariantsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os produtos especiais de um produto
    mystoreRoutes.get('/list-product-specials/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todos os produtos especiais de um produto
            const listProductSpecialsResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-specials`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductSpecialsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as avaliações de um produto
    mystoreRoutes.get('/list-product-reviews/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todas as avaliações de um produto
            const listProductReviewsResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-reviews`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductReviewsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as propriedades de um produto
    mystoreRoutes.get('/list-product-properties/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todas as propriedades de um produto
            const listProductPropertiesResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-properties`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductPropertiesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/list-product-tags/:id', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todas as tags de um produto
            const listProductTagsResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/product-tags`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductTagsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os relacionamentos de categoria de um produto
    mystoreRoutes.get('/list-category-pivots/:id/relationships/categories', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // Chama a API da Mystore para listar todos os relacionamentos de categoria de um produto
            const listCategoryPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/products/${productId}/relationships/categories`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCategoryPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar os relacionamentos de categoria de um produto
    mystoreRoutes.patch('/update-category-pivots/:id/relationships/categories', async (request: Request, response: Response) => {
        try {
            const productId = request.params.id;
    
            // TODO: Adicionar lógica para atualização dos relacionamentos de categoria
            // ...
    
            response.json({
                message: 'Category pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/list-categories', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as categorias
            const listCategoriesResponse = await axios.get('https://api.mystore.no/shops/shopname/categories', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCategoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova categoria
    mystoreRoutes.post('/create-category', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova categoria
            // ...
    
            response.json({
                message: 'Category created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma categoria
    mystoreRoutes.get('/view-category/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma categoria
            const viewCategoryResponse = await axios.get(`https://api.mystore.no/shops/shopname/categories/${categoryId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewCategoryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.patch('/update-category/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar a categoria com o ID fornecido
            // ...
    
            response.json({
                message: 'Category updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para deletar uma categoria
    mystoreRoutes.delete('/delete-category/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // TODO: Adicionar lógica para deletar a categoria com o ID fornecido
            // ...
    
            response.json({
                message: 'Category deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os produtos de uma categoria
    mystoreRoutes.get('/list-category-products/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // Chama a API da Mystore para listar todos os produtos de uma categoria
            const listCategoryProductsResponse = await axios.get(`https://api.mystore.no/shops/shopname/categories/${categoryId}/products`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCategoryProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/list-category-product-pivots/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // Chama a API da Mystore para listar todos os relacionamentos de produtos de uma categoria
            const listCategoryProductPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/categories/${categoryId}/relationships/products`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCategoryProductPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar os relacionamentos de produtos de uma categoria
    mystoreRoutes.patch('/update-category-product-pivots/:id', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar os relacionamentos de produtos de uma categoria com o ID fornecido
            // ...
    
            response.json({
                message: 'Category product pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os clientes
    mystoreRoutes.get('/list-customers', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os clientes
            const listCustomersResponse = await axios.get('https://api.mystore.no/shops/shopname/customers', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listCustomersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo cliente
    mystoreRoutes.post('/create-customer', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo cliente
            // ...
    
            response.json({
                message: 'Customer created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/view-customer/:id', async (request: Request, response: Response) => {
        try {
            const customerId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um cliente
            const viewCustomerResponse = await axios.get(`https://api.mystore.no/shops/shopname/customers/${customerId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewCustomerResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar detalhes de um cliente
    mystoreRoutes.patch('/update-customer/:id', async (request: Request, response: Response) => {
        try {
            const customerId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar detalhes de um cliente com o ID fornecido
            // ...
    
            response.json({
                message: 'Customer details updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um cliente
    mystoreRoutes.delete('/delete-customer/:id', async (request: Request, response: Response) => {
        try {
            const customerId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um cliente com o ID fornecido
            // ...
    
            response.json({
                message: 'Customer deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as avaliações de produtos feitas por um cliente
    mystoreRoutes.get('/list-product-reviews/:id', async (request: Request, response: Response) => {
        try {
            const customerId = request.params.id;
    
            // Chama a API da Mystore para listar todas as avaliações de produtos feitas por um cliente
            const listProductReviewsResponse = await axios.get(`https://api.mystore.no/shops/shopname/customers/${customerId}/product-reviews`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listProductReviewsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pedidos feitos por um cliente
    mystoreRoutes.get('/list-orders/:id', async (request: Request, response: Response) => {
        try {
            const customerId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pedidos feitos por um cliente
            const listOrdersResponse = await axios.get(`https://api.mystore.no/shops/shopname/customers/${customerId}/orders`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(listOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/customer-groups', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os grupos de clientes
            const customerGroupsResponse = await axios.get('https://api.mystore.no/shops/shopname/customer-groups', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(customerGroupsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os tokens de login de clientes
    mystoreRoutes.get('/customer-login-tokens', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os tokens de login de clientes
            const customerLoginTokensResponse = await axios.get('https://api.mystore.no/shops/shopname/customer-login-tokens', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(customerLoginTokensResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo token de login de cliente
    mystoreRoutes.post('/customer-login-tokens', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo token de login de cliente
            // ...
    
            response.json({
                message: 'Customer login token created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para fazer upload de uma nova imagem
    mystoreRoutes.post('/images', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para fazer upload de uma nova imagem
            // ...
    
            response.json({
                message: 'Image uploaded successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os atributos de produtos
    mystoreRoutes.get('/product-attributes', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os atributos de produtos
            const productAttributesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-attributes', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productAttributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo atributo de produto
    mystoreRoutes.post('/product-attributes', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um atributo de produto
    mystoreRoutes.get('/product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const productAttributeId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um atributo de produto
            const viewProductAttributeResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-attributes/${productAttributeId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductAttributeResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.patch('/product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const productAttributeId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um atributo de produto
    mystoreRoutes.delete('/product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const productAttributeId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as variantes de produto
    mystoreRoutes.get('/product-variants', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as variantes de produto
            const productVariantsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-variants', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productVariantsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova variante de produto
    mystoreRoutes.post('/product-variants', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova variante de produto
            // ...
    
            response.json({
                message: 'Product variant created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma variante de produto
    mystoreRoutes.get('/product-variants/:id', async (request: Request, response: Response) => {
        try {
            const productVariantId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma variante de produto
            const viewProductVariantResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-variants/${productVariantId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductVariantResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar uma variante de produto
    mystoreRoutes.patch('/product-variants/:id', async (request: Request, response: Response) => {
        try {
            const productVariantId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar uma variante de produto
            // ...
    
            response.json({
                message: 'Product variant updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma variante de produto
    mystoreRoutes.delete('/product-variants/:id', async (request: Request, response: Response) => {
        try {
            const productVariantId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma variante de produto
            // ...
    
            response.json({
                message: 'Product variant deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as ofertas especiais de produto
    mystoreRoutes.get('/product-specials', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as ofertas especiais de produto
            const productSpecialsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-specials', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productSpecialsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova oferta especial de produto
    mystoreRoutes.post('/product-specials', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova oferta especial de produto
            // ...
    
            response.json({
                message: 'Product special created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma oferta especial de produto
    mystoreRoutes.get('/product-specials/:id', async (request: Request, response: Response) => {
        try {
            const productSpecialId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma oferta especial de produto
            const viewProductSpecialResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-specials/${productSpecialId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductSpecialResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.patch('/product-specials/:id', async (request: Request, response: Response) => {
        try {
            const productSpecialId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar uma oferta especial de produto
            // ...
    
            response.json({
                message: 'Product special updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma oferta especial de produto
    mystoreRoutes.delete('/product-specials/:id', async (request: Request, response: Response) => {
        try {
            const productSpecialId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma oferta especial de produto
            // ...
    
            response.json({
                message: 'Product special deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as avaliações de produtos
    mystoreRoutes.get('/product-reviews', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as avaliações de produtos
            const productReviewsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-reviews', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productReviewsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova avaliação de produto
    mystoreRoutes.post('/product-reviews', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova avaliação de produto
            // ...
    
            response.json({
                message: 'Product review created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma avaliação de produto
    mystoreRoutes.get('/product-reviews/:id', async (request: Request, response: Response) => {
        try {
            const productReviewId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma avaliação de produto
            const viewProductReviewResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-reviews/${productReviewId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductReviewResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.delete('/product-reviews/:id', async (request: Request, response: Response) => {
        try {
            const productReviewId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma avaliação de produto
            // ...
    
            response.json({
                message: 'Product review deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as opções de produtos
    mystoreRoutes.get('/product-options', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as opções de produtos
            const productOptionsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-options', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova opção de produto
    mystoreRoutes.post('/product-options', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova opção de produto
            // ...
    
            response.json({
                message: 'Product option created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma opção de produto
    mystoreRoutes.get('/product-options/:id', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma opção de produto
            const viewProductOptionResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-options/${productOptionId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(viewProductOptionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar uma opção de produto
    mystoreRoutes.patch('/product-options/:id', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar uma opção de produto
            // ...
    
            response.json({
                message: 'Product option updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma opção de produto
    mystoreRoutes.delete('/product-options/:id', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma opção de produto
            // ...
    
            response.json({
                message: 'Product option deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as subopções de uma opção de produto
    mystoreRoutes.get('/product-options/:id/product-suboptions', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // Chama a API da Mystore para listar todas as subopções de uma opção de produto
            const productSuboptionsResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-options/${productOptionId}/product-suboptions`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productSuboptionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/product-options/:id/product-option-values', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // Chama a API da Mystore para listar todos os valores de opções de produtos por opção de produto
            const productOptionValuesResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-options/${productOptionId}/product-option-values`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionValuesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pivôs de valores de opções de produtos por opção de produto
    mystoreRoutes.get('/product-options/:id/relationships/product-option-values', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pivôs de valores de opções de produtos por opção de produto
            const productOptionValuesPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-options/${productOptionId}/relationships/product-option-values`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionValuesPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar pivôs de valores de opções de produtos por opção de produto
    mystoreRoutes.patch('/product-options/:id/relationships/product-option-values', async (request: Request, response: Response) => {
        try {
            const productOptionId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar pivôs de valores de opções de produtos por opção de produto
            // ...
    
            response.json({
                message: 'Product option values pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as subopções de produtos
    mystoreRoutes.get('/product-suboptions', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as subopções de produtos
            const productSuboptionsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-suboptions', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productSuboptionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova subopção de produto
    mystoreRoutes.post('/product-suboptions', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova subopção de produto
            // ...
    
            response.json({
                message: 'Product suboption created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.patch('/product-suboptions/:id', async (request: Request, response: Response) => {
        try {
            const productSuboptionId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar uma subopção de produto
            // ...
    
            response.json({
                message: 'Product suboption updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma subopção de produto
    mystoreRoutes.delete('/product-suboptions/:id', async (request: Request, response: Response) => {
        try {
            const productSuboptionId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma subopção de produto
            // ...
    
            response.json({
                message: 'Product suboption deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os valores de opções de produtos por subopção de produto
    mystoreRoutes.get('/product-suboptions/:id/product-option-values', async (request: Request, response: Response) => {
        try {
            const productSuboptionId = request.params.id;
    
            // Chama a API da Mystore para listar todos os valores de opções de produtos por subopção de produto
            const productOptionValuesResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-suboptions/${productSuboptionId}/product-option-values`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionValuesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pivôs de valores de opções de produtos por subopção de produto
    mystoreRoutes.get('/product-suboptions/:id/relationships/product-option-values', async (request: Request, response: Response) => {
        try {
            const productSuboptionId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pivôs de valores de opções de produtos por subopção de produto
            const productOptionValuesPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-suboptions/${productSuboptionId}/relationships/product-option-values`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionValuesPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar pivôs de valores de opções de produtos por subopção de produto
    mystoreRoutes.patch('/product-suboptions/:id/relationships/product-option-values', async (request: Request, response: Response) => {
        try {
            const productSuboptionId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar pivôs de valores de opções de produtos por subopção de produto
            // ...
    
            response.json({
                message: 'Product option values pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/product-option-values', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os valores de opções de produtos
            const productOptionValuesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-option-values', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionValuesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo valor de opção de produto
    mystoreRoutes.post('/product-option-values', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo valor de opção de produto
            // ...
    
            response.json({
                message: 'Product option value created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um valor de opção de produto
    mystoreRoutes.patch('/product-option-values/:id', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um valor de opção de produto
            // ...
    
            response.json({
                message: 'Product option value updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um valor de opção de produto
    mystoreRoutes.delete('/product-option-values/:id', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um valor de opção de produto
            // ...
    
            response.json({
                message: 'Product option value deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pivôs de opções de produtos por valor de opção de produto
    mystoreRoutes.get('/product-option-values/:id/relationships/product-options', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pivôs de opções de produtos por valor de opção de produto
            const productOptionsPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-option-values/${productOptionValueId}/relationships/product-options`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productOptionsPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar pivôs de opções de produtos por valor de opção de produto
    mystoreRoutes.patch('/product-option-values/:id/relationships/product-options', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar pivôs de opções de produtos por valor de opção de produto
            // ...
    
            response.json({
                message: 'Product option values pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pivôs de subopções de produtos por valor de opção de produto
    mystoreRoutes.get('/product-option-values/:id/relationships/product-suboptions', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pivôs de subopções de produtos por valor de opção de produto
            const productSuboptionsPivotsResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-option-values/${productOptionValueId}/relationships/product-suboptions`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productSuboptionsPivotsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar pivôs de subopções de produtos por valor de opção de produto
    mystoreRoutes.patch('/product-option-values/:id/relationships/product-suboptions', async (request: Request, response: Response) => {
        try {
            const productOptionValueId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar pivôs de subopções de produtos por valor de opção de produto
            // ...
    
            response.json({
                message: 'Product suboptions pivots updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as propriedades de produtos
    mystoreRoutes.get('/product-properties', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as propriedades de produtos
            const productPropertiesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-properties', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productPropertiesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/product-properties', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova propriedade de produto
            // ...
    
            response.json({
                message: 'Product property created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma propriedade de produto
    mystoreRoutes.get('/product-properties/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyId = request.params.id;
    
            // Chama a API da Mystore para obter detalhes de uma propriedade de produto
            const productPropertyResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-properties/${productPropertyId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productPropertyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma propriedade de produto
    mystoreRoutes.delete('/product-properties/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma propriedade de produto
            // ...
    
            response.json({
                message: 'Product property deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as opções de propriedades de produtos
    mystoreRoutes.get('/product-property-options', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as opções de propriedades de produtos
            const productPropertyOptionsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-property-options', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    
        
    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productPropertyOptionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova opção de propriedade de produto
    mystoreRoutes.post('/product-property-options', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova opção de propriedade de produto
            // ...
    
            response.json({
                message: 'Product property option created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma opção de propriedade de produto
    mystoreRoutes.get('/product-property-options/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyOptionId = request.params.id;
    
            // Chama a API da Mystore para obter detalhes de uma opção de propriedade de produto
            const productPropertyOptionResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-property-options/${productPropertyOptionId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.delete('/product-property-options/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyOptionId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma opção de propriedade de produto
            // ...
    
            response.json({
                message: 'Product property option deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as opções de propriedades de produtos
    mystoreRoutes.get('/product-property-values', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as opções de propriedades de produtos
            const productPropertyValuesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-property-values', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productPropertyValuesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova opção de propriedade de produto
    mystoreRoutes.post('/product-property-values', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova opção de propriedade de produto
            // ...
    
            response.json({
                message: 'Product property value created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma opção de propriedade de produto
    mystoreRoutes.get('/product-property-values/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyValueId = request.params.id;
    
            // Chama a API da Mystore para obter detalhes de uma opção de propriedade de produto
            const productPropertyValueResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-property-values/${productPropertyValueId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productPropertyValueResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                
     
    code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma opção de propriedade de produto
    mystoreRoutes.delete('/product-property-values/:id', async (request: Request, response: Response) => {
        try {
            const productPropertyValueId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma opção de propriedade de produto
            // ...
    
            response.json({
                message: 'Product property value deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as tags de produtos
    mystoreRoutes.get('/product-tags', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as tags de produtos
            const productTagsResponse = await axios.get('https://api.mystore.no/shops/shopname/product-tags', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productTagsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova tag de produto
    mystoreRoutes.post('/product-tags', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova tag de produto
            // ...
    
            response.json({
                message: 'Product tag created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/product-tags/:id', async (request: Request, response: Response) => {
        try {
            const productTagId = request.params.id;
    
            // Chama a API da Mystore para obter detalhes de uma tag de produto
            const productTagResponse = await axios.get(`https://api.mystore.no/shops/shopname/product-tags/${productTagId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productTagResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma tag de produto
    mystoreRoutes.delete('/product-tags/:id', async (request: Request, response: Response) => {
        try {
            const productTagId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma tag de produto
            // ...
    
            response.json({
                message: 'Product tag deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os preços de grupo de clientes de produtos
    mystoreRoutes.get('/product-customer-group-prices', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os preços de grupo de clientes de produtos
            const productCustomerGroupPricesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-customer-group-prices', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productCustomerGroupPricesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo preço de grupo de clientes de produto
    mystoreRoutes.post('/product-customer-group-prices', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo preço de grupo de clientes de produto
            // ...
    
            response.json({
                message: 'Product customer group price created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um preço de grupo de clientes de produto
    mystoreRoutes.patch('/product-customer-group-prices/:id', async (request: Request, response: Response) => {
        try {
            const productCustomerGroupPriceId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um preço de grupo de clientes de produto
            // ...
    
            response.json({
                message: 'Product customer group price updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.delete('/product-customer-group-prices/:id', async (request: Request, response: Response) => {
        try {
            const productCustomerGroupPriceId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um preço de grupo de clientes de produto
            // ...
    
            response.json({
                message: 'Product customer group price deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os preços de grupo de clientes de atributos de produtos
    mystoreRoutes.get('/product-attribute-customer-group-prices', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os preços de grupo de clientes de atributos de produtos
            const productAttributeCustomerGroupPricesResponse = await axios.get('https://api.mystore.no/shops/shopname/product-attribute-customer-group-prices', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(productAttributeCustomerGroupPricesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo preço de grupo de clientes de atributo de produto
    mystoreRoutes.post('/product-attribute-customer-group-prices', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo preço de grupo de clientes de atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute customer group price created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um preço de grupo de clientes de atributo de produto
    mystoreRoutes.patch('/product-attribute-customer-group-prices/:id', async (request: Request, response: Response) => {
        try {
            const productAttributeCustomerGroupPriceId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um preço de grupo de clientes de atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute customer group price updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um preço de grupo de clientes de atributo de produto
    mystoreRoutes.delete('/product-attribute-customer-group-prices/:id', async (request: Request, response: Response) => {
        try {
            const productAttributeCustomerGroupPriceId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um preço de grupo de clientes de atributo de produto
            // ...
    
            response.json({
                message: 'Product attribute customer group price deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os pedidos
    mystoreRoutes.get('/orders', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os pedidos
            const ordersResponse = await axios.get('https://api.mystore.no/shops/shopname/orders', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(ordersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/orders', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo pedido
            // ...
    
            response.json({
                message: 'Order created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um pedido
    mystoreRoutes.get('/orders/:id', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes do pedido
            const orderDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/orders/${orderId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                
                mes
    message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um pedido
    mystoreRoutes.patch('/orders/:id', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um pedido
            // ...
    
            response.json({
                message: 'Order updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um pedido
    mystoreRoutes.delete('/orders/:id', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um pedido
            // ...
    
            response.json({
                message: 'Order deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para completar um pedido
    mystoreRoutes.patch('/orders/:id/complete', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // TODO: Adicionar lógica para completar um pedido
            // ...
    
            response.json({
                message: 'Order completed successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar totais de pedido por pedido
    mystoreRoutes.get('/orders/:id/order-totals', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // Chama a API da Mystore para listar totais de pedido por pedido
            const orderTotalsResponse = await axios.get(`https://api.mystore.no/shops/shopname/orders/${orderId}/order-totals`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderTotalsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/orders/:id/order-products', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // Chama a API da Mystore para listar todos os produtos de um pedido
            const orderProductsResponse = await axios.get(`https://api.mystore.no/shops/shopname/orders/${orderId}/order-products`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todo o histórico de status de um pedido
    mystoreRoutes.get('/orders/:id/order-status-history', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // Chama a API da Mystore para listar todo o histórico de status de um pedido
            const orderStatusHistoryResponse = await axios.get(`https://api.mystore.no/shops/shopname/orders/${orderId}/order-status-history`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderStatusHistoryResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as tags de um pedido
    mystoreRoutes.get('/orders/:id/order-tags', async (request: Request, response: Response) => {
        try {
            const orderId = request.params.id;
    
            // Chama a API da Mystore para listar todas as tags de um pedido
            const orderTagsResponse = await axios.get(`https://api.mystore.no/shops/shopname/orders/${orderId}/order-tags`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderTagsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os produtos de pedido
    mystoreRoutes.get('/order-products', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os produtos de pedido
            const allOrderProductsResponse = await axios.get('https://api.mystore.no/shops/shopname/order-products', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(allOrderProductsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo produto de pedido
    mystoreRoutes.post('/order-products', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo produto de pedido
            // ...
    
            response.json({
                message: 'Order product created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um produto de pedido
    mystoreRoutes.get('/order-products/:id', async (request: Request, response: Response) => {
        try {
            const orderProductId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes do produto de pedido
            const orderProductDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/order-products/${orderProductId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderProductDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um produto de pedido
    mystoreRoutes.patch('/order-products/:id', async (request: Request, response: Response) => {
        try {
            const orderProductId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um produto de pedido
            // ...
    
            response.json({
                message: 'Order product updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um produto de pedido
    mystoreRoutes.delete('/order-products/:id', async (request: Request, response: Response) => {
        try {
            const orderProductId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um produto de pedido
            // ...
    
            response.json({
                message: 'Order product deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/order-products/:id/order-product-attributes', async (request: Request, response: Response) => {
        try {
            const orderProductId = request.params.id;
    
            // Chama a API da Mystore para listar todos os atributos de produtos de um pedido
            const orderProductAttributesResponse = await axios.get(`https://api.mystore.no/shops/shopname/order-products/${orderProductId}/order-product-attributes`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderProductAttributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os atributos de produtos de pedidos
    mystoreRoutes.get('/order-product-attributes', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os atributos de produtos de pedidos
            const allOrderProductAttributesResponse = await axios.get('https://api.mystore.no/shops/shopname/order-product-attributes', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(allOrderProductAttributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo atributo de produto de pedido
    mystoreRoutes.post('/order-product-attributes', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo atributo de produto de pedido
            // ...
    
            response.json({
                message: 'Order product attribute created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um atributo de produto de pedido
    mystoreRoutes.get('/order-product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const orderProductAttributeId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes do atributo de produto de pedido
            const orderProductAttributeDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/order-product-attributes/${orderProductAttributeId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderProductAttributeDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um atributo de produto de pedido
    mystoreRoutes.delete('/order-product-attributes/:id', async (request: Request, response: Response) => {
        try {
            const orderProductAttributeId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um atributo de produto de pedido
            // ...
    
            response.json({
                message: 'Order product attribute deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os status de pedido
    mystoreRoutes.get('/order-status', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os status de pedido
            const orderStatusResponse = await axios.get('https://api.mystore.no/shops/shopname/order-status', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/order-status/:id/orders', async (request: Request, response: Response) => {
        try {
            const orderStatusId = request.params.id;
    
            // Chama a API da Mystore para listar todos os pedidos por status de pedido
            const ordersByStatusResponse = await axios.get(`https://api.mystore.no/shops/shopname/order-status/${orderStatusId}/orders`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(ordersByStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo histórico de status de pedido
    mystoreRoutes.post('/order-status-history', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo histórico de status de pedido
            // ...
    
            response.json({
                message: 'Order status history created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as tags de pedidos
    mystoreRoutes.get('/order-tags', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as tags de pedidos
            const orderTagsResponse = await axios.get('https://api.mystore.no/shops/shopname/order-tags', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderTagsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova tag de pedido
    mystoreRoutes.post('/order-tags', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova tag de pedido
            // ...
    
            response.json({
                message: 'Order tag created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os totais de pedidos
    mystoreRoutes.get('/order-totals', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os totais de pedidos
            const orderTotalsResponse = await axios.get('https://api.mystore.no/shops/shopname/order-totals', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderTotalsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo total de pedido
    mystoreRoutes.post('/order-totals', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo total de pedido
            // ...
    
            response.json({
                message: 'Order total created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um total de pedido
    mystoreRoutes.get('/order-totals/:id', async (request: Request, response: Response) => {
        try {
            const orderTotalId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um total de pedido
            const orderTotalDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/order-totals/${orderTotalId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(orderTotalDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um total de pedido
    mystoreRoutes.patch('/order-totals/:id', async (request: Request, response: Response) => {
        try {
            const orderTotalId = request.params.id;
    
            // TODO: Adicionar lógica para atualizar um total de pedido
            // ...
    
            response.json({
                message: 'Order total updated successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um total de pedido
    mystoreRoutes.delete('/order-totals/:id', async (request: Request, response: Response) => {
        try {
            const orderTotalId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um total de pedido
            // ...
    
            response.json({
                message: 'Order total deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.get('/manufacturers', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os fabricantes
            const manufacturersResponse = await axios.get('https://api.mystore.no/shops/shopname/manufacturers', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    
         
    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(manufacturersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo fabricante
    mystoreRoutes.post('/manufacturers', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo fabricante
            // ...
    
            response.json({
                message: 'Manufacturer created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um fabricante
    mystoreRoutes.get('/manufacturers/:id', async (request: Request, response: Response) => {
        try {
            const manufacturerId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um fabricante
            const manufacturerDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/manufacturers/${manufacturerId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(manufacturerDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir um fabricante
    mystoreRoutes.delete('/manufacturers/:id', async (request: Request, response: Response) => {
        try {
            const manufacturerId = request.params.id;
    
            // TODO: Adicionar lógica para excluir um fabricante
            // ...
    
            response.json({
                message: 'Manufacturer deleted successfully.',
            });
        } 
     
    catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os fornecedores
    mystoreRoutes.get('/suppliers', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os fornecedores
            const suppliersResponse = await axios.get('https://api.mystore.no/shops/shopname/suppliers', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(suppliersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    mystoreRoutes.post('/discounts', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo desconto
            // ...
    
            response.json({
                message: 'Discount created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todas as classes de impostos
    mystoreRoutes.get('/tax-classes', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todas as classes de impostos
            const taxClassesResponse = await axios.get('https://api.mystore.no/shops/shopname/tax-classes', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(taxClassesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar uma nova classe de imposto
    mystoreRoutes.post('/tax-classes', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar uma nova classe de imposto
            // ...
    
            response.json({
                message: 'Tax class created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de uma classe de imposto
    mystoreRoutes.get('/tax-classes/:id', async (request: Request, response: Response) => {
        try {
            const taxClassId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de uma classe de imposto
            const taxClassDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/tax-classes/${taxClassId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(taxClassDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para excluir uma classe de imposto
    mystoreRoutes.delete('/tax-classes/:id', async (request: Request, response: Response) => {
        try {
            const taxClassId = request.params.id;
    
            // TODO: Adicionar lógica para excluir uma classe de imposto
            // ...
    
            response.json({
                message: 'Tax class deleted successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os visitantes
    mystoreRoutes.get('/visitors', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os visitantes
            const visitorsResponse = await axios.get('https://api.mystore.no/shops/shopname/visitors', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(visitorsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar todos os redirecionamentos
    mystoreRoutes.get('/redirects', async (request: Request, response: Response) => {
        try {
            // Chama a API da Mystore para listar todos os redirecionamentos
            const redirectsResponse = await axios.get('https://api.mystore.no/shops/shopname/redirects', {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(redirectsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para criar um novo redirecionamento
    mystoreRoutes.post('/redirects', async (request: Request, response: Response) => {
        try {
            // TODO: Adicionar lógica para criar um novo redirecionamento
            // ...
    
            response.json({
                message: 'Redirect created successfully.',
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para visualizar detalhes de um redirecionamento
    mystoreRoutes.get('/redirects/:id', async (request: Request, response: Response) => {
        try {
            const redirectId = request.params.id;
    
            // Chama a API da Mystore para visualizar detalhes de um redirecionamento
            const redirectDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/redirects/${redirectId}`, {
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'User-Agent': 'Mystore Api Documentation',
                    'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(redirectDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    // Rota para excluir um redirecionamento
mystoreRoutes.delete('/redirects/:id', async (request: Request, response: Response) => {
    try {
        const redirectId = request.params.id;

        // Chama a API da Mystore para excluir um redirecionamento
        await axios.delete(`https://api.mystore.no/shops/shopname/redirects/${redirectId}`, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json({
            message: 'Redirect deleted successfully.',
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todas as configurações
mystoreRoutes.get('/settings', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todas as configurações
        const settingsResponse = await axios.get('https://api.mystore.no/shops/shopname/settings', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(settingsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todos os módulos de envio
mystoreRoutes.get('/shipping', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todos os módulos de envio
        const shippingResponse = await axios.get('https://api.mystore.no/shops/shopname/shipping', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todos os módulos de pagamento
mystoreRoutes.get('/payment', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todos os módulos de pagamento
        const paymentResponse = await axios.get('https://api.mystore.no/shops/shopname/payment', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(paymentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todas as moedas
mystoreRoutes.get('/currencies', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todas as moedas
        const currenciesResponse = await axios.get('https://api.mystore.no/shops/shopname/currencies', {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(currenciesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todos os idiomas
mystoreRoutes.get('/languages', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todos os idiomas
        const languagesResponse = await axios.get('https://api.mystore.no/shops/shopname/languages', {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(languagesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
// Rota para operação em lote não atômica
mystoreRoutes.post('/non-atomic-batch', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para operação em lote não atômica
        const batchResponse = await axios.post('https://api.mystore.no/shops/shopname/non-atomic-batch', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(batchResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para operação em lote atômica
mystoreRoutes.post('/atomic-batch', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para operação em lote atômica
        const batchResponse = await axios.post('https://api.mystore.no/shops/shopname/atomic-batch', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(batchResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todo o histórico de pontos de bônus
mystoreRoutes.get('/bonus-points-history', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todo o histórico de pontos de bônus
        const bonusPointsHistoryResponse = await axios.get('https://api.mystore.no/shops/shopname/bonus-points-history', {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bonusPointsHistoryResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todos os relatórios Z
mystoreRoutes.get('/z-reports', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todos os relatórios Z
        const zReportsResponse = await axios.get('https://api.mystore.no/shops/shopname/z-reports', {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(zReportsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todos os webhooks
mystoreRoutes.get('/webhooks', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para listar todos os webhooks
        const webhooksResponse = await axios.get('https://api.mystore.no/shops/shopname/webhooks', {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(webhooksResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para criar um novo webhook
mystoreRoutes.post('/webhooks', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para criar um novo webhook
        const createWebhookResponse = await axios.post('https://api.mystore.no/shops/shopname/webhooks', request.body, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createWebhookResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
mystoreRoutes.get('/webhooks/:id', async (request: Request, response: Response) => {
    const webhookId = request.params.id;

    try {
        // Chama a API da Mystore para visualizar detalhes de um webhook
        const webhookDetailResponse = await axios.get(`https://api.mystore.no/shops/shopname/webhooks/${webhookId}`, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(webhookDetailResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para atualizar um webhook
mystoreRoutes.patch('/webhooks/:id', async (request: Request, response: Response) => {
    const webhookId = request.params.id;

    try {
        // Chama a API da Mystore para atualizar um webhook
        const updateWebhookResponse = await axios.patch(`https://api.mystore.no/shops/shopname/webhooks/${webhookId}`, request.body, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateWebhookResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para excluir um webhook
mystoreRoutes.delete('/webhooks/:id', async (request: Request, response: Response) => {
    const webhookId = request.params.id;

    try {
        // Chama a API da Mystore para excluir um webhook
        const deleteWebhookResponse = await axios.delete(`https://api.mystore.no/shops/shopname/webhooks/${webhookId}`, {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteWebhookResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para verificar se o EAN existe
mystoreRoutes.post('/rpc/products/verify-if-ean-exists', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para verificar se o EAN existe
        const verifyEANResponse = await axios.post('https://api.mystore.no/shops/shopname/rpc/products/verify-if-ean-exists', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(verifyEANResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para reservar estoque de produtos
mystoreRoutes.post('/rpc/products/product-stock-reserved', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para reservar estoque de produtos
        const reserveStockResponse = await axios.post('https://api.mystore.no/shops/shopname/rpc/products/product-stock-reserved', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(reserveStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter todas as impressoras Logistra
mystoreRoutes.get('/rpc/logistra/get-printers', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para obter todas as impressoras Logistra
        const getPrintersResponse = await axios.get('https://api.mystore.no/shops/shopname/rpc/logistra/get-printers', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getPrintersResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter todos os métodos de envio Logistra
mystoreRoutes.get('/rpc/logistra/get-shipping-methods', async (request: Request, response: Response) => {
    try {
        // Chama a API da Mystore para obter todos os métodos de envio Logistra
        const getShippingMethodsResponse = await axios.get('https://api.mystore.no/shops/shopname/rpc/logistra/get-shipping-methods', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mystore Api Documentation',
                'Authorization': 'Bearer <INSERT-YOUR-TOKEN-HERE>',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getShippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
});

export default mystoreRoutes;