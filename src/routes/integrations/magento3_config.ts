import { Request, Response, Router } from "express";
import axios from 'axios';

const magento2Routes = Router();

// Rota para excluir um endereço de cliente por ID
magento2Routes.delete('/addresses/:addressId', async (request: Request, response: Response) => {
    const addressId = request.params.addressId;

    try {
        // Chama a API do Magento 2 para excluir um endereço de cliente por ID
        const deleteAddressResponse = await axios.delete(`https://magento2-api-url/rest/V1/addresses/${addressId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para verificar a configuração de eventos Adobe IO no Magento 2
magento2Routes.get('/adobe_io_events/check_configuration', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para verificar a configuração de eventos Adobe IO
        const checkConfigResponse = await axios.get('https://magento2-api-url/rest/V1/adobe_io_events/check_configuration', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkConfigResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para pesquisar imagens no Adobe Stock com base em critérios de pesquisa no Magento 2
magento2Routes.get('/adobestock/asset/list', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para pesquisar imagens no Adobe Stock
        const searchAssetsResponse = await axios.get('https://magento2-api-url/rest/V1/adobestock/asset/list', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(searchAssetsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter uma lista de ativos do Adobe Stock no Magento 2
magento2Routes.get('/adobestock/asset/search', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter uma lista de ativos do Adobe Stock
        const getAssetsResponse = await axios.get('https://magento2-api-url/rest/V1/adobestock/asset/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getAssetsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para excluir um ativo do Adobe Stock por ID no Magento 2
magento2Routes.delete('/adobestock/asset/:id', async (request: Request, response: Response) => {
    const assetId = request.params.id;

    try {
        // Chama a API do Magento 2 para excluir um ativo do Adobe Stock por ID
        const deleteAssetResponse = await axios.delete(`https://magento2-api-url/rest/V1/adobestock/asset/${assetId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteAssetResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter detalhes de um ativo do Adobe Stock por ID no Magento 2
magento2Routes.get('/adobestock/asset/:id', async (request: Request, response: Response) => {
    const assetId = request.params.id;

    try {
        // Chama a API do Magento 2 para obter detalhes de um ativo do Adobe Stock por ID
        const getAssetResponse = await axios.get(`https://magento2-api-url/rest/V1/adobestock/asset/${assetId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getAssetResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
    magento2Routes.get('/adobestock/search', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para pesquisar imagens no Adobe Stock
            const searchResponse = await axios.get('https://magento2-api-url/rest/V1/adobestock/search', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
                params: request.query,
            });
    
            response.json(searchResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter detalhes de um link de analytics no Magento 2
    magento2Routes.get('/analytics/link', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter detalhes de um link de analytics
            const analyticsLinkResponse = await axios.get('https://magento2-api-url/rest/V1/analytics/link', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(analyticsLinkResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter detalhes de autenticação do Apple Pay no Magento 2
    magento2Routes.get('/applepay/auth', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter detalhes de autenticação do Apple Pay
            const applePayAuthResponse = await axios.get('https://magento2-api-url/rest/V1/applepay/auth', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(applePayAuthResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todos os metadados de atributos de clientes no Magento 2
    magento2Routes.get('/attributeMetadata/customer', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter todos os metadados de atributos de clientes
            const attributeMetadataResponse = await axios.get('https://magento2-api-url/rest/V1/attributeMetadata/customer', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(attributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter detalhes de um atributo de cliente específico no Magento 2
    magento2Routes.get('/attributeMetadata/customer/attribute/:attributeCode', async (request: Request, response: Response) => {
        const attributeCode = request.params.attributeCode;
    
        try {
            // Chama a API do Magento 2 para obter detalhes de um atributo de cliente específico
            const attributeDetailResponse = await axios.get(`https://magento2-api-url/rest/V1/attributeMetadata/customer/attribute/${attributeCode}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(attributeDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    magento2Routes.get('/attributeMetadata/customer/custom', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter metadados de atributos personalizados para a interface de dados fornecida
            const customAttributeMetadataResponse = await axios.get('https://magento2-api-url/rest/V1/attributeMetadata/customer/custom', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
                params: request.query,
            });
    
            response.json(customAttributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todos os atributos filtrados por código de formulário no Magento 2
    magento2Routes.get('/attributeMetadata/customer/form/:formCode', async (request: Request, response: Response) => {
        const formCode = request.params.formCode;
    
        try {
            // Chama a API do Magento 2 para obter todos os atributos filtrados por código de formulário
            const formAttributeMetadataResponse = await axios.get(`https://magento2-api-url/rest/V1/attributeMetadata/customer/form/${formCode}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(formAttributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todos os metadados de atributos de endereço de cliente no Magento 2
    magento2Routes.get('/attributeMetadata/customerAddress', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter todos os metadados de atributos de endereço de cliente
            const addressAttributeMetadataResponse = await axios.get('https://magento2-api-url/rest/V1/attributeMetadata/customerAddress', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(addressAttributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter detalhes de um atributo de endereço de cliente específico no Magento 2
    magento2Routes.get('/attributeMetadata/customerAddress/attribute/:attributeCode', async (request: Request, response: Response) => {
        const attributeCode = request.params.attributeCode;
    
        try {
            // Chama a API do Magento 2 para obter detalhes de um atributo de endereço de cliente específico
            const addressAttributeDetailResponse = await axios.get(`https://magento2-api-url/rest/V1/attributeMetadata/customerAddress/attribute/${attributeCode}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(addressAttributeDetailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter metadados de atributos personalizados para a interface de dados de endereço de cliente fornecida no Magento 2
    magento2Routes.get('/attributeMetadata/customerAddress/custom', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter metadados de atributos personalizados para a interface de dados de endereço de cliente fornecida
            const customAddressAttributeMetadataResponse = await axios.get('https://magento2-api-url/rest/V1/attributeMetadata/customerAddress/custom', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
                params: request.query,
            });
    
            response.json(customAddressAttributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    magento2Routes.get('/attributeMetadata/customerAddress/form/:formCode', async (request: Request, response: Response) => {
        const formCode = request.params.formCode;
    
        try {
            // Chama a API do Magento 2 para obter todos os metadados de atributos de endereço de cliente filtrados por código de formulário
            const formAttributeMetadataResponse = await axios.get(`https://magento2-api-url/rest/V1/attributeMetadata/customerAddress/form/${formCode}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(formAttributeMetadataResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para listar itens de operações em massa que correspondem aos critérios de pesquisa especificados no Magento 2
    magento2Routes.get('/bulk', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para listar itens de operações em massa que correspondem aos critérios de pesquisa especificados
            const bulkItemsResponse = await axios.get('https://magento2-api-url/rest/V1/bulk', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
                params: request.query,
            });
    
            response.json(bulkItemsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter dados resumidos do Bulk com lista de itens de operações completos no Magento 2
    magento2Routes.get('/bulk/:bulkUuid/detailed-status', async (request: Request, response: Response) => {
        const bulkUuid = request.params.bulkUuid;
    
        try {
            // Chama a API do Magento 2 para obter dados resumidos do Bulk com lista de itens de operações completos
            const detailedBulkStatusResponse = await axios.get(`https://magento2-api-url/rest/V1/bulk/${bulkUuid}/detailed-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(detailedBulkStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter a contagem de operações por UUID em massa e status no Magento 2
    magento2Routes.get('/bulk/:bulkUuid/operation-status/:status', async (request: Request, response: Response) => {
        const bulkUuid = request.params.bulkUuid;
        const status = request.params.status;
    
        try {
            // Chama a API do Magento 2 para obter a contagem de operações por UUID em massa e status
            const operationStatusCountResponse = await axios.get(`https://magento2-api-url/rest/V1/bulk/${bulkUuid}/operation-status/${status}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(operationStatusCountResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter dados resumidos do Bulk com lista de itens de operações curtos no Magento 2
    magento2Routes.get('/bulk/:bulkUuid/status', async (request: Request, response: Response) => {
        const bulkUuid = request.params.bulkUuid;
    
        try {
            // Chama a API do Magento 2 para obter dados resumidos do Bulk com lista de itens de operações curtos
            const shortBulkStatusResponse = await axios.get(`https://magento2-api-url/rest/V1/bulk/${bulkUuid}/status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(shortBulkStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para adicionar uma nova opção para um produto de conjunto no Magento 2
    magento2Routes.post('/bundle-products/options/add', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para adicionar uma nova opção para um produto de conjunto
            const addBundleOptionResponse = await axios.post('https://magento2-api-url/rest/V1/bundle-products/options/add', request.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(addBundleOptionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todos os tipos de opções para produtos de conjunto no Magento 2
    magento2Routes.get('/bundle-products/options/types', async (request: Request, response: Response) => {
        try {
            // Chama a API do Magento 2 para obter todos os tipos de opções para produtos de conjunto
            const bundleOptionTypesResponse = await axios.get('https://magento2-api-url/rest/V1/bundle-products/options/types', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(bundleOptionTypesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });

    magento2Routes.put('/bundle-products/options/:optionId', async (request: Request, response: Response) => {
        const optionId = request.params.optionId;
    
        try {
            // Chama a API do Magento 2 para adicionar uma nova opção para um produto de conjunto
            const addBundleOptionResponse = await axios.put(`https://magento2-api-url/rest/V1/bundle-products/options/${optionId}`, request.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(addBundleOptionResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para obter todos os filhos para um produto de conjunto no Magento 2
    magento2Routes.get('/bundle-products/:productSku/children', async (request: Request, response: Response) => {
        const productSku = request.params.productSku;
    
        try {
            // Chama a API do Magento 2 para obter todos os filhos para um produto de conjunto
            const bundleChildrenResponse = await axios.get(`https://magento2-api-url/rest/V1/bundle-products/${productSku}/children`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
                params: request.query,
            });
    
            response.json(bundleChildrenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    
    // Rota para atualizar um link para um produto de conjunto no Magento 2
    magento2Routes.put('/bundle-products/:sku/links/:id', async (request: Request, response: Response) => {
        const sku = request.params.sku;
        const id = request.params.id;
    
        try {
            // Chama a API do Magento 2 para atualizar um link para um produto de conjunto
            const updateBundleLinkResponse = await axios.put(`https://magento2-api-url/rest/V1/bundle-products/${sku}/links/${id}`, request.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Outros cabeçalhos conforme necessário
                },
            });
    
            response.json(updateBundleLinkResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    });
    // Rota para adicionar um novo produto filho a uma opção de conjunto específica por SKU
magento2Routes.post('/bundle-products/:sku/links/:optionId', async (request: Request, response: Response) => {
    const sku = request.params.sku;
    const optionId = request.params.optionId;

    try {
        // Chama a API do Magento 2 para adicionar um novo produto filho a uma opção de conjunto
        const addChildToBundleOptionResponse = await axios.post(`https://magento2-api-url/rest/V1/bundle-products/${sku}/links/${optionId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addChildToBundleOptionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter todas as opções para um produto de conjunto no Magento 2
magento2Routes.get('/bundle-products/:sku/options/all', async (request: Request, response: Response) => {
    const sku = request.params.sku;

    try {
        // Chama a API do Magento 2 para obter todas as opções para um produto de conjunto
        const allBundleOptionsResponse = await axios.get(`https://magento2-api-url/rest/V1/bundle-products/${sku}/options/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(allBundleOptionsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter uma opção específica para um produto de conjunto no Magento 2
magento2Routes.get('/bundle-products/:sku/options/:optionId', async (request: Request, response: Response) => {
    const sku = request.params.sku;
    const optionId = request.params.optionId;

    try {
        // Chama a API do Magento 2 para obter uma opção específica para um produto de conjunto
        const bundleOptionResponse = await axios.get(`https://magento2-api-url/rest/V1/bundle-products/${sku}/options/${optionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bundleOptionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para remover uma opção de conjunto no Magento 2
magento2Routes.delete('/bundle-products/:sku/options/:optionId', async (request: Request, response: Response) => {
    const sku = request.params.sku;
    const optionId = request.params.optionId;

    try {
        // Chama a API do Magento 2 para remover uma opção de conjunto
        const removeBundleOptionResponse = await axios.delete(`https://magento2-api-url/rest/V1/bundle-products/${sku}/options/${optionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeBundleOptionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para remover um produto de uma opção de conjunto no Magento 2
magento2Routes.delete('/bundle-products/:sku/options/:optionId/children/:childSku', async (request: Request, response: Response) => {
    const sku = request.params.sku;
    const optionId = request.params.optionId;
    const childSku = request.params.childSku;

    try {
        // Chama a API do Magento 2 para remover um produto de uma opção de conjunto
        const removeChildFromBundleOptionResponse = await axios.delete(`https://magento2-api-url/rest/V1/bundle-products/${sku}/options/${optionId}/children/${childSku}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeChildFromBundleOptionResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
// Rota para criar um carrinho vazio e cotação para um visitante (guest)
magento2Routes.post('/carts/', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para criar um carrinho vazio
        const createCartResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCartResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para verificar o saldo do cartão presente se adicionado ao carrinho
magento2Routes.get('/carts/guest-carts/:cartId/checkGiftCard/:giftCardCode', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const giftCardCode = request.params.giftCardCode;

    try {
        // Chama a API do Magento 2 para verificar o saldo do cartão presente no carrinho
        const checkGiftCardBalanceResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/guest-carts/${cartId}/checkGiftCard/${giftCardCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkGiftCardBalanceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para adicionar um cartão presente ao carrinho
magento2Routes.post('/carts/guest-carts/:cartId/giftCards', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        // Chama a API do Magento 2 para adicionar um cartão presente ao carrinho
        const addGiftCardToCartResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/guest-carts/${cartId}/giftCards`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addGiftCardToCartResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para remover um cartão presente do carrinho
magento2Routes.delete('/carts/guest-carts/:cartId/giftCards/:giftCardCode', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const giftCardCode = request.params.giftCardCode;

    try {
        // Chama a API do Magento 2 para remover um cartão presente do carrinho
        const removeGiftCardFromCartResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/guest-carts/${cartId}/giftCards/${giftCardCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeGiftCardFromCartResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar acordos de checkout ativos
magento2Routes.get('/carts/licence', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para listar acordos de checkout ativos
        const activeCheckoutAgreementsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/licence`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(activeCheckoutAgreementsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar acordos de checkout
magento2Routes.get('/carts/licence/list', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para listar todos os acordos de checkout
        const allCheckoutAgreementsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/licence/list`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(allCheckoutAgreementsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
// Rota para salvar uma cotação (quote)
magento2Routes.put('/carts/mine', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para salvar uma cotação
        const saveQuoteResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveQuoteResponse.data);
    } catch (error) {
        console.error(error);
        response.status(401).json({
            code: 'Unauthorized',
            message: 'The request has not been applied because it lacks valid authentication credentials.',
        });
    }
});

// Rota para criar um carrinho e cotação vazios para um cliente especificado
magento2Routes.post('/carts/mine', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para criar um carrinho e cotação vazios para um cliente
        const createCartResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCartResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter informações sobre o carrinho de um cliente
magento2Routes.get('/carts/mine', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter informações sobre o carrinho de um cliente
        const getCartInfoResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCartInfoResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para aplicar crédito da loja
magento2Routes.post('/carts/mine/balance/apply', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para aplicar crédito da loja
        const applyStoreCreditResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/balance/apply`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(applyStoreCreditResponse.data);
    } catch (error) {
        console.error(error);
        response.status(401).json({
            code: 'Unauthorized',
            message: 'The request has not been applied because it lacks valid authentication credentials.',
        });
    }
});

// Rota para obter o endereço de cobrança para uma cotação específica
magento2Routes.get('/carts/mine/billing-address', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter o endereço de cobrança para uma cotação específica
        const getBillingAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/billing-address`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para atribuir um endereço de cobrança a uma cotação específica
magento2Routes.post('/carts/mine/billing-address', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para atribuir um endereço de cobrança a uma cotação específica
        const assignBillingAddressResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/billing-address`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
// Rota para verificar o saldo do cartão de presente aplicado a um carrinho específico
magento2Routes.get('/carts/mine/checkGiftCard/:giftCardCode', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para verificar o saldo do cartão de presente
        const checkGiftCardResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/checkGiftCard/${request.params.giftCardCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkGiftCardResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para definir métodos de envio/cobrança e dados adicionais para um carrinho e coletar totais
magento2Routes.put('/carts/mine/collect-totals', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para coletar totais
        const collectTotalsResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine/collect-totals`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(collectTotalsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para obter informações sobre cupons em um carrinho específico
magento2Routes.get('/carts/mine/coupons', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter informações sobre cupons
        const getCouponsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/coupons`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCouponsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para deletar um cupom de um carrinho específico
magento2Routes.delete('/carts/mine/coupons', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para deletar um cupom
        const deleteCouponResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/mine/coupons`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para adicionar um cupom por código a um carrinho específico
magento2Routes.put('/carts/mine/coupons/:couponCode', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para adicionar um cupom por código
        const addCouponResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine/coupons/${request.params.couponCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para estimar métodos de envio por endereço
magento2Routes.post('/carts/mine/estimate-shipping-methods', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para estimar métodos de envio
        const estimateShippingMethodsResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/estimate-shipping-methods`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Rota para estimar métodos de envio por ID de endereço
magento2Routes.post('/carts/mine/estimate-shipping-methods-by-address-id', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para estimar métodos de envio por ID de endereço
        const estimateShippingMethodsResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/estimate-shipping-methods-by-address-id`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para obter mensagem de presente para um pedido específico
magento2Routes.get('/carts/mine/gift-message', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter mensagem de presente
        const getGiftMessageResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/gift-message`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para definir mensagem de presente para um pedido inteiro
magento2Routes.post('/carts/mine/gift-message', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para definir mensagem de presente para um pedido inteiro
        const setGiftMessageResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/gift-message`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para obter mensagem de presente para um item específico em um carrinho específico
magento2Routes.get('/carts/mine/gift-message/:itemId', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter mensagem de presente para um item específico
        const getItemGiftMessageResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/gift-message/${request.params.itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getItemGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para definir mensagem de presente para um item específico em um carrinho específico
magento2Routes.post('/carts/mine/gift-message/:itemId', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para definir mensagem de presente para um item específico
        const setItemGiftMessageResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/gift-message/${request.params.itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setItemGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para adicionar um cartão presente ao carrinho
magento2Routes.post('/carts/mine/giftCards', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para adicionar um cartão presente ao carrinho
        const addGiftCardResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/giftCards`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addGiftCardResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para remover uma entidade de cartão presente
magento2Routes.delete('/carts/mine/giftCards/:giftCardCode', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para remover uma entidade de cartão presente
        const removeGiftCardResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/mine/giftCards/${request.params.giftCardCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeGiftCardResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Rota para listar itens atribuídos a um carrinho específico
magento2Routes.get('/carts/mine/items', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para listar itens de um carrinho específico
        const listCartItemsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/items`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(listCartItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para adicionar/atualizar um item de carrinho específico
magento2Routes.post('/carts/mine/items', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para adicionar/atualizar um item de carrinho específico
        const updateCartItemResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/items`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateCartItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para adicionar/atualizar um item de carrinho específico por ID de item
magento2Routes.put('/carts/mine/items/:itemId', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para adicionar/atualizar um item de carrinho específico por ID de item
        const updateCartItemByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine/items/${request.params.itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateCartItemByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para remover um item específico de um carrinho
magento2Routes.delete('/carts/mine/items/:itemId', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para remover um item específico de um carrinho
        const removeCartItemResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/mine/items/${request.params.itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeCartItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para fazer um pedido para um carrinho específico
magento2Routes.put('/carts/mine/order', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para fazer um pedido para um carrinho específico
        const placeOrderResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine/order`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(placeOrderResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para definir informações de pagamento e fazer um pedido para um carrinho específico
magento2Routes.post('/carts/mine/payment-information', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para definir informações de pagamento e fazer um pedido para um carrinho específico
        const setPaymentInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/payment-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setPaymentInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Rota para obter informações de pagamento para um carrinho específico
magento2Routes.get('/carts/mine/payment-information', async (request: Request, response: Response) => {
    try {
        // Chama a API do Magento 2 para obter informações de pagamento para um carrinho específico
        const getPaymentInformationResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/payment-information`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getPaymentInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Lista os métodos de pagamento disponíveis para um carrinho específico
magento2Routes.get('/carts/mine/payment-methods', async (request: Request, response: Response) => {
    try {
        const paymentMethodsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/payment-methods`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(paymentMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Define informações de pagamento e faz um pedido para um carrinho específico
magento2Routes.post('/carts/mine/po-payment-information', async (request: Request, response: Response) => {
    try {
        const setPoPaymentInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/po-payment-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setPoPaymentInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna o método de pagamento para um carrinho específico
magento2Routes.get('/carts/mine/selected-payment-method', async (request: Request, response: Response) => {
    try {
        const selectedPaymentMethodResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/selected-payment-method`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(selectedPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adiciona um método de pagamento especificado a um carrinho específico
magento2Routes.put('/carts/mine/selected-payment-method', async (request: Request, response: Response) => {
    try {
        const addPaymentMethodResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/mine/selected-payment-method`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Define informações de pagamento para um carrinho específico
magento2Routes.post('/carts/mine/set-payment-information', async (request: Request, response: Response) => {
    try {
        const setPaymentInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/set-payment-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setPaymentInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Configura informações de envio para um carrinho específico
magento2Routes.post('/carts/mine/shipping-information', async (request: Request, response: Response) => {
    try {
        const setShippingInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/mine/shipping-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setShippingInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Lista os métodos de envio aplicáveis para uma cotação específica
magento2Routes.get('/carts/mine/shipping-methods', async (request: Request, response: Response) => {
    try {
        const shippingMethodsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/mine/shipping-methods`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Adiciona um cupom pelo código a um carrinho específico
magento2Routes.put('/carts/:cartId/coupons/:couponCode', async (request: Request, response: Response) => {
    const { cartId, couponCode } = request.params;

    try {
        const addCouponResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/${cartId}/coupons/${couponCode}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Estima o envio por endereço e retorna a lista de métodos de envio disponíveis
magento2Routes.post('/carts/:cartId/estimate-shipping-methods', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const estimateShippingResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/estimate-shipping-methods`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Estima o envio por ID de endereço
magento2Routes.post('/carts/:cartId/estimate-shipping-methods-by-address-id', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const estimateShippingByIdResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/estimate-shipping-methods-by-address-id`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna a mensagem de presente para um pedido específico
magento2Routes.get('/carts/:cartId/gift-message', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const giftMessageResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/gift-message`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(giftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Define a mensagem de presente para um pedido inteiro
magento2Routes.post('/carts/:cartId/gift-message', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const setGiftMessageResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/gift-message`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna a mensagem de presente para um item específico em um carrinho específico
magento2Routes.get('/carts/:cartId/gift-message/:itemId', async (request: Request, response: Response) => {
    const { cartId, itemId } = request.params;

    try {
        const giftMessageItemResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/gift-message/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(giftMessageItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Define a mensagem de presente para um item específico em um carrinho específico
magento2Routes.post('/carts/:cartId/gift-message/:itemId', async (request: Request, response: Response) => {
    const { cartId, itemId } = request.params;

    try {
        const setGiftMessageItemResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/gift-message/${itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setGiftMessageItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Adiciona um cartão-presente ao carrinho
magento2Routes.put('/carts/:cartId/giftCards', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const addGiftCardResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/${cartId}/giftCards`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addGiftCardResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Remove uma entidade de cartão-presente do carrinho
magento2Routes.delete('/carts/:cartId/giftCards/:giftCardCode', async (request: Request, response: Response) => {
    const { cartId, giftCardCode } = request.params;

    try {
        const removeGiftCardResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/${cartId}/giftCards/${giftCardCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeGiftCardResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Lista itens atribuídos a um carrinho específico
magento2Routes.get('/carts/:cartId/items', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const cartItemsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/items`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cartItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adiciona/atualiza um item específico no carrinho
magento2Routes.put('/carts/:cartId/items/:itemId', async (request: Request, response: Response) => {
    const { cartId, itemId } = request.params;

    try {
        const updateCartItemResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/${cartId}/items/${itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateCartItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Remove um item específico do carrinho
magento2Routes.delete('/carts/:cartId/items/:itemId', async (request: Request, response: Response) => {
    const { cartId, itemId } = request.params;

    try {
        const removeCartItemResponse = await axios.delete(`https://magento2-api-url/rest/V1/carts/${cartId}/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeCartItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Coloca um pedido para um carrinho específico
magento2Routes.put('/carts/:cartId/order', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const placeOrderResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/${cartId}/order`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(placeOrderResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Lista métodos de pagamento disponíveis para um carrinho específico
magento2Routes.get('/carts/:cartId/payment-methods', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const paymentMethodsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/payment-methods`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(paymentMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna o método de pagamento para um carrinho específico
magento2Routes.get('/carts/:cartId/selected-payment-method', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const selectedPaymentMethodResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/selected-payment-method`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(selectedPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adiciona um método de pagamento específico a um carrinho específico
magento2Routes.put('/carts/:cartId/selected-payment-method', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const addPaymentMethodResponse = await axios.put(`https://magento2-api-url/rest/V1/carts/${cartId}/selected-payment-method`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Informações de envio para um carrinho específico
magento2Routes.post('/carts/:cartId/shipping-information', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const shippingInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/shipping-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Lista métodos de envio aplicáveis para um carrinho específico
magento2Routes.get('/carts/:cartId/shipping-methods', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const shippingMethodsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/shipping-methods`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Retorna dados totais do orçamento para um carrinho específico
magento2Routes.get('/carts/:cartId/totals', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const totalsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${cartId}/totals`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(totalsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Calcula totais do orçamento com base no endereço e no método de envio
magento2Routes.post('/carts/:cartId/totals-information', async (request: Request, response: Response) => {
    const { cartId } = request.params;

    try {
        const totalsInformationResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${cartId}/totals-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(totalsInformationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna cartões de conta GiftCard
magento2Routes.get('/carts/:quoteId/giftCards', async (request: Request, response: Response) => {
    const { quoteId } = request.params;

    try {
        const giftCardsResponse = await axios.get(`https://magento2-api-url/rest/V1/carts/${quoteId}/giftCards`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(giftCardsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adiciona/atualiza o item do carrinho especificado
magento2Routes.post('/carts/:quoteId/items', async (request: Request, response: Response) => {
    const { quoteId } = request.params;

    try {
        const cartItemResponse = await axios.post(`https://magento2-api-url/rest/V1/carts/${quoteId}/items`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cartItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cria um serviço de categoria
magento2Routes.post('/categories', async (request: Request, response: Response) => {
    try {
        const createCategoryResponse = await axios.post('https://magento2-api-url/rest/V1/categories', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCategoryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obtém uma lista de categorias
magento2Routes.get('/categories', async (request: Request, response: Response) => {
    try {
        const getCategoriesResponse = await axios.get('https://magento2-api-url/rest/V1/categories', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCategoriesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obtém todos os atributos para o tipo de entidade de categoria
magento2Routes.get('/categories/attributes', async (request: Request, response: Response) => {
    try {
        const getCategoryAttributesResponse = await axios.get('https://magento2-api-url/rest/V1/categories/attributes', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCategoryAttributesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Recupera um atributo específico
magento2Routes.get('/categories/attributes/:attributeCode', async (request: Request, response: Response) => {
    const { attributeCode } = request.params;

    try {
        const attributeResponse = await axios.get(`https://magento2-api-url/rest/V1/categories/attributes/${attributeCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(attributeResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Recupera a lista de opções de atributos
magento2Routes.get('/categories/attributes/:attributeCode/options', async (request: Request, response: Response) => {
    const { attributeCode } = request.params;

    try {
        const attributeOptionsResponse = await axios.get(`https://magento2-api-url/rest/V1/categories/attributes/${attributeCode}/options`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(attributeOptionsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obtém uma lista de categorias
magento2Routes.get('/categories/list', async (request: Request, response: Response) => {
    try {
        const getCategoriesListResponse = await axios.get('https://magento2-api-url/rest/V1/categories/list', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCategoriesListResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Exclui uma categoria por identificador
magento2Routes.delete('/categories/:categoryId', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const deleteCategoryResponse = await axios.delete(`https://magento2-api-url/rest/V1/categories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCategoryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obtém informações sobre uma categoria por ID
magento2Routes.get('/categories/:categoryId', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const getCategoryByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/categories/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCategoryByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Move uma categoria
magento2Routes.put('/categories/:categoryId/move', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const moveCategoryResponse = await axios.put(`https://magento2-api-url/rest/V1/categories/${categoryId}/move`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(moveCategoryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obtém produtos atribuídos a uma categoria
magento2Routes.get('/categories/:categoryId/products', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const categoryProductsResponse = await axios.get(`https://magento2-api-url/rest/V1/categories/${categoryId}/products`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(categoryProductsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Atribui um produto a uma categoria
magento2Routes.post('/categories/:categoryId/products', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const assignProductToCategoryResponse = await axios.post(`https://magento2-api-url/rest/V1/categories/${categoryId}/products`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignProductToCategoryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Atualiza a atribuição de produtos a uma categoria
magento2Routes.put('/categories/:categoryId/products', async (request: Request, response: Response) => {
    const { categoryId } = request.params;

    try {
        const updateProductAssignmentResponse = await axios.put(`https://magento2-api-url/rest/V1/categories/${categoryId}/products`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateProductAssignmentResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Remove a atribuição de produto da categoria pelo ID da categoria e SKU
magento2Routes.delete('/categories/:categoryId/products/:sku', async (request: Request, response: Response) => {
    const { categoryId, sku } = request.params;

    try {
        const removeProductAssignmentResponse = await axios.delete(`https://magento2-api-url/rest/V1/categories/${categoryId}/products/${sku}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeProductAssignmentResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cria um serviço de categoria
magento2Routes.put('/categories/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const createCategoryServiceResponse = await axios.put(`https://magento2-api-url/rest/V1/categories/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCategoryServiceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Salva um bloco CMS
magento2Routes.post('/cmsBlock', async (request: Request, response: Response) => {
    try {
        const saveBlockResponse = await axios.post('https://magento2-api-url/rest/V1/cmsBlock', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveBlockResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Recupera blocos CMS que atendem aos critérios especificados
magento2Routes.get('/cmsBlock/search', async (request: Request, response: Response) => {
    try {
        const searchCmsBlocksResponse = await axios.get('https://magento2-api-url/rest/V1/cmsBlock/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(searchCmsBlocksResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Recupera informações sobre um bloco CMS por ID
magento2Routes.get('/cmsBlock/:blockId', async (request: Request, response: Response) => {
    const { blockId } = request.params;

    try {
        const getCmsBlockByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/cmsBlock/${blockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCmsBlockByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Exclui um bloco CMS por ID
magento2Routes.delete('/cmsBlock/:blockId', async (request: Request, response: Response) => {
    const { blockId } = request.params;

    try {
        const deleteCmsBlockResponse = await axios.delete(`https://magento2-api-url/rest/V1/cmsBlock/${blockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCmsBlockResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Salva um bloco CMS por ID
magento2Routes.put('/cmsBlock/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const saveCmsBlockByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/cmsBlock/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCmsBlockByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salva uma página CMS
magento2Routes.post('/cmsPage', async (request: Request, response: Response) => {
    try {
        const saveCmsPageResponse = await axios.post('https://magento2-api-url/rest/V1/cmsPage', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCmsPageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Recupera páginas CMS que atendem aos critérios especificados
magento2Routes.get('/cmsPage/search', async (request: Request, response: Response) => {
    try {
        const searchCmsPagesResponse = await axios.get('https://magento2-api-url/rest/V1/cmsPage/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(searchCmsPagesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Salva uma página CMS por ID
magento2Routes.put('/cmsPage/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const saveCmsPageByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/cmsPage/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCmsPageByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Recupera informações sobre uma página CMS por ID
magento2Routes.get('/cmsPage/:pageId', async (request: Request, response: Response) => {
    const { pageId } = request.params;

    try {
        const getCmsPageByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/cmsPage/${pageId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCmsPageByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Exclui uma página CMS por ID
magento2Routes.delete('/cmsPage/:pageId', async (request: Request, response: Response) => {
    const { pageId } = request.params;

    try {
        const deleteCmsPageResponse = await axios.delete(`https://magento2-api-url/rest/V1/cmsPage/${pageId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCmsPageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Retorna a lista de empresas
magento2Routes.get('/company/', async (request: Request, response: Response) => {
    try {
        const getCompanyListResponse = await axios.get('https://magento2-api-url/rest/V1/company/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getCompanyListResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cria ou atualiza uma conta de empresa
magento2Routes.post('/company/', async (request: Request, response: Response) => {
    try {
        const createOrUpdateCompanyResponse = await axios.post('https://magento2-api-url/rest/V1/company/', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCompanyResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Altera uma função para um usuário da empresa
magento2Routes.put('/company/assignRoles', async (request: Request, response: Response) => {
    try {
        const changeCompanyUserRoleResponse = await axios.put('https://magento2-api-url/rest/V1/company/assignRoles', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(changeCompanyUserRoleResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna a lista de funções e permissões para uma empresa especificada
magento2Routes.get('/company/role/', async (request: Request, response: Response) => {
    try {
        const getCompanyRolesResponse = await axios.get('https://magento2-api-url/rest/V1/company/role/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getCompanyRolesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cria ou atualiza uma função para uma empresa selecionada
magento2Routes.post('/company/role/', async (request: Request, response: Response) => {
    try {
        const createOrUpdateCompanyRoleResponse = await axios.post('https://magento2-api-url/rest/V1/company/role/', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCompanyRoleResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cria ou atualiza uma função para uma empresa selecionada por ID
magento2Routes.put('/company/role/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const createOrUpdateCompanyRoleByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/company/role/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCompanyRoleByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retorna a lista de permissões para uma função específica
magento2Routes.get('/company/role/:roleId', async (request: Request, response: Response) => {
    const { roleId } = request.params;

    try {
        const getCompanyRolePermissionsResponse = await axios.get(`https://magento2-api-url/rest/V1/company/role/${roleId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCompanyRolePermissionsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Exclui uma função por ID
magento2Routes.delete('/company/role/:roleId', async (request: Request, response: Response) => {
    const { roleId } = request.params;

    try {
        const deleteCompanyRoleResponse = await axios.delete(`https://magento2-api-url/rest/V1/company/role/${roleId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCompanyRoleResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// View the list of company users assigned to a specified role
magento2Routes.get('/company/role/:roleId/users', async (request: Request, response: Response) => {
    const { roleId } = request.params;

    try {
        const getCompanyRoleUsersResponse = await axios.get(`https://magento2-api-url/rest/V1/company/role/${roleId}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCompanyRoleUsersResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Returns company details
magento2Routes.get('/company/:companyId', async (request: Request, response: Response) => {
    const { companyId } = request.params;

    try {
        const getCompanyDetailsResponse = await axios.get(`https://magento2-api-url/rest/V1/company/${companyId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCompanyDetailsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete a company
magento2Routes.delete('/company/:companyId', async (request: Request, response: Response) => {
    const { companyId } = request.params;

    try {
        const deleteCompanyResponse = await axios.delete(`https://magento2-api-url/rest/V1/company/${companyId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCompanyResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create or update a company account
magento2Routes.put('/company/:companyId', async (request: Request, response: Response) => {
    const { companyId } = request.params;

    try {
        const createOrUpdateCompanyByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/company/${companyId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCompanyByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Returns the list of credits for specified companies
magento2Routes.get('/companyCredits/', async (request: Request, response: Response) => {
    try {
        const getCompanyCreditsListResponse = await axios.get('https://magento2-api-url/rest/V1/companyCredits/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getCompanyCreditsListResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Returns data on the credit limit for a specified company
magento2Routes.get('/companyCredits/company/:companyId', async (request: Request, response: Response) => {
    const { companyId } = request.params;

    try {
        const getCompanyCreditLimitResponse = await axios.get(`https://magento2-api-url/rest/V1/companyCredits/company/${companyId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCompanyCreditLimitResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Returns the credit history for one or more companies
magento2Routes.get('/companyCredits/history', async (request: Request, response: Response) => {
    try {
        const getCompanyCreditHistoryResponse = await axios.get('https://magento2-api-url/rest/V1/companyCredits/history', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getCompanyCreditHistoryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Update the PO Number and/or comment for a Reimburse transaction
magento2Routes.put('/companyCredits/history/:historyId', async (request: Request, response: Response) => {
    const { historyId } = request.params;

    try {
        const updateReimburseTransactionResponse = await axios.put(`https://magento2-api-url/rest/V1/companyCredits/history/${historyId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateReimburseTransactionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Returns data on the credit limit for a specified credit limit ID
magento2Routes.get('/companyCredits/:creditId', async (request: Request, response: Response) => {
    const { creditId } = request.params;

    try {
        const getCompanyCreditLimitByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/companyCredits/${creditId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getCompanyCreditLimitByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Decreases the company credit with an Update, Reimburse, or Purchase transaction
magento2Routes.post('/companyCredits/:creditId/decreaseBalance', async (request: Request, response: Response) => {
    const { creditId } = request.params;

    try {
        const decreaseCompanyCreditBalanceResponse = await axios.post(`https://magento2-api-url/rest/V1/companyCredits/${creditId}/decreaseBalance`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(decreaseCompanyCreditBalanceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Increases the company credit with an Allocate, Update, Refund, Revert, or Reimburse transaction
magento2Routes.post('/companyCredits/:creditId/increaseBalance', async (request: Request, response: Response) => {
    const { creditId } = request.params;

    try {
        const increaseCompanyCreditBalanceResponse = await axios.post(`https://magento2-api-url/rest/V1/companyCredits/${creditId}/increaseBalance`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(increaseCompanyCreditBalanceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Update the following company credit attributes: credit currency, credit limit, and setting to exceed credit
magento2Routes.put('/companyCredits/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const updateCompanyCreditAttributesResponse = await axios.put(`https://magento2-api-url/rest/V1/companyCredits/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateCompanyCreditAttributesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Remove configurable product option
magento2Routes.delete('/configurable-products/:sku/children/:childSku', async (request: Request, response: Response) => {
    const { sku, childSku } = request.params;

    try {
        const removeConfigurableProductOptionResponse = await axios.delete(`https://magento2-api-url/rest/V1/configurable-products/${sku}/children/${childSku}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeConfigurableProductOptionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save option for configurable product
magento2Routes.post('/configurable-products/:sku/options', async (request: Request, response: Response) => {
    const { sku } = request.params;

    try {
        const saveConfigurableProductOptionResponse = await axios.post(`https://magento2-api-url/rest/V1/configurable-products/${sku}/options`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveConfigurableProductOptionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get all options for configurable product
magento2Routes.get('/configurable-products/:sku/options/all', async (request: Request, response: Response) => {
    const { sku } = request.params;

    try {
        const getConfigurableProductOptionsResponse = await axios.get(`https://magento2-api-url/rest/V1/configurable-products/${sku}/options/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getConfigurableProductOptionsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get option for configurable product
magento2Routes.get('/configurable-products/:sku/options/:id', async (request: Request, response: Response) => {
    const { sku, id } = request.params;

    try {
        const getConfigurableProductOptionResponse = await axios.get(`https://magento2-api-url/rest/V1/configurable-products/${sku}/options/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getConfigurableProductOptionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save option for configurable product
magento2Routes.put('/configurable-products/:sku/options/:id', async (request: Request, response: Response) => {
    const { sku, id } = request.params;

    try {
        const saveConfigurableProductOptionResponse = await axios.put(`https://magento2-api-url/rest/V1/configurable-products/${sku}/options/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveConfigurableProductOptionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Remove option from configurable product
magento2Routes.delete('/configurable-products/:sku/options/:id', async (request: Request, response: Response) => {
    const { sku, id } = request.params;

    try {
        const removeConfigurableProductOptionResponse = await axios.delete(`https://magento2-api-url/rest/V1/configurable-products/${sku}/options/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeConfigurableProductOptionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save a coupon
magento2Routes.post('/coupons', async (request: Request, response: Response) => {
    try {
        const saveCouponResponse = await axios.post('https://magento2-api-url/rest/V1/coupons', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Delete coupon by coupon codes
magento2Routes.post('/coupons/deleteByCodes', async (request: Request, response: Response) => {
    try {
        const deleteCouponByCodesResponse = await axios.post('https://magento2-api-url/rest/V1/coupons/deleteByCodes', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCouponByCodesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete coupon by coupon ids
magento2Routes.post('/coupons/deleteByIds', async (request: Request, response: Response) => {
    try {
        const deleteCouponByIdsResponse = await axios.post('https://magento2-api-url/rest/V1/coupons/deleteByIds', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCouponByIdsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Generate coupon for a rule
magento2Routes.post('/coupons/generate', async (request: Request, response: Response) => {
    try {
        const generateCouponResponse = await axios.post('https://magento2-api-url/rest/V1/coupons/generate', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(generateCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve a coupon using the specified search criteria
magento2Routes.get('/coupons/search', async (request: Request, response: Response) => {
    try {
        const searchCouponResponse = await axios.get('https://magento2-api-url/rest/V1/coupons/search', {
            params: request.query,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(searchCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get coupon by coupon id
magento2Routes.get('/coupons/:couponId', async (request: Request, response: Response) => {
    const { couponId } = request.params;

    try {
        const getCouponByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/coupons/${couponId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCouponByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save a coupon
magento2Routes.put('/coupons/:couponId', async (request: Request, response: Response) => {
    const { couponId } = request.params;

    try {
        const saveCouponResponse = await axios.put(`https://magento2-api-url/rest/V1/coupons/${couponId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete coupon by coupon id
magento2Routes.delete('/coupons/:couponId', async (request: Request, response: Response) => {
    const { couponId } = request.params;

    try {
        const deleteCouponByIdResponse = await axios.delete(`https://magento2-api-url/rest/V1/coupons/${couponId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCouponByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Prepare creditmemo to refund and save it
magento2Routes.post('/creditmemo/refund', async (request: Request, response: Response) => {
    try {
        const prepareCreditmemoRefundResponse = await axios.post('https://magento2-api-url/rest/V1/creditmemo/refund', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(prepareCreditmemoRefundResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Cancel a specified credit memo
magento2Routes.put('/creditmemo/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const cancelCreditmemoResponse = await axios.put(`https://magento2-api-url/rest/V1/creditmemo/${id}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cancelCreditmemoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Load a specified credit memo
magento2Routes.get('/creditmemo/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const loadCreditmemoResponse = await axios.get(`https://magento2-api-url/rest/V1/creditmemo/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(loadCreditmemoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// List comments for a specified credit memo
magento2Routes.get('/creditmemo/:id/comments', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const listCreditmemoCommentsResponse = await axios.get(`https://magento2-api-url/rest/V1/creditmemo/${id}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(listCreditmemoCommentsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Add comment to a specified credit memo
magento2Routes.post('/creditmemo/:id/comments', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const addCreditmemoCommentResponse = await axios.post(`https://magento2-api-url/rest/V1/creditmemo/${id}/comments`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addCreditmemoCommentResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Emails a user a specified credit memo
magento2Routes.post('/creditmemo/:id/emails', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const creditmemoEmailResponse = await axios.post(`https://magento2-api-url/rest/V1/creditmemo/${id}/emails`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(creditmemoEmailResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Lists credit memos that match specified search criteria
magento2Routes.get('/creditmemos', async (request: Request, response: Response) => {
    const { field, value, conditionType, sortField, sortDirection, pageSize, currentPage } = request.query;

    const searchCriteria = {
        filterGroups: [
            {
                filters: [
                    {
                        field: field,
                        value: value,
                        conditionType: conditionType,
                    },
                ],
            },
        ],
        sortOrders: [
            {
                field: sortField,
                direction: sortDirection,
            },
        ],
        pageSize: pageSize,
        currentPage: currentPage,
    };

    try {
        const listCreditMemosResponse = await axios.get('https://magento2-api-url/rest/V1/creditmemos', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: {
                searchCriteria: JSON.stringify(searchCriteria),
            },
        });

        response.json(listCreditMemosResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save customer group
magento2Routes.post('/customerGroups', async (request: Request, response: Response) => {
    try {
        const saveCustomerGroupResponse = await axios.post('https://magento2-api-url/rest/V1/customerGroups', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get default customer group
magento2Routes.get('/customerGroups/default', async (request: Request, response: Response) => {
    try {
        const getDefaultCustomerGroupResponse = await axios.get('https://magento2-api-url/rest/V1/customerGroups/default', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getDefaultCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Set system default customer group
magento2Routes.put('/customerGroups/default/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const setDefaultCustomerGroupResponse = await axios.put(`https://magento2-api-url/rest/V1/customerGroups/default/${id}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setDefaultCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get default customer group by storeId
magento2Routes.get('/customerGroups/default/:storeId', async (request: Request, response: Response) => {
    const { storeId } = request.params;

    try {
        const getDefaultCustomerGroupByStoreIdResponse = await axios.get(`https://magento2-api-url/rest/V1/customerGroups/default/${storeId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getDefaultCustomerGroupByStoreIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve customer groups
magento2Routes.get('/customerGroups/search', async (request: Request, response: Response) => {
    const { field, value, conditionType, sortField, sortDirection, pageSize, currentPage } = request.query;

    const searchCriteria = {
        filterGroups: [
            {
                filters: [
                    {
                        field: field,
                        value: value,
                        conditionType: conditionType,
                    },
                ],
            },
        ],
        sortOrders: [
            {
                field: sortField,
                direction: sortDirection,
            },
        ],
        pageSize: pageSize,
        currentPage: currentPage,
    };

    try {
        const retrieveCustomerGroupsResponse = await axios.get('https://magento2-api-url/rest/V1/customerGroups/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: {
                searchCriteria: JSON.stringify(searchCriteria),
            },
        });

        response.json(retrieveCustomerGroupsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Get customer group by group ID
magento2Routes.get('/customerGroups/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const getCustomerGroupResponse = await axios.get(`https://magento2-api-url/rest/V1/customerGroups/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save customer group by ID
magento2Routes.put('/customerGroups/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const saveCustomerGroupResponse = await axios.put(`https://magento2-api-url/rest/V1/customerGroups/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete customer group by ID
magento2Routes.delete('/customerGroups/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const deleteCustomerGroupResponse = await axios.delete(`https://magento2-api-url/rest/V1/customerGroups/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCustomerGroupResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Check if customer group can be deleted by ID
magento2Routes.get('/customerGroups/:id/permissions', async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
        const checkCustomerGroupPermissionsResponse = await axios.get(`https://magento2-api-url/rest/V1/customerGroups/${id}/permissions`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkCustomerGroupPermissionsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create customer account
magento2Routes.post('/customers', async (request: Request, response: Response) => {
    try {
        const createCustomerAccountResponse = await axios.post('https://magento2-api-url/rest/V1/customers', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCustomerAccountResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve customer address by address ID
magento2Routes.get('/customers/addresses/:addressId', async (request: Request, response: Response) => {
    const { addressId } = request.params;

    try {
        const getCustomerAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/addresses/${addressId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCustomerAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Resend confirmation email
magento2Routes.post('/customers/confirm', async (request: Request, response: Response) => {
    try {
        const resendConfirmationEmailResponse = await axios.post('https://magento2-api-url/rest/V1/customers/confirm', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(resendConfirmationEmailResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Check if given email is available
magento2Routes.post('/customers/isEmailAvailable', async (request: Request, response: Response) => {
    try {
        const checkEmailAvailabilityResponse = await axios.post('https://magento2-api-url/rest/V1/customers/isEmailAvailable', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkEmailAvailabilityResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create or update a customer
magento2Routes.put('/customers/me', async (request: Request, response: Response) => {
    try {
        const createOrUpdateCustomerResponse = await axios.put('https://magento2-api-url/rest/V1/customers/me', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get customer by Customer ID
magento2Routes.get('/customers/me', async (request: Request, response: Response) => {
    try {
        const getCustomerResponse = await axios.get('https://magento2-api-url/rest/V1/customers/me', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Activate customer account using confirmation key
magento2Routes.put('/customers/me/activate', async (request: Request, response: Response) => {
    try {
        const activateCustomerResponse = await axios.put('https://magento2-api-url/rest/V1/customers/me/activate', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(activateCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve default billing address for the given customerId
magento2Routes.get('/customers/me/billingAddress', async (request: Request, response: Response) => {
    try {
        const getBillingAddressResponse = await axios.get('https://magento2-api-url/rest/V1/customers/me/billingAddress', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Change customer password
magento2Routes.put('/customers/me/password', async (request: Request, response: Response) => {
    try {
        const changePasswordResponse = await axios.put('https://magento2-api-url/rest/V1/customers/me/password', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(changePasswordResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve default shipping address for the given customerId
magento2Routes.get('/customers/me/shippingAddress', async (request: Request, response: Response) => {
    try {
        const getShippingAddressResponse = await axios.get('https://magento2-api-url/rest/V1/customers/me/shippingAddress', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getShippingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Send an email to the customer with a password reset link
magento2Routes.put('/customers/password', async (request: Request, response: Response) => {
    try {
        const sendPasswordResetEmailResponse = await axios.put('https://magento2-api-url/rest/V1/customers/password', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(sendPasswordResetEmailResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Reset customer password
magento2Routes.post('/customers/resetPassword', async (request: Request, response: Response) => {
    try {
        const resetPasswordResponse = await axios.post('https://magento2-api-url/rest/V1/customers/resetPassword', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(resetPasswordResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve customers matching specified criteria
magento2Routes.get('/customers/search', async (request: Request, response: Response) => {
    try {
        const searchCustomersResponse = await axios.get('https://magento2-api-url/rest/V1/customers/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(searchCustomersResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Validate customer data
magento2Routes.put('/customers/validate', async (request: Request, response: Response) => {
    try {
        const validateCustomerResponse = await axios.put('https://magento2-api-url/rest/V1/customers/validate', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(validateCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get customer by Customer ID
magento2Routes.get('/customers/:customerId', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const getCustomerByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCustomerByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create or update a customer
magento2Routes.put('/customers/:customerId', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const createOrUpdateCustomerResponse = await axios.put(`https://magento2-api-url/rest/V1/customers/${customerId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrUpdateCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete customer by Customer ID
magento2Routes.delete('/customers/:customerId', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const deleteCustomerResponse = await axios.delete(`https://magento2-api-url/rest/V1/customers/${customerId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve default billing address for the given customerId
magento2Routes.get('/customers/:customerId/billingAddress', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const getBillingAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}/billingAddress`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create an empty cart and quote for a specified customer
magento2Routes.post('/customers/:customerId/carts', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const createCartResponse = await axios.post(`https://magento2-api-url/rest/V1/customers/${customerId}/carts`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createCartResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get the account confirmation status
magento2Routes.get('/customers/:customerId/confirm', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const getConfirmationStatusResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}/confirm`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getConfirmationStatusResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Check if password reset token is valid
magento2Routes.get('/customers/:customerId/password/resetLinkToken/:resetPasswordLinkToken', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;
    const resetPasswordLinkToken = request.params.resetPasswordLinkToken;

    try {
        const checkResetTokenResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}/password/resetLinkToken/${resetPasswordLinkToken}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkResetTokenResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Check if customer can be deleted
magento2Routes.get('/customers/:customerId/permissions/readonly', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const checkDeletePermissionResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}/permissions/readonly`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(checkDeletePermissionResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Retrieve default shipping address for the given customerId
magento2Routes.get('/customers/:customerId/shippingAddress', async (request: Request, response: Response) => {
    const customerId = request.params.customerId;

    try {
        const getShippingAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/customers/${customerId}/shippingAddress`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getShippingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Activate a customer account using a key that was sent in a confirmation email
magento2Routes.put('/customers/:email/activate', async (request: Request, response: Response) => {
    const email = request.params.email;

    try {
        const activateCustomerResponse = await axios.put(`https://magento2-api-url/rest/V1/customers/${email}/activate`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(activateCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get all countries and regions information for the store
magento2Routes.get('/directory/countries', async (request: Request, response: Response) => {
    try {
        const getCountriesResponse = await axios.get('https://magento2-api-url/rest/V1/directory/countries', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCountriesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get country and region information for the store
magento2Routes.get('/directory/countries/:countryId', async (request: Request, response: Response) => {
    const countryId = request.params.countryId;

    try {
        const getCountryResponse = await axios.get(`https://magento2-api-url/rest/V1/directory/countries/${countryId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCountryResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Get currency information for the store
magento2Routes.get('/directory/currency', async (request: Request, response: Response) => {
    try {
        const getCurrencyResponse = await axios.get('https://magento2-api-url/rest/V1/directory/currency', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCurrencyResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create attribute set from data
magento2Routes.post('/eav/attribute-sets', async (request: Request, response: Response) => {
    try {
        const createAttributeSetResponse = await axios.post('https://magento2-api-url/rest/V1/eav/attribute-sets', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createAttributeSetResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Retrieve list of Attribute Sets
magento2Routes.get('/eav/attribute-sets/list', async (request: Request, response: Response) => {
    try {
        const getAttributeSetsResponse = await axios.get('https://magento2-api-url/rest/V1/eav/attribute-sets/list', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getAttributeSetsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Retrieve attribute set information based on given ID
magento2Routes.get('/eav/attribute-sets/:attributeSetId', async (request: Request, response: Response) => {
    const attributeSetId = request.params.attributeSetId;

    try {
        const getAttributeSetResponse = await axios.get(`https://magento2-api-url/rest/V1/eav/attribute-sets/${attributeSetId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getAttributeSetResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Remove attribute set by given ID
magento2Routes.delete('/eav/attribute-sets/:attributeSetId', async (request: Request, response: Response) => {
    const attributeSetId = request.params.attributeSetId;

    try {
        const removeAttributeSetResponse = await axios.delete(`https://magento2-api-url/rest/V1/eav/attribute-sets/${attributeSetId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeAttributeSetResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Save attribute set data
magento2Routes.put('/eav/attribute-sets/:attributeSetId', async (request: Request, response: Response) => {
    const attributeSetId = request.params.attributeSetId;

    try {
        const saveAttributeSetResponse = await axios.put(`https://magento2-api-url/rest/V1/eav/attribute-sets/${attributeSetId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveAttributeSetResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create/Update new gift wrapping with data object values
magento2Routes.post('/gift-wrappings', async (request: Request, response: Response) => {
    try {
        const createGiftWrappingResponse = await axios.post('https://magento2-api-url/rest/V1/gift-wrappings', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createGiftWrappingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Return list of gift wrapping data objects based on search criteria
magento2Routes.get('/gift-wrappings', async (request: Request, response: Response) => {
    try {
        const getGiftWrappingsResponse = await axios.get('https://magento2-api-url/rest/V1/gift-wrappings', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getGiftWrappingsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Return data object for specified wrapping ID and store
magento2Routes.get('/gift-wrappings/:id', async (request: Request, response: Response) => {
    const wrappingId = request.params.id;

    try {
        const getGiftWrappingResponse = await axios.get(`https://magento2-api-url/rest/V1/gift-wrappings/${wrappingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getGiftWrappingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Delete gift wrapping
magento2Routes.delete('/gift-wrappings/:id', async (request: Request, response: Response) => {
    const wrappingId = request.params.id;

    try {
        const deleteGiftWrappingResponse = await axios.delete(`https://magento2-api-url/rest/V1/gift-wrappings/${wrappingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteGiftWrappingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Create/Update new gift wrapping with data object values
magento2Routes.put('/gift-wrappings/:wrappingId', async (request: Request, response: Response) => {
    const wrappingId = request.params.wrappingId;

    try {
        const updateGiftWrappingResponse = await axios.put(`https://magento2-api-url/rest/V1/gift-wrappings/${wrappingId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateGiftWrappingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Estimate shipping
magento2Routes.post('/giftregistry/mine/estimate-shipping-methods', async (request: Request, response: Response) => {
    try {
        const estimateShippingResponse = await axios.post('https://magento2-api-url/rest/V1/giftregistry/mine/estimate-shipping-methods', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Enable an customer or guest user to create an empty cart and quote for an anonymous customer
magento2Routes.post('/guest-carts', async (request: Request, response: Response) => {
    try {
        const createGuestCartResponse = await axios.post('https://magento2-api-url/rest/V1/guest-carts', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createGuestCartResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Enable a guest user to return information for a specified cart
magento2Routes.get('/guest-carts/:cartId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const getGuestCartResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getGuestCartResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Assign a specified customer to a specified shopping cart
magento2Routes.put('/guest-carts/:cartId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const assignCustomerResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignCustomerResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter o endereço de cobrança para um carrinho de compras de visitante
magento2Routes.get('/guest-carts/:cartId/billing-address', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const billingAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/billing-address`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(billingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Atribuir um endereço de cobrança especificado a um carrinho especificado
magento2Routes.post('/guest-carts/:cartId/billing-address', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const assignBillingAddressResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/billing-address`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Configurar métodos de envio/cobrança e dados adicionais para carrinho de compras e coletar totais para visitante
magento2Routes.put('/guest-carts/:cartId/collect-totals', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const collectTotalsResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/collect-totals`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(collectTotalsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter informações para um cupom em um carrinho de compras específico
magento2Routes.get('/guest-carts/:cartId/coupons', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const getCouponInfoResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/coupons`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getCouponInfoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Deletar um cupom de um carrinho de compras específico
magento2Routes.delete('/guest-carts/:cartId/coupons', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const deleteCouponResponse = await axios.delete(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/coupons`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adicionar um cupom por código a um carrinho de compras específico
magento2Routes.put('/guest-carts/:cartId/coupons/:couponCode', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const couponCode = request.params.couponCode;

    try {
        const addCouponResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/coupons/${couponCode}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addCouponResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Estimar o envio por endereço e retornar lista de métodos de envio disponíveis
magento2Routes.post('/guest-carts/:cartId/estimate-shipping-methods', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const estimateShippingResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/estimate-shipping-methods`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter a mensagem de presente para um pedido específico
magento2Routes.get('/guest-carts/:cartId/gift-message', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const giftMessageResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/gift-message`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(giftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Definir a mensagem de presente para um pedido inteiro
magento2Routes.post('/guest-carts/:cartId/gift-message', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const setGiftMessageResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/gift-message`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obter a mensagem de presente para um item específico em um carrinho de compras específico
magento2Routes.get('/guest-carts/:cartId/gift-message/:itemId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const itemId = request.params.itemId;

    try {
        const itemGiftMessageResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/gift-message/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(itemGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Definir a mensagem de presente para um item específico em um carrinho de compras específico
magento2Routes.post('/guest-carts/:cartId/gift-message/:itemId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const itemId = request.params.itemId;

    try {
        const setItemGiftMessageResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/gift-message/${itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setItemGiftMessageResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Listar itens associados a um carrinho de compras de visitante
magento2Routes.get('/guest-carts/:cartId/items', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const cartItemsResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/items`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cartItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adicionar/atualizar o item de carrinho especificado
magento2Routes.post('/guest-carts/:cartId/items', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const addItemResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/items`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adicionar/atualizar o item de carrinho especificado
magento2Routes.put('/guest-carts/:cartId/items/:itemId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const itemId = request.params.itemId;

    try {
        const updateItemResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/items/${itemId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Remover o item especificado do carrinho especificado
magento2Routes.delete('/guest-carts/:cartId/items/:itemId', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;
    const itemId = request.params.itemId;

    try {
        const removeItemResponse = await axios.delete(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(removeItemResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Realizar um pedido para um carrinho específico
magento2Routes.put('/guest-carts/:cartId/order', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const placeOrderResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/order`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(placeOrderResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Configurar informações de pagamento e realizar pedido para um carrinho específico
magento2Routes.post('/guest-carts/:cartId/payment-information', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const setPaymentInfoResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/payment-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setPaymentInfoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obter informações de pagamento para um carrinho específico
magento2Routes.get('/guest-carts/:cartId/payment-information', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const paymentInfoResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/payment-information`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(paymentInfoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter o método de pagamento selecionado para um carrinho específico
magento2Routes.get('/guest-carts/:cartId/selected-payment-method', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const selectedPaymentMethodResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/selected-payment-method`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(selectedPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Adicionar um método de pagamento especificado a um carrinho de compras especificado
magento2Routes.put('/guest-carts/:cartId/selected-payment-method', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const addPaymentMethodResponse = await axios.put(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/selected-payment-method`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addPaymentMethodResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Configurar informações de pagamento e realizar pedido para um carrinho específico
magento2Routes.post('/guest-carts/:cartId/set-payment-information', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const setPaymentInfoResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/set-payment-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(setPaymentInfoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obter informações de envio para um carrinho específico
magento2Routes.post('/guest-carts/:cartId/shipping-information', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const shippingInfoResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/shipping-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingInfoResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Listar métodos de envio aplicáveis para um carrinho específico
magento2Routes.get('/guest-carts/:cartId/shipping-methods', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const shippingMethodsResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/shipping-methods`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Obter totais do carrinho para um carrinho específico
magento2Routes.get('/guest-carts/:cartId/totals', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const cartTotalsResponse = await axios.get(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/totals`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cartTotalsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Calcular totais do carrinho com base no endereço e método de envio
magento2Routes.post('/guest-carts/:cartId/totals-information', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const calculateTotalsResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-carts/${cartId}/totals-information`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(calculateTotalsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});

// Estimar métodos de envio para um carrinho de presente específico
magento2Routes.post('/guest-giftregistry/:cartId/estimate-shipping-methods', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const estimateShippingMethodsResponse = await axios.post(`https://magento2-api-url/rest/V1/guest-giftregistry/${cartId}/estimate-shipping-methods`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(estimateShippingMethodsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Mover equipas e utilizadores dentro da estrutura da empresa
magento2Routes.put('/hierarchy/move/:id', async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const moveHierarchyResponse = await axios.put(`https://magento2-api-url/rest/V1/hierarchy/move/${id}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(moveHierarchyResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Iniciar operação de importação de CSV
magento2Routes.post('/import/csv', async (request: Request, response: Response) => {
    try {
        const importCsvResponse = await axios.post('https://magento2-api-url/rest/V1/import/csv', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(importCsvResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Criar token de acesso para administração dadas as credenciais de admin
magento2Routes.post('/integration/admin/token', async (request: Request, response: Response) => {
    try {
        const adminTokenResponse = await axios.post('https://magento2-api-url/rest/V1/integration/admin/token', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(adminTokenResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Revogar token por ID do cliente
magento2Routes.post('/integration/customer/revoke-customer-token', async (request: Request, response: Response) => {
    try {
        const revokeTokenResponse = await axios.post('https://magento2-api-url/rest/V1/integration/customer/revoke-customer-token', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(revokeTokenResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Criar token de acesso para cliente dadas as credenciais de cliente
magento2Routes.post('/integration/customer/token', async (request: Request, response: Response) => {
    try {
        const customerTokenResponse = await axios.post('https://magento2-api-url/rest/V1/integration/customer/token', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(customerTokenResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Verificar se os produtos são vendáveis na quantidade solicitada para um conjunto dado de SKUs em um estoque especificado
magento2Routes.get('/inventory/are-product-salable-for-requested-qty/', async (request: Request, response: Response) => {
    try {
        const areProductSalableResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/are-product-salable-for-requested-qty/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(areProductSalableResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter o status de venda dos produtos para SKUs e estoque específicos
magento2Routes.get('/inventory/are-products-salable', async (request: Request, response: Response) => {
    try {
        const areProductsSalableResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/are-products-salable', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(areProductsSalableResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Executar transferência de inventário em massa parcial para itens especificados
magento2Routes.post('/inventory/bulk-partial-source-transfer', async (request: Request, response: Response) => {
    try {
        const bulkPartialSourceTransferResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/bulk-partial-source-transfer', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkPartialSourceTransferResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Executar atribuição em massa de produtos a fontes
magento2Routes.post('/inventory/bulk-product-source-assign', async (request: Request, response: Response) => {
    try {
        const bulkProductSourceAssignResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/bulk-product-source-assign', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkProductSourceAssignResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Executar transferência em massa de inventário
magento2Routes.post('/inventory/bulk-product-source-transfer', async (request: Request, response: Response) => {
    try {
        const bulkProductSourceTransferResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/bulk-product-source-transfer', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkProductSourceTransferResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Executar desatribuição em massa de produtos de fontes
magento2Routes.post('/inventory/bulk-product-source-unassign', async (request: Request, response: Response) => {
    try {
        const bulkProductSourceUnassignResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/bulk-product-source-unassign', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkProductSourceUnassignResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Exportar dados do índice de stock da tabela
magento2Routes.get('/inventory/dump-stock-index-data/:salesChannelType/:salesChannelCode', async (request: Request, response: Response) => {
    const { salesChannelType, salesChannelCode } = request.params;

    try {
        const dumpStockIndexDataResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/dump-stock-index-data/${salesChannelType}/${salesChannelCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(dumpStockIndexDataResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Exportar quantidade salável de stock
magento2Routes.get('/inventory/export-stock-salable-qty/:salesChannelType/:salesChannelCode', async (request: Request, response: Response) => {
    const { salesChannelType, salesChannelCode } = request.params;

    try {
        const exportStockSalableQtyResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/export-stock-salable-qty/${salesChannelType}/${salesChannelCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(exportStockSalableQtyResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter distância entre dois pontos
magento2Routes.get('/inventory/get-distance', async (request: Request, response: Response) => {
    try {
        const getDistanceResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/get-distance', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getDistanceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter código do provedor de distância padrão
magento2Routes.get('/inventory/get-distance-provider-code', async (request: Request, response: Response) => {
    try {
        const getDistanceProviderCodeResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/get-distance-provider-code', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getDistanceProviderCodeResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter latitude e longitude a partir do endereço
magento2Routes.get('/inventory/get-latlng-from-address', async (request: Request, response: Response) => {
    try {
        const getLatLngFromAddressResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/get-latlng-from-address', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getLatLngFromAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter todas as latitudes e longitudes disponíveis a partir do endereço
magento2Routes.get('/inventory/get-latslngs-from-address', async (request: Request, response: Response) => {
    try {
        const getLatsLngsFromAddressResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/get-latslngs-from-address', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getLatsLngsFromAddressResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter quantidade salável de produto para SKU e Stock específicos
magento2Routes.get('/inventory/get-product-salable-quantity/:sku/:stockId', async (request: Request, response: Response) => {
    const { sku, stockId } = request.params;

    try {
        const getProductSalableQuantityResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/get-product-salable-quantity/${sku}/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getProductSalableQuantityResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter fontes atribuídas a um stock ordenadas por prioridade
magento2Routes.get('/inventory/get-sources-assigned-to-stock-ordered-by-priority/:stockId', async (request: Request, response: Response) => {
    const { stockId } = request.params;

    try {
        const getSourcesAssignedToStockResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/get-sources-assigned-to-stock-ordered-by-priority/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourcesAssignedToStockResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter locais de retirada na loja de acordo com os resultados da filtragem por solicitação de pesquisa
magento2Routes.get('/inventory/in-store-pickup/pickup-locations/', async (request: Request, response: Response) => {
    try {
        const getPickupLocationsResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/in-store-pickup/pickup-locations/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getPickupLocationsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Verificar se o produto é salável para a quantidade solicitada
magento2Routes.get('/inventory/is-product-salable-for-requested-qty/:sku/:stockId/:requestedQty', async (request: Request, response: Response) => {
    const { sku, stockId, requestedQty } = request.params;

    try {
        const isProductSalableResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/is-product-salable-for-requested-qty/${sku}/${stockId}/${requestedQty}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(isProductSalableResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Verificar se o produto é salável para SKU e Stock específicos
magento2Routes.get('/inventory/is-product-salable/:sku/:stockId', async (request: Request, response: Response) => {
    const { sku, stockId } = request.params;

    try {
        const isProductSalableResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/is-product-salable/${sku}/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(isProductSalableResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Notificação de baixa quantidade
magento2Routes.post('/inventory/low-quantity-notification', async (request: Request, response: Response) => {
    try {
        const lowQuantityNotificationResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/low-quantity-notification', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(lowQuantityNotificationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter configuração do item de notificação de baixa quantidade
magento2Routes.get('/inventory/low-quantity-notification/:sourceCode/:sku', async (request: Request, response: Response) => {
    const { sourceCode, sku } = request.params;

    try {
        const getLowQuantityNotificationResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/low-quantity-notification/${sourceCode}/${sku}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getLowQuantityNotificationResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Excluir múltiplas configurações de itens de notificação de baixa quantidade
magento2Routes.post('/inventory/low-quantity-notifications-delete', async (request: Request, response: Response) => {
    try {
        const lowQuantityNotificationsDeleteResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/low-quantity-notifications-delete', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(lowQuantityNotificationsDeleteResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter SourceItems por critérios de pesquisa
magento2Routes.get('/inventory/source-items', async (request: Request, response: Response) => {
    try {
        const getSourceItemsResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/source-items', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salvar dados de múltiplos itens de origem
magento2Routes.post('/inventory/source-items', async (request: Request, response: Response) => {
    try {
        const saveSourceItemsResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/source-items', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Excluir dados de múltiplos itens de origem
magento2Routes.post('/inventory/source-items-delete', async (request: Request, response: Response) => {
    try {
        const deleteSourceItemsResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/source-items-delete', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Resultados do Algoritmo de Seleção de Origem
magento2Routes.post('/inventory/source-selection-algorithm-result', async (request: Request, response: Response) => {
    try {
        const sourceSelectionAlgorithmResultResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/source-selection-algorithm-result', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(sourceSelectionAlgorithmResultResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Buscar Origens por Critérios de Pesquisa
magento2Routes.get('/inventory/sources', async (request: Request, response: Response) => {
    try {
        const getSourcesResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/sources', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getSourcesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salvar Dados da Origem
magento2Routes.post('/inventory/sources', async (request: Request, response: Response) => {
    try {
        const saveSourceResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/sources', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveSourceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter Dados da Origem por Código
magento2Routes.get('/inventory/sources/:sourceCode', async (request: Request, response: Response) => {
    const { sourceCode } = request.params;

    try {
        const getSourceByCodeResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/sources/${sourceCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourceByCodeResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Atualizar Dados da Origem por Código
magento2Routes.put('/inventory/sources/:sourceCode', async (request: Request, response: Response) => {
    const { sourceCode } = request.params;

    try {
        const updateSourceResponse = await axios.put(`https://magento2-api-url/rest/V1/inventory/sources/${sourceCode}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateSourceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Resolver Estoque por Tipo e Código
magento2Routes.get('/inventory/stock-resolver/:type/:code', async (request: Request, response: Response) => {
    const { type, code } = request.params;

    try {
        const stockResolverResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/stock-resolver/${type}/${code}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(stockResolverResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Listar Links de Fonte de Estoque
magento2Routes.get('/inventory/stock-source-links', async (request: Request, response: Response) => {
    try {
        const stockSourceLinksResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/stock-source-links', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(stockSourceLinksResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salvar Dados de Links de Fonte de Estoque
magento2Routes.post('/inventory/stock-source-links', async (request: Request, response: Response) => {
    try {
        const saveStockSourceLinksResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/stock-source-links', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveStockSourceLinksResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Excluir Links de Fonte de Estoque
magento2Routes.post('/inventory/stock-source-links-delete', async (request: Request, response: Response) => {
    try {
        const stockSourceLinksDeleteResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/stock-source-links-delete', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(stockSourceLinksDeleteResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Buscar Estoques por Critérios de Pesquisa
magento2Routes.get('/inventory/stocks', async (request: Request, response: Response) => {
    try {
        const getStocksResponse = await axios.get('https://magento2-api-url/rest/V1/inventory/stocks', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getStocksResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salvar Dados do Estoque
magento2Routes.post('/inventory/stocks', async (request: Request, response: Response) => {
    try {
        const saveStockResponse = await axios.post('https://magento2-api-url/rest/V1/inventory/stocks', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveStockResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Obter Dados do Estoque por Id
magento2Routes.get('/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    const { stockId } = request.params;

    try {
        const getStockByIdResponse = await axios.get(`https://magento2-api-url/rest/V1/inventory/stocks/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getStockByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Excluir Dados do Estoque por Id
magento2Routes.delete('/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    const { stockId } = request.params;

    try {
        const deleteStockByIdResponse = await axios.delete(`https://magento2-api-url/rest/V1/inventory/stocks/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteStockByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Salvar Dados do Estoque por Id
magento2Routes.put('/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    const { stockId } = request.params;

    try {
        const updateStockByIdResponse = await axios.put(`https://magento2-api-url/rest/V1/inventory/stocks/${stockId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateStockByIdResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Criar Reembolso para Fatura
magento2Routes.post('/invoice/:invoiceId/refund', async (request: Request, response: Response) => {
    const { invoiceId } = request.params;

    try {
        const createRefundForInvoiceResponse = await axios.post(`https://magento2-api-url/rest/V1/invoice/${invoiceId}/refund`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createRefundForInvoiceResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
// Listar Faturas
magento2Routes.get('/invoices', async (request: Request, response: Response) => {
    try {
        const getInvoicesResponse = await axios.get('https://magento2-api-url/rest/V1/invoices', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query,
        });

        response.json(getInvoicesResponse.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            response.status(error.response.status).json(error.response.data);
        } else {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
            });
        }
    }
});
magento2Routes.delete('/addresses/:addressId', async (request: Request, response: Response) => {
    const addressId = request.params.addressId;

    try {
        // Chama a API do Magento 2 para excluir um endereço de cliente por ID
        const deleteAddressResponse = await axios.delete(`https://magento2-api-url/rest/V1/addresses/${addressId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para listar todas as faturas
magento2Routes.get('/invoices', async (request: Request, response: Response) => {
    try {
        const invoicesResponse = await axios.get('https://magento2-api-url/rest/V1/invoices', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(invoicesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Rota para obter detalhes de uma fatura específica
magento2Routes.get('/invoices/:invoiceId', async (request: Request, response: Response) => {
    const invoiceId = request.params.invoiceId;

    try {
        const invoiceDetailsResponse = await axios.get(`https://magento2-api-url/rest/V1/invoices/${invoiceId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(invoiceDetailsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
magento2Routes.get('/invoices', async (request: Request, response: Response) => {
    try {
        const invoicesResponse = await axios.get('https://magento2-api-url/rest/V1/invoices', {
            params: request.query,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Other headers as needed
            },
        });

        response.json(invoicesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Route to get billing address for a quote
magento2Routes.get('/negotiable-carts/:cartId/billing-address', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const billingAddressResponse = await axios.get(`https://magento2-api-url/rest/V1/negotiable-carts/${cartId}/billing-address`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Other headers as needed
            },
        });

        response.json(billingAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});

// Route to assign billing address to a quote
magento2Routes.post('/negotiable-carts/:cartId/billing-address', async (request: Request, response: Response) => {
    const cartId = request.params.cartId;

    try {
        const assignBillingAddressResponse = await axios.post(`https://magento2-api-url/rest/V1/negotiable-carts/${cartId}/billing-address`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Other headers as needed
            },
        });

        response.json(assignBillingAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'An unexpected condition occurred that prevented the server from fulfilling the request.',
        });
    }
});
magento2Routes.post('/order/:orderId/refund', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const refundResponse = await axios.post(`https://magento2-api-url/rest/V1/order/${orderId}/refund`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(refundResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma remessa para um pedido
magento2Routes.post('/order/:orderId/ship', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const shipmentResponse = await axios.post(`https://magento2-api-url/rest/V1/order/${orderId}/ship`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar pedidos
magento2Routes.get('/orders', async (request: Request, response: Response) => {
    try {
        const ordersResponse = await axios.get('https://magento2-api-url/rest/V1/orders', {
            params: request.query,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(ordersResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um novo pedido
magento2Routes.post('/orders', async (request: Request, response: Response) => {
    try {
        const createOrderResponse = await axios.post('https://magento2-api-url/rest/V1/orders', request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
magento2Routes.post('/order/:orderId/refund', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const refundResponse = await axios.post(`https://magento2-api-url/rest/V1/order/${orderId}/refund`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(refundResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um pedido
magento2Routes.put('/api/v1/orders/create', async (request: Request, response: Response) => {
    try {
        const createOrderResponse = await axios.put('YOUR_API_BASE_URL/api/v1/orders/create', request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um pedido
magento2Routes.get('/api/v1/orders/:orderId', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const getOrderResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para criar reembolso offline para um pedido
magento2Routes.post('/order/:orderId/refund', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const refundResponse = await axios.post(`https://magento2-api-url/rest/V1/order/${orderId}/refund`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(refundResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um pedido
magento2Routes.put('/api/v1/orders/create', async (request: Request, response: Response) => {
    try {
        const createOrderResponse = await axios.put('YOUR_API_BASE_URL/api/v1/orders/create', request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(.500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um pedido
magento2Routes.get('/api/v1/orders/:orderId', async (request: Request, response: Response) => {
    const orderId = request.params.orderId;

    try {
        const getOrderResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(gfgf500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar itens de um pedido com critérios de pesquisa
magento2Routes.get('/api/v1/orders/items', async (request: Request, response: Response) => {
    try {
        const orderItemsResponse = await axios.get('YOUR_API_BASE_URL/api/v1/orders/items', {
            params: request.query,
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(orderItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(gfgf500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um item de pedido específico
magento2Routes.get('/api/v1/orders/items/:id', async (request: Request, response: Response) => {
    const itemId = request.params.id;

    try {
        const orderItemResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(orderItemResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter detalhes de um pedido específico
magento2Routes.get('/api/v1/orders/:id', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const getOrderResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelar um pedido específico
magento2Routes.post('/api/v1/orders/:id/cancel', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const cancelOrderResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/cancel`, {}, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cancelOrderResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para adicionar um comentário a um pedido específico
magento2Routes.post('/api/v1/orders/:id/comments', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const addCommentResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/comments`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(addCommentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar comentários de um pedido específico
magento2Routes.get('/api/v1/orders/:id/comments', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const getOrderCommentsResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getOrderCommentsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para enviar e-mails para um pedido específico
magento2Routes.post('/api/v1/orders/:id/emails', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const emailResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/emails`, {}, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(emailResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para colocar um pedido em espera
magento2Routes.post('/api/v1/orders/:id/hold', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const holdResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/hold`, {}, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(holdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter o status de um pedido específico
magento2Routes.get('/api/v1/orders/:id/statuses', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const orderStatusResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/statuses`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(orderStatusResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para liberar um pedido da condição de espera
magento2Routes.post('/api/v1/orders/:id/unhold', async (request: Request, response: Response) => {
    const orderId = request.params.id;

    try {
        const unholdResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/orders/${orderId}/unhold`, {}, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(unholdResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para realizar operações de persistência para um endereço de pedido específico
magento2Routes.put('/api/v1/orders/:parent_id', async (request: Request, response: Response) => {
    const parentId = request.params.parent_id;

    try {
        const persistOrderAddressResponse = await axios.put(`YOUR_API_BASE_URL/api/v1/orders/${parentId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(persistOrderAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para criar um produto
magento2Routes.post('/api/v1/products', async (request: Request, response: Response) => {
    try {
        const createProductResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/products`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createProductResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma lista de produtos
magento2Routes.get('/api/v1/products', async (request: Request, response: Response) => {
    try {
        const getProductListResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/products`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(getProductListResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar um conjunto de atributos
magento2Routes.post('/api/v1/products/attribute-sets', async (request: Request, response: Response) => {
    try {
        const createAttributeSetResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/products/attribute-sets`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createAttributeSetResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atribuir um atributo a um conjunto de atributos
magento2Routes.post('/api/v1/products/attribute-sets/attributes', async (request: Request, response: Response) => {
    try {
        const assignAttributeResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/products/attribute-sets/attributes`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignAttributeResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para salvar um grupo de atributos
magento2Routes.post('/api/v1/products/attribute-sets/groups', async (request: Request, response: Response) => {
    try {
        const saveAttributeGroupResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/products/attribute-sets/groups`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(saveAttributeGroupResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter uma lista de grupos de atributos
magento2Routes.get('/api/v1/products/attribute-sets/groups/list', async (request: Request, response: Response) => {
    try {
        const getAttributeGroupsListResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/products/attribute-sets/groups/list`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(getAttributeGroupsListResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para coletar e recuperar a lista de informações de renderização do produto
magento2Routes.get('/api/v1/products-render-info', async (request: Request, response: Response) => {
    try {
        const productRenderInfoResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/products-render-info`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(productRenderInfoResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para recuperar informações da conta
magento2Routes.post('/api/v1/quick-checkout/account-details', async (request: Request, response: Response) => {
    try {
        const accountDetailsResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/quick-checkout/account-details`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(accountDetailsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se o e-mail existe no Bolt
magento2Routes.post('/api/v1/quick-checkout/has-account', async (request: Request, response: Response) => {
    try {
        const hasAccountResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/quick-checkout/has-account`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(hasAccountResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se o e-mail existe no Storefront
magento2Routes.post('/api/v1/quick-checkout/storefront/has-account', async (request: Request, response: Response) => {
    try {
        const hasStorefrontAccountResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/quick-checkout/storefront/has-account`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(hasStorefrontAccountResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para fazer uma pesquisa de texto completo e retornar documentos encontrados
magento2Routes.get('/api/v1/search', async (request: Request, response: Response) => {
    try {
        const searchResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/search`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(searchResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para realizar operações de persistência para um envio específico
magento2Routes.post('/api/v1/shipment', async (request: Request, response: Response) => {
    try {
        const shipmentResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/shipment`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(shipmentResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para recuperar uma lista de SKU's com baixa quantidade de estoque
magento2Routes.get('/api/v1/stockItems/lowStock', async (request: Request, response: Response) => {
    try {
        const lowStockResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/stockItems/lowStock`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(lowStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar uma classe de imposto
magento2Routes.post('/api/v1/taxClasses', async (request: Request, response: Response) => {
    try {
        const taxClassResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/taxClasses`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(taxClassResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criar ou atualizar uma taxa de imposto
magento2Routes.post('/api/v1/taxRates', async (request: Request, response: Response) => {
    try {
        const taxRateResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/taxRates`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(taxRateResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar uma taxa de imposto
magento2Routes.put('/api/v1/taxRates', async (request: Request, response: Response) => {
    try {
        const updateTaxRateResponse = await axios.put(`YOUR_API_BASE_URL/api/v1/taxRates`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateTaxRateResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para listar transações que correspondem aos critérios de pesquisa especificados
magento2Routes.get('/api/v1/transactions', async (request: Request, response: Response) => {
    try {
        const transactionsResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/transactions`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(transactionsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
magento2Routes.post('/api/v1/inventory/sources', async (request: Request, response: Response) => {
    try {
        const createSourceResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/sources`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar uma fonte
magento2Routes.put('/api/v1/inventory/sources/:sourceCode', async (request: Request, response: Response) => {
    try {
        const updateSourceResponse = await axios.put(`YOUR_API_BASE_URL/api/v1/inventory/sources/${request.params.sourceCode}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para retornar todas as informações sobre uma fonte
magento2Routes.get('/api/v1/inventory/sources/:sourceCode', async (request: Request, response: Response) => {
    try {
        const getSourceResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/sources/${request.params.sourceCode}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para procurar fontes com base em critérios de pesquisa
magento2Routes.get('/api/v1/inventory/sources', async (request: Request, response: Response) => {
    try {
        const searchSourcesResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/sources`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(searchSourcesResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para criar um estoque
magento2Routes.post('/api/v1/inventory/stocks', async (request: Request, response: Response) => {
    try {
        const createStockResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/stocks`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(createStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atualizar um estoque
magento2Routes.put('/api/v1/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    try {
        const updateStockResponse = await axios.put(`YOUR_API_BASE_URL/api/v1/inventory/stocks/${request.params.stockId}`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(updateStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para retornar todas as informações sobre um estoque
magento2Routes.get('/api/v1/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    try {
        const getStockResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/stocks/${request.params.stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para excluir um estoque
magento2Routes.delete('/api/v1/inventory/stocks/:stockId', async (request: Request, response: Response) => {
    try {
        const deleteStockResponse = await axios.delete(`YOUR_API_BASE_URL/api/v1/inventory/stocks/${request.params.stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(deleteStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para pesquisar estoques com base em critérios de pesquisa
magento2Routes.get('/api/v1/inventory/stocks', async (request: Request, response: Response) => {
    try {
        const searchStocksResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/stocks`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(searchStocksResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para vincular uma fonte a um estoque
magento2Routes.post('/api/v1/inventory/stock-source-links', async (request: Request, response: Response) => {
    try {
        const linkStockSourceResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/stock-source-links`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(linkStockSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para desvincular uma fonte de um estoque
magento2Routes.post('/api/v1/inventory/stock-source-links-delete', async (request: Request, response: Response) => {
    try {
        const unlinkStockSourceResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/stock-source-links-delete`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(unlinkStockSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para pesquisar links entre estoques e fontes
magento2Routes.get('/api/v1/inventory/stock-source-links', async (request: Request, response: Response) => {
    try {
        const searchStockSourceLinksResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/stock-source-links`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(searchStockSourceLinksResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter fontes atribuídas a um estoque
magento2Routes.get('/api/v1/inventory/get-sources-assigned-to-stock-ordered-by-priority/:stockId', async (request: Request, response: Response) => {
    try {
        const getSourcesAssignedToStockResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/get-sources-assigned-to-stock-ordered-by-priority/${request.params.stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourcesAssignedToStockResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para cancelar a atribuição de produtos de uma origem
magento2Routes.post('/api/v1/inventory/source-items-delete', async (request: Request, response: Response) => {
    try {
        const cancelSourceItemsResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/source-items-delete`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(cancelSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atribuir produtos a uma fonte
magento2Routes.post('/api/v1/inventory/source-items', async (request: Request, response: Response) => {
    try {
        const assignSourceItemsResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/source-items`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(assignSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para pesquisar itens de origem
magento2Routes.get('/api/v1/inventory/source-items', async (request: Request, response: Response) => {
    try {
        const searchSourceItemsResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/source-items`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
            params: request.query, // Isso repassa os parâmetros de consulta recebidos na solicitação
        });

        response.json(searchSourceItemsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para transferência em massa
magento2Routes.post('/api/v1/inventory/bulk-product-source-transfer', async (request: Request, response: Response) => {
    try {
        const bulkTransferResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/bulk-product-source-transfer`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkTransferResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para transferência parcial em massa
magento2Routes.post('/api/v1/inventory/bulk-partial-source-transfer', async (request: Request, response: Response) => {
    try {
        const bulkPartialTransferResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/bulk-partial-source-transfer`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkPartialTransferResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para atribuição de fontes em massa
magento2Routes.post('/api/v1/inventory/bulk-product-source-assign', async (request: Request, response: Response) => {
    try {
        const bulkAssignSourceResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/bulk-product-source-assign`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkAssignSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para cancelamento de atribuição de fontes em massa
magento2Routes.post('/api/v1/inventory/bulk-product-source-unassign', async (request: Request, response: Response) => {
    try {
        const bulkUnassignSourceResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/bulk-product-source-unassign`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(bulkUnassignSourceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para criação de notificação de baixa quantidade
magento2Routes.post('/api/v1/inventory/low-quantity-notification', async (request: Request, response: Response) => {
    try {
        const lowQuantityNotificationResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/low-quantity-notification`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(lowQuantityNotificationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter informações de notificação de baixa quantidade
magento2Routes.get('/api/v1/inventory/low-quantity-notification/:sourceCode/:sku', async (request: Request, response: Response) => {
    try {
        const { sourceCode, sku } = request.params;
        const getLowQuantityNotificationResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/low-quantity-notification/${sourceCode}/${sku}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getLowQuantityNotificationResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para exclusão de notificação de baixa quantidade
magento2Routes.post('/api/v1/inventory/low-quantity-notifications-delete', async (request: Request, response: Response) => {
    try {
        const lowQuantityNotificationsDeleteResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/low-quantity-notifications-delete`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(lowQuantityNotificationsDeleteResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificação de quantidade vendável de um produto
magento2Routes.get('/api/v1/inventory/get-product-salable-quantity/:sku/:stockId', async (request: Request, response: Response) => {
    try {
        const { sku, stockId } = request.params;
        const getProductSalableQuantityResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/get-product-salable-quantity/${sku}/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getProductSalableQuantityResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se um produto é vendável
magento2Routes.get('/api/v1/inventory/is-product-salable/:sku/:stockId', async (request: Request, response: Response) => {
    try {
        const { sku, stockId } = request.params;
        const isProductSalableResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/is-product-salable/${sku}/${stockId}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(isProductSalableResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se os produtos são vendáveis
magento2Routes.get('/api/v1/inventory/are-products-salable', async (request: Request, response: Response) => {
    try {
        const { skus, stockId } = request.query;
        const areProductsSalableResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/are-products-salable`, {
            params: { skus, stockId },
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(areProductsSalableResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para verificar se um produto é vendável para uma quantidade solicitada
magento2Routes.get('/api/v1/inventory/is-product-salable-for-requested-qty/:sku/:stockId/:requestedQty', async (request: Request, response: Response) => {
    try {
        const { sku, stockId, requestedQty } = request.params;
        const isProductSalableForRequestedQtyResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/is-product-salable-for-requested-qty/${sku}/${stockId}/${requestedQty}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(isProductSalableForRequestedQtyResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para resolver o estoque por tipo e código de canal de vendas
magento2Routes.get('/api/v1/inventory/stock-resolver/:type/:code', async (request: Request, response: Response) => {
    try {
        const { type, code } = request.params;
        const stockResolverResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/stock-resolver/${type}/${code}`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(stockResolverResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter a lista de algoritmos de seleção de fonte disponíveis
magento2Routes.get('/api/v1/inventory/source-selection-algorithm-list', async (request: Request, response: Response) => {
    try {
        const getSourceSelectionAlgorithmListResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/source-selection-algorithm-list`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourceSelectionAlgorithmListResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter a lista de algoritmos de seleção de fonte disponíveis (tradução)
magento2Routes.get('/api/v1/inventário/lista-de-algoritmos-de-seleção-de-origem', async (request: Request, response: Response) => {
    try {
        const getSourceSelectionAlgorithmListResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventário/lista-de-algoritmos-de-seleção-de-origem`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getSourceSelectionAlgorithmListResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para executar o algoritmo de seleção de fonte
magento2Routes.post('/api/v1/inventory/source-selection-algorithm-result', async (request: Request, response: Response) => {
    try {
        const sourceSelectionAlgorithmResultResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/inventory/source-selection-algorithm-result`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(sourceSelectionAlgorithmResultResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter o código do provedor de distância
magento2Routes.get('/api/v1/inventory/get-distance-provider-code', async (request: Request, response: Response) => {
    try {
        const getDistanceProviderCodeResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/get-distance-provider-code`, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getDistanceProviderCodeResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter a distância entre dois pontos
magento2Routes.get('/api/v1/inventory/get-distance', async (request: Request, response: Response) => {
    try {
        const { source, destination } = request.query;
        const getDistanceResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/get-distance`, {
            params: { source, destination },
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getDistanceResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para obter a latitude e longitude do endereço de entrega
magento2Routes.get('/api/v1/inventory/get-latlng-from-address', async (request: Request, response: Response) => {
    try {
        const { address } = request.query;
        const getLatLngFromAddressResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/get-latlng-from-address`, {
            params: { address },
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getLatLngFromAddressResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
// Rota para obter locais de retirada na loja
magento2Routes.get('/api/v1/inventory/in-store-pickup/pickup-locations', async (request: Request, response: Response) => {
    try {
        const getPickupLocationsResponse = await axios.get(`YOUR_API_BASE_URL/api/v1/inventory/in-store-pickup/pickup-locations`, {
            params: request.query,
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(getPickupLocationsResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});

// Rota para marcar um pedido como pronto para retirada
magento2Routes.post('/api/v1/order/notify-orders-are-ready-for-pickup', async (request: Request, response: Response) => {
    try {
        const notifyOrdersReadyForPickupResponse = await axios.post(`YOUR_API_BASE_URL/api/v1/order/notify-orders-are-ready-for-pickup`, request.body, {
            headers: {
                'Content-Type': 'application/json',
                // Outros cabeçalhos conforme necessário
            },
        });

        response.json(notifyOrdersReadyForPickupResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).json({
            code: 'InternalServerError',
            message: 'Ocorreu uma condição inesperada que impediu o servidor de atender à solicitação.',
        });
    }
});
});

export default magento2Routes;