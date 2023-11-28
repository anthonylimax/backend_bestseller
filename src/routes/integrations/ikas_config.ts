import { Request, Response, Router } from "express";
import axios from "axios";

export const setRoutes = (routes: Router) => {

    // Rota para criar um aplicativo privado (Private App) no ikas
    routes.post('/createPrivateApp', async (request: Request, response: Response) => {
        try {
            const { appName, scope } = request.body;

            // Lógica para criar um Private App no ikas

            // Supondo que o processo de criação do aplicativo retorne o client_id e client_secret
            const client_id = "<your_generated_client_id>";
            const client_secret = "<your_generated_client_secret>";

            response.json({ client_id, client_secret });
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o token de acesso do ikas
    routes.post('/getIkasAccessToken', async (request: Request, response: Response) => {
        try {
            const { client_id, client_secret } = request.body;

            const tokenData = {
                grant_type: "client_credentials",
                client_id,
                client_secret,
            };

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const ikasApiResponse = await axios.post('https://api.myikas.com/api/admin/oauth/token', tokenData, { headers });

            if (ikasApiResponse.status === 200) {
                response.send(ikasApiResponse.data);
            } else {
                response.status(ikasApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para chamar a API do ikas usando o token de acesso
    routes.post('/callIkasAPI', async (request: Request, response: Response) => {
        try {
            const { access_token, query } = request.body;

            const ikasApiResponse = await axios.post('https://api.myikas.com/api/v1/admin/graphql', {
                query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
            });

            if (ikasApiResponse.status === 200) {
                response.send(ikasApiResponse.data);
            } else {
                response.status(ikasApiResponse.status).send("Não funcionou");
            }
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    // Rota para obter um produto com base no ID
    routes.get('/product/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    product(id: "${id}") {
                        id
                        attributes {
                            // Definir os atributos necessários aqui
                        }
                        baseUnit {
                            // Definir os atributos necessários aqui
                        }
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter uma marca de produto com base no ID
    routes.get('/productBrand/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    productBrand(id: "${id}") {
                        id
                        description
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter uma etiqueta de produto com base no ID
    routes.get('/productTag/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    productTag(id: "${id}") {
                        id
                        name
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter uma categoria de produto com base no ID
    routes.get('/productCategory/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    category(id: "${id}") {
                        id
                        categoryPath
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter um tipo de variante de produto com base no ID
    routes.get('/variantType/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    variantType(id: "${id}") {
                        id
                        name
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });

    // Rota para obter uma tradução de produto com base no ID
    routes.get('/productTranslation/:id', async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const query = `
                query {
                    productTranslation(id: "${id}") {
                        description
                        locale
                        name
                        // Continuar com outros atributos conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query);
            response.json(result);
        } catch (error) {
            response.status(500).json({
                code: 'InternalServerError',
                message: 'Uma condição inesperada ocorreu e impediu o servidor de atender à solicitação.',
            });
        }
    });
    // Listar produtos
    routes.post('/listProducts', async (req: Request, res: Response) => {
        try {
            const { access_token } = req.body;
            const query = `
                query {
                    listProduct {
                        data {
                            id
                            name
                            createdAt
                        }
                    }
                }
            `;
            const result = await makeIKasAPICall(access_token, query);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Pesquisar produtos
    routes.post('/searchProducts', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const query = `
                query {
                    searchProducts(input: ${JSON.stringify(input)}) {
                        // Definir a estrutura da resposta conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall(access_token, query);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Salvar produto
    routes.post('/saveProduct', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    saveProduct(input: ${JSON.stringify(input)}) {
                        // Definir a estrutura da resposta conforme necessário
                    }
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Deletar lista de produtos
    routes.post('/deleteProductList', async (req: Request, res: Response) => {
        try {
            const { access_token, idList } = req.body;
            const mutation = `
                mutation {
                    deleteProductList(idList: ${JSON.stringify(idList)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Atualizar status do canal de vendas do produto
    routes.post('/updateProductSalesChannelStatus', async (req: Request, res: Response) => {
        try {
            const { access_token, input, salesChannelId } = req.body;
            const mutation = `
                mutation {
                    updateProductSalesChannelStatus(input: ${JSON.stringify(input)}, salesChannelId: "${salesChannelId}")
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Atualização em massa de produtos
    routes.post('/bulkUpdateProducts', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    bulkUpdateProducts(input: ${JSON.stringify(input)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Salvar preços de variantes
    routes.post('/saveVariantPrices', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    saveVariantPrices(input: ${JSON.stringify(input)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });
    // Rota para fazer upload de imagem para variantas
    routes.post('/uploadProductImage', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    uploadProductImage(input: ${JSON.stringify(input)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Rota para fazer upload de imagem para categorias
    routes.post('/uploadCategoryImage', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    uploadCategoryImage(input: ${JSON.stringify(input)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });

    // Rota para fazer upload de imagem para marcas
    routes.post('/uploadBrandImage', async (req: Request, res: Response) => {
        try {
            const { access_token, input } = req.body;
            const mutation = `
                mutation {
                    uploadBrandImage(input: ${JSON.stringify(input)})
                }
            `;
            const result = await makeIKasAPICall(access_token, mutation);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                code: 'InternalServerError',
                message: 'Erro interno do servidor',
            });
        }
    });
// Rota para obter detalhes de um pedido com base no ID
routes.get('/order/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                order(id: "${id}") {
                    id
                    // Definir outros atributos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para criar ou atualizar um pedido
routes.post('/saveOrder', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                saveOrder(input: ${JSON.stringify(input)}) {
                    id
                    // Definir outros atributos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para deletar uma lista de pedidos com IDs específicos
routes.post('/deleteOrderList', async (req: Request, res: Response) => {
    try {
        const { access_token, idList } = req.body;
        const mutation = `
            mutation {
                deleteOrderList(idList: ${JSON.stringify(idList)})
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter uma lista de pedidos
routes.post('/listOrders', async (req: Request, res: Response) => {
    try {
        const { access_token, filter } = req.body;
        const query = `
            query {
                listOrders(filter: ${JSON.stringify(filter)}) {
                    data {
                        id
                        // Definir outros atributos necessários
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para obter detalhes de um preço de variante de linha de pedido com base no ID
routes.get('/orderLineVariantPrice/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderLineVariantPrice(id: "${id}") {
                    buyPrice
                    currency
                    currencySymbol
                    discountPrice
                    priceListId
                    sellPrice
                    unitPrice
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma categoria de variante de linha de pedido com base no ID
routes.get('/orderLineVariantCategory/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderLineVariantCategory(id: "${id}") {
                    id
                    categoryPath {
                        // Definir outros atributos necessários
                    }
                    name
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma marca de variante de linha de pedido com base no ID
routes.get('/orderLineVariantBrand/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderLineVariantBrand(id: "${id}") {
                    id
                    name
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma opção de linha de pedido com base no nome
routes.get('/orderLineOption/:name', async (req: Request, res: Response) => {
    try {
        const { access_token, name } = req.params;
        const query = `
            query {
                orderLineOption(name: "${name}") {
                    name
                    productOptionId
                    productOptionsSetId
                    type
                    values {
                        // Definir outros atributos necessários
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um ajuste de pedido com base no nome
routes.get('/orderAdjustment/:name', async (req: Request, res: Response) => {
    try {
        const { access_token, name } = req.params;
        const query = `
            query {
                orderAdjustment(name: "${name}") {
                    amount
                    amountType
                    appliedOrderLines {
                        // Definir outros atributos necessários
                    }
                    campaignId
                    campaignType
                    couponId
                    name
                    order
                    transactionId
                    type
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um valor de opção de linha de pedido com base no nome
routes.get('/orderLineOptionValue/:name', async (req: Request, res: Response) => {
    try {
        const { access_token, name } = req.params;
        const query = `
            query {
                orderLineOptionValue(name: "${name}") {
                    name
                    price
                    value
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma linha de pedido aplicada a um ajuste de pedido com base no ID
routes.get('/orderAdjustmentAppliedOrderLine/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderAdjustmentAppliedOrderLine(id: "${id}") {
                    amount
                    appliedQuantity
                    isAutoCreated
                    orderLineId
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma linha de envio de pedido com base no título
routes.get('/orderShippingLine/:title', async (req: Request, res: Response) => {
    try {
        const { access_token, title } = req.params;
        const query = `
            query {
                orderShippingLine(title: "${title}") {
                    finalPrice
                    isRefunded
                    paymentMethod
                    price
                    priceListId
                    shippingSettingsId
                    shippingZoneRateId
                    taxValue
                    title
                    transactionId
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma linha de presente de pacote de pedido com base no preço
routes.get('/orderGiftPackageLine/:price', async (req: Request, res: Response) => {
    try {
        const { access_token, price } = req.params;
        const query = `
            query {
                orderGiftPackageLine(price: "${price}") {
                    isRefunded
                    price
                    priceListId
                    taxValue
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para obter detalhes de um cliente de pedido com base no ID
routes.get('/orderCustomer/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderCustomer(id: "${id}") {
                    id
                    email
                    firstName
                    fullName
                    isGuestCheckout
                    lastName
                    notificationsAccepted
                    phone
                    preferredLanguage
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma linha de imposto de pedido com base no preço
routes.get('/orderTaxLine/:price', async (req: Request, res: Response) => {
    try {
        const { access_token, price } = req.params;
        const query = `
            query {
                orderTaxLine(price: ${price}) {
                    price
                    rate
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um pacote de pedido com base no ID
routes.get('/orderPackage/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderPackage(id: "${id}") {
                    id
                    errorMessage
                    note
                    orderLineItemIds
                    orderPackageFulfillStatus
                    orderPackageNumber
                    sourceId
                    stockLocationId
                    trackingInfo {
                        // Definir outros atributos necessários
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de informações de rastreamento de um pacote de pedido com base no ID
routes.get('/orderPackageTrackingInfo/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderPackageTrackingInfo(id: "${id}") {
                    barcode
                    cargoCompany
                    cargoCompanyId
                    isSendNotification
                    trackingLink
                    trackingNumber
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma taxa de câmbio de pedido com base no código
routes.get('/orderCurrencyRate/:code', async (req: Request, res: Response) => {
    try {
        const { access_token, code } = req.params;
        const query = `
            query {
                orderCurrencyRate(code: "${code}") {
                    code
                    originalRate
                    rate
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma frente de loja de pedido com base no ID
routes.get('/orderStorefront/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderStorefront(id: "${id}") {
                    id
                    name
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um canal de vendas de pedido com base no ID
routes.get('/orderSalesChannel/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderSalesChannel(id: "${id}") {
                    id
                    name
                    type
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um tema de frente de loja de pedido com base no ID
routes.get('/orderStorefrontTheme/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderStorefrontTheme(id: "${id}") {
                    id
                    name
                    themeId
                    themeVersionId
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma rota de frente de loja de pedido com base no ID
routes.get('/orderStorefrontRouting/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderStorefrontRouting(id: "${id}") {
                    id
                    domain
                    dynamicCurrencySettings {
                        // Definir outros atributos necessários
                    }
                    locale
                    path
                    priceListId
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma lista de preços de pedido com base no ID
routes.get('/orderPriceList/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderPriceList(id: "${id}") {
                    id
                    name
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para obter detalhes de uma filial de pedido com base no ID
routes.get('/orderBranch/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderBranch(id: "${id}") {
                    id
                    name
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um funcionário de pedido com base no ID
routes.get('/orderStaff/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderStaff(id: "${id}") {
                    id
                    email
                    firstName
                    lastName
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de uma fatura de pedido com base no ID
routes.get('/orderInvoice/:id', async (req: Request, res: Response) => {
    try {
        const { access_token, id } = req.params;
        const query = `
            query {
                orderInvoice(id: "${id}") {
                    id
                    appId
                    appName
                    hasPdf
                    invoiceData
                    invoiceNumber
                    storeAppId
                    type
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um método de pagamento de pedido com base no código da gateway
routes.get('/orderPaymentMethod/:paymentGatewayCode', async (req: Request, res: Response) => {
    try {
        const { access_token, paymentGatewayCode } = req.params;
        const query = `
            query {
                orderPaymentMethod(paymentGatewayCode: "${paymentGatewayCode}") {
                    paymentGatewayCode
                    paymentGatewayId
                    paymentGatewayName
                    price
                    type
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para listar pedidos com base em vários filtros
routes.post('/listOrder', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                listOrder {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para atualizar o status do pacote de um pedido
routes.post('/updateOrderPackageStatus', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                updateOrderPackageStatus(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para atender itens de um pedido
routes.post('/fulfillOrder', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                fulfillOrder(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para adicionar uma fatura a um pedido
routes.post('/addOrderInvoice', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                addOrderInvoice(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para criar um novo pedido com transações
routes.post('/createOrderWithTransactions', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                createOrderWithTransactions(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para cancelar o atendimento de um pedido
routes.post('/cancelFulfillment', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                cancelFulfillment(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para atualizar uma linha de pedido
routes.post('/updateOrderLine', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                updateOrderLine(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para reembolsar uma linha de pedido
routes.post('/refundOrderLine', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                refundOrderLine(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para atualizar os endereços de um pedido
routes.post('/updateOrderAddresses', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                updateOrderAddresses(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para listar pedidos com base em vários filtros usando GraphQL
routes.post('/listOrder', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                listOrder {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para definir o status de pacote de um pedido como pronto para envio
routes.post('/setOrderPackageStatusReadyForShipment', async (req: Request, res: Response) => {
    try {
        const { access_token, orderId, packageId, trackingInfo } = req.body;
        const mutation = `
            mutation {
                updateOrderPackageStatus(input: {
                    orderId: "${orderId}",
                    packages: [
                        {
                            packageId: "${packageId}",
                            status: READY_FOR_SHIPMENT,
                            trackingInfo: ${JSON.stringify(trackingInfo)}
                        }
                    ]
                }) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para cumprir linhas de pedido com informações de rastreamento
routes.post('/fulfillOrderLines', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                fulfillOrder(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para adicionar PDF de fatura a um pedido
routes.post('/addInvoicePDF', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                addOrderInvoice(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para criar um novo pedido com dados de transação
routes.post('/createOrderWithTransaction', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                createOrderWithTransactions(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para cancelar um pacote atendido
routes.post('/cancelFulfilledPackage', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                cancelFulfillment(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para atualizar uma linha de pedido
routes.post('/updateOrderLineItem', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                updateOrderLine(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para atualizar o endereço de faturamento de um pedido
routes.post('/updateOrderBillingAddress', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                updateOrderAddresses(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para reembolsar uma linha de pedido
routes.post('/refundOrderLineItem', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                refundOrderLine(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para listar clientes
routes.post('/listCustomers', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const query = `
            query {
                listCustomer(input: ${JSON.stringify(input)}) {
                    // Definir os campos necessários
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para listar webhooks
routes.post('/listWebhooks', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                listWebhook {
                    createdAt
                    deleted
                    endpoint
                    id
                    scope
                    updatedAt
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para criar um webhook
routes.post('/createWebhook', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const mutation = `
            mutation {
                saveWebhook(input: ${JSON.stringify(input)}) {
                    createdAt
                    deleted
                    endpoint
                    id
                    scope
                    updatedAt
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para excluir um webhook
routes.post('/deleteWebhook', async (req: Request, res: Response) => {
    try {
        const { access_token, scopes } = req.body;
        const mutation = `
            mutation {
                deleteWebhook(scopes: ${JSON.stringify(scopes)})
            }
        `;
        const result = await makeIKasAPICall(access_token, mutation);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para listar clientes
routes.post('/listCustomers', async (req: Request, res: Response) => {
    try {
        const { access_token, filters } = req.body;
        const query = `
            query {
                listCustomer(${generateFilters(filters)}) {
                    data {
                        accountStatus
                        accountStatusUpdatedAt
                        createdAt
                        customerGroupIds
                        deleted
                        email
                        emailVerifiedDate
                        firstName
                        id
                        isEmailVerified
                        isPhoneVerified
                        lastName
                        note
                        orderCount
                        passwordUpdateDate
                        phone
                        phoneVerifiedDate
                        subscriptionStatus
                        subscriptionStatusUpdatedAt
                        tagIds
                        updatedAt
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Função auxiliar para gerar filtros para a consulta de clientes
const generateFilters = (filters: any) => {
    if (!filters) return '';
    const filterEntries = Object.entries(filters);
    if (filterEntries.length === 0) return '';

    const filterString = filterEntries
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(', ');

    return `(${filterString})`;
};
// Rota para obter informações de um comerciante específico
routes.post('/getMerchant', async (req: Request, res: Response) => {
    try {
        const { access_token, merchantId } = req.body;
        const query = `
            query {
                getMerchant(id: "${merchantId}") {
                    id
                    address {
                        addressLine1
                        addressLine2
                        city {
                            id
                            code
                            name
                        }
                        company
                        country {
                            id
                            code
                            iso2
                            iso3
                            name
                        }
                        district {
                            id
                            code
                            name
                        }
                        firstName
                        identityNumber
                        lastName
                        postalCode
                        state {
                            id
                            code
                            name
                        }
                        taxNumber
                        taxOffice
                        title
                        type
                        vkn
                    }
                    email
                    firstName
                    lastName
                    merchantName
                    merchantSequence
                    phoneNumber
                    storeName
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para obter detalhes de um comerciante específico
routes.post('/getMerchantDetail', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                getMerchant {
                    email
                    firstName
                    id
                    lastName
                    merchantName
                    merchantSequence
                    phoneNumber
                    storeName
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes de um aplicativo autorizado
routes.post('/getAuthorizedApp', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                getAuthorizedApp {
                    addedDate
                    createdAt
                    deleted
                    id
                    partnerId
                    salesChannelId
                    scope
                    storeAppId
                    supportsMultipleInstallation
                    updatedAt
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para obter detalhes do próprio usuário (me)
routes.post('/getMe', async (req: Request, res: Response) => {
    try {
        const { access_token } = req.body;
        const query = `
            query {
                me {
                    addedDate
                    email
                    id
                    name
                    partnerId
                    salesChannelId
                    scope
                    scopes
                    storeAppId
                    supportsMultipleInstallation
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});
// Rota para listar as categorias
routes.post('/listCategories', async (req: Request, res: Response) => {
    try {
        const { access_token, categoryPath, id, name, search, updatedAt } = req.body;
        const query = `
            query {
                listCategory(
                    categoryPath: { categoryPath: ${JSON.stringify(categoryPath)} },
                    id: { eq: "${id}" },
                    name: { eq: "${name}" },
                    search: "${search}",
                    updatedAt: ${JSON.stringify(updatedAt)}
                ) {
                    id
                    categoryPath
                    categoryPathItems {
                        id
                        name
                    }
                    conditions {
                        conditionType
                        method
                        valueList
                    }
                    description
                    imageId
                    isAutomated
                    metaData {
                        title
                        description
                        keywords
                    }
                    name
                    orderType
                    parentId
                    salesChannelIds
                    salesChannels {
                        id
                        name
                    }
                    shouldMatchAllConditions
                    translations {
                        description
                        locale
                        name
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para salvar uma categoria
routes.post('/saveCategory', async (req: Request, res: Response) => {
    try {
        const { access_token, input } = req.body;
        const query = `
            mutation {
                saveCategory(input: ${JSON.stringify(input)}) {
                    id
                    categoryPath
                    categoryPathItems {
                        id
                        name
                    }
                    conditions {
                        conditionType
                        method
                        valueList
                    }
                    description
                    imageId
                    isAutomated
                    metaData {
                        title
                        description
                        keywords
                    }
                    name
                    orderType
                    parentId
                    salesChannelIds
                    salesChannels {
                        id
                        name
                    }
                    shouldMatchAllConditions
                    translations {
                        description
                        locale
                        name
                    }
                }
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

// Rota para excluir uma lista de categorias
routes.post('/deleteCategoryList', async (req: Request, res: Response) => {
    try {
        const { access_token, idList } = req.body;
        const query = `
            mutation {
                deleteCategoryList(idList: ${JSON.stringify(idList)})
            }
        `;
        const result = await makeIKasAPICall(access_token, query);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 'InternalServerError',
            message: 'Erro interno do servidor',
        });
    }
});

};
    // Rota para listar todos os países
    routes.get('/countries', async (request: Request, response: Response) => {
        try {
            const query = `
                query {
                    listCountry {
                        id
                        capital
                        currency
                        currencyCode
                        currencySymbol
                        emoji
                        emojiString
                        iso2
                        iso3
                        locationTranslations {
                            // Definir os atributos necessários aqui
                        }
                        name
                        native
                        phoneCode
                        region
                        subregion
                    }
                }
            `;
            const headers = {
                'Content-Type': 'application/json',
            };

            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query, headers);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todos os estados de um país
    routes.get('/states/:countryId', async (request: Request, response: Response) => {
        try {
            const { countryId } = request.params;
            const query = `
                query {
                    listState(countryId: "${countryId}") {
                        id
                        countryId
                        locationTranslations {
                            // Definir os atributos necessários aqui
                        }
                        name
                        native
                        stateCode
                    }
                }
            `;
            const headers = {
                'Content-Type': 'application/json',
            };

            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query, headers);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todas as cidades de um estado
    routes.get('/cities/:stateId', async (request: Request, response: Response) => {
        try {
            const { stateId } = request.params;
            const query = `
                query {
                    listCity(stateId: "${stateId}") {
                        id
                        cityCode
                        countryId
                        latitude
                        longitude
                        name
                        order
                        stateId
                    }
                }
            `;
            const headers = {
                'Content-Type': 'application/json',
            };

            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query, headers);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todos os distritos de uma cidade
    routes.get('/districts/:cityId', async (request: Request, response: Response) => {
        try {
            const { cityId } = request.params;
            const query = `
                query {
                    listDistrict(cityId: "${cityId}") {
                        id
                        cityId
                        countryId
                        latitude
                        longitude
                        name
                        order
                        stateId
                    }
                }
            `;
            const headers = {
                'Content-Type': 'application/json',
            };

            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query, headers);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todas as cidades de um distrito
    routes.get('/towns/:districtId', async (request: Request, response: Response) => {
        try {
            const { districtId } = request.params;
            const query = `
                query {
                    listTown(districtId: "${districtId}") {
                        id
                        districtId
                        name
                        order
                    }
                }
            `;
            const headers = {
                'Content-Type': 'application/json',
            };

            const result = await makeIKasAPICall('https://api.myikas.com/api/v1/admin/graphql', query, headers);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    // Rota para listar todos os países
    routes.get('/countries', async (request: Request, response: Response) => {
        try {
            const query = `{ listCountry { id name locationTranslations { tr en } iso2 iso3 phoneCode capital currency native region subregion emoji emojiString } }`;
            const result = await makeIKasAPICall(query);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todos os estados de um país
    routes.get('/states/:countryId', async (request: Request, response: Response) => {
        try {
            const { countryId } = request.params;
            const query = `{ listState(countryId: { eq: "${countryId}" }) { id name stateCode countryId } }`;
            const result = await makeIKasAPICall(query);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todas as cidades de um estado
    routes.get('/cities/:stateId', async (request: Request, response: Response) => {
        try {
            const { stateId } = request.params;
            const query = `{ listCity(stateId: { eq: "${stateId}" }) { id countryId stateId name latitude longitude } }`;
            const result = await makeIKasAPICall(query);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todos os distritos de uma cidade
    routes.get('/districts/:cityId', async (request: Request, response: Response) => {
        try {
            const { cityId } = request.params;
            const query = `{ listDistrict(cityId: { eq: "${cityId}" }) { id countryId stateId cityId name order } }`;
            const result = await makeIKasAPICall(query);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para listar todas as cidades de um distrito
    routes.get('/towns/:districtId', async (request: Request, response: Response) => {
        try {
            const { districtId } = request.params;
            const query = `{ listTown(districtId: { eq: "${districtId}" }) { id districtId name order } }`;
            const result = await makeIKasAPICall(query);
            response.json(result);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
 // Rota para listar todas as listas de preços
 routes.get('/price-lists', async (request: Request, response: Response) => {
    try {
        const query = `{ listPriceList { id addProductsAutomatically currency currencyCode currencySymbol name ruleList { id name } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para listar todos os atributos do produto
routes.get('/product-attributes', async (request: Request, response: Response) => {
    try {
        const query = `{ listProductAttribute { id description name options { id name } translations { description locale name options { name } } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar ou atualizar um atributo do produto
routes.post('/save-product-attribute', async (request: Request, response: Response) => {
    try {
        const { input } = request.body;
        const query = `mutation { saveProductAttribute(input: ${JSON.stringify(input)}) { id description name options { id name } translations { description locale name options { name } } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para deletar uma lista de atributos do produto
routes.post('/delete-product-attribute-list', async (request: Request, response: Response) => {
    try {
        const { idList } = request.body;
        const query = `mutation { deleteProductAttributeList(idList: ${JSON.stringify(idList)}) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todas as marcas de produtos
routes.get('/product-brands', async (request: Request, response: Response) => {
    try {
        const query = `{ listProductBrand { id description imageId metaData { title description keywords } name orderType salesChannelIds translations { description locale name } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar ou atualizar uma marca de produto
routes.post('/save-product-brand', async (request: Request, response: Response) => {
    try {
        const { input } = request.body;
        const query = `mutation { saveProductBrand(input: ${JSON.stringify(input)}) { id description imageId metaData { title description keywords } name orderType salesChannelIds translations { description locale name } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para deletar uma lista de marcas de produtos
routes.post('/delete-product-brand-list', async (request: Request, response: Response) => {
    try {
        const { idList } = request.body;
        const query = `mutation { deleteProductBrandList(idList: ${JSON.stringify(idList)}) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todas as tags de produtos
routes.get('/product-tags', async (request: Request, response: Response) => {
    try {
        const query = `{ listProductTag { id name translations { description locale name } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar ou atualizar uma tag de produto
routes.post('/save-product-tag', async (request: Request, response: Response) => {
    try {
        const { input } = request.body;
        const query = `mutation { saveProductTag(input: ${JSON.stringify(input)}) { id name translations { description locale name } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para deletar uma lista de tags de produtos
routes.post('/delete-product-tag-list', async (request: Request, response: Response) => {
    try {
        const { idList } = request.body;
        const query = `mutation { deleteProductTagList(idList: ${JSON.stringify(idList)}) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para listar todos os canais de vendas
routes.get('/sales-channels', async (request: Request, response: Response) => {
    try {
        const query = `{ listSalesChannel { id name paymentGateways { id order } priceListId stockLocations { id order } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para visualizar um canal de vendas específico
routes.get('/sales-channels/:id', async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const query = `{ getSalesChannel(id: "${id}") { id name paymentGateways { id order } priceListId stockLocations { id order } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar ou atualizar um canal de vendas
routes.post('/save-sales-channel', async (request: Request, response: Response) => {
    try {
        const { input } = request.body;
        const query = `mutation { saveSalesChannel(input: ${JSON.stringify(input)}) { id name paymentGateways { id order } priceListId stockLocations { id order } type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todos os canais de vendas
routes.get('/sales-channels-list', async (request: Request, response: Response) => {
    try {
        const query = `{ listSalesChannel { createdAt deleted id name priceListId stockLocations { order } paymentGateways { order } type updatedAt }}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para visualizar detalhes de um canal de vendas específico
routes.get('/sales-channels-detail', async (request: Request, response: Response) => {
    try {
        const query = `{ getSalesChannel { createdAt deleted id name priceListId type updatedAt }}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar um novo canal de vendas
routes.post('/create-sales-channel', async (request: Request, response: Response) => {
    try {
        const { name, priceListId, stockLocationId, stockLocationOrder } = request.body;
        const query = `mutation { saveSalesChannel(input: { name: "${name}" priceListId: "${priceListId}" stockLocations: { id: "${stockLocationId}", order: ${stockLocationOrder} } } ) { createdAt deleted id name priceListId stockLocations { order } paymentGateways { order } type updatedAt }}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todas as localizações de estoque
routes.get('/stock-locations', async (request: Request, response: Response) => {
    try {
        const query = `{ listStockLocation { id address { address city { id code name } country { id code name } district { id code name } phone postalCode state { id code name } } deliveryTime description isRemindOutOfStockEnabled name outOfStockMailList type } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para listar todas as localizações de estoque de um produto específico
routes.get('/product-stock-locations/:productId', async (request: Request, response: Response) => {
    try {
        const { productId } = request.params;
        const query = `{ listProductStockLocation(productId: { eq: "${productId}" }) { pagination { currentPage perPage totalCount totalPages } items { id stockLocationId quantity } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para salvar localizações de estoque de um produto
routes.post('/save-product-stock-locations', async (request: Request, response: Response) => {
    try {
        const { input } = request.body;
        const query = `mutation { saveProductStockLocations(input: ${JSON.stringify(input)}) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todas as localizações de estoque de produtos
routes.get('/product-stock-locations', async (request: Request, response: Response) => {
    try {
        const query = `{ listProductStockLocation { count data { createdAt deleted id productId stockCount stockLocationId updatedAt variantId } hasNext limit page }}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para listar todas as localizações de estoque
routes.get('/stock-locations', async (request: Request, response: Response) => {
    try {
        const query = `{ listStockLocation { address { address city { code id name } country { code id name } district { code id name } phone postalCode state { code id name } } createdAt deleted id name type updatedAt }}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para criar ou atualizar localizações de estoque de produtos
routes.post('/create-update-product-stock-locations', async (request: Request, response: Response) => {
    try {
        const { product_id, variant_id, stock_location_id } = request.body;
        const query = `mutation { saveProductStockLocations(input: { productStockLocationInputs: [{ productId: "${product_id}" variantId: "${variant_id}" stockCount: 1 stockLocationId: "${stock_location_id}" }] })}`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todas as lojas
routes.get('/storefronts', async (request: Request, response: Response) => {
    try {
        const query = `{ listStorefront(id: { eq: "storefront_id" }) { id name } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para listar todos os scripts JavaScript da loja
routes.get('/storefront-js-scripts/:storefrontId', async (request: Request, response: Response) => {
    try {
        const { storefrontId } = request.params;
        const query = `{ listStorefrontJSScript(storefrontId: "${storefrontId}") { id name storefrontId isActive storeAppId authorizedAppId scriptContent } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para salvar um novo script JavaScript da loja
routes.post('/save-storefront-js-script', async (request: Request, response: Response) => {
    try {
        const { name, storefrontId, scriptContent } = request.body;
        const query = `mutation { saveStorefrontJSScript( input: { name: "${name}" storefrontId: "${storefrontId}" scriptContent: "${scriptContent}" } ) { id name storefrontId isActive storeAppId authorizedAppId scriptContent } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para excluir um script JavaScript da loja
routes.post('/delete-storefront-js-script', async (request: Request, response: Response) => {
    try {
        const { storefrontIdList } = request.body;
        const query = `mutation { deleteStorefrontJSScript( storefrontIdList: ["${storefrontIdList}"] ) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para adicionar uma entrada personalizada à linha do tempo
routes.post('/add-custom-timeline-entry', async (request: Request, response: Response) => {
    try {
        const { message, sourceId, sourceType } = request.body;
        const query = `mutation { addCustomTimelineEntry( input: { message: "${message}" sourceId: "${sourceId}" sourceType: ${sourceType} } ) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
// Rota para listar todos os tipos de variante
routes.get('/variant-types', async (request: Request, response: Response) => {
    try {
        const query = `{ listVariantType { id name } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para salvar um novo tipo de variante
routes.post('/save-variant-type', async (request: Request, response: Response) => {
    try {
        const { name, selectionType, translations, values } = request.body;
        const query = `mutation { saveVariantType( input: { name: "${name}" selectionType: ${selectionType} translations: ${JSON.stringify(translations)} values: ${JSON.stringify(values)} } ) { id name selectionType translations { locale name values { id value } } values { id value translations { locale name } } } }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});

// Rota para excluir um tipo de variante
routes.post('/delete-variant-type', async (request: Request, response: Response) => {
    try {
        const { idList } = request.body;
        const query = `mutation { deleteVariantTypeList( idList: ["${idList}"] ) }`;
        const result = await makeIKasAPICall(query);
        response.json(result);
    } catch (error) {
        console.error(error);
        response.status(500).send("Não funcionou");
    }
});
};



