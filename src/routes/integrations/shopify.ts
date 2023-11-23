import { Request, Response, Router } from "express";
import axios from "axios";

export const setShopifyRoutes = (routes: Router) => {
    const shopifyApiKey = "your_shopify_api_key";
    const shopifyApiSecret = "your_shopify_api_secret";
    let shopifyAccessToken: string;

    // Endpoint para obter o token de acesso da Shopify
    routes.post('/v1/shopify/getAccessToken', async (request: Request, response: Response) => {
        try {
            const tokenResponse = await axios.post(`https://${request.body.shop}/admin/oauth/access_token`, null, {
                params: {
                    client_id: shopifyApiKey,
                    client_secret: shopifyApiSecret,
                    code: request.body.code, // O código de autorização recebido do frontend
                },
            });

            shopifyAccessToken = tokenResponse.data.access_token;
            response.json(tokenResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter o token de acesso da Shopify");
        }
    });
    
    // Rota para obter a lista de access scopes associados ao token de acesso da Shopify
    routes.get('/v1/shopify/getAccessScopes', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/oauth/access_scopes.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter access scopes da Shopify");
        }
    });

    routes.post('/v1/shopify/createStorefrontAccessToken', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/storefront_access_tokens.json`, {
                storefront_access_token: {
                    title: "Test",
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar o StorefrontAccessToken da Shopify");
        }
    });

    // Rota para obter a lista de StorefrontAccessTokens emitidos
    routes.get('/v1/shopify/listStorefrontAccessTokens', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/storefront_access_tokens.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter a lista de StorefrontAccessTokens da Shopify");
        }
    });

    // Rota para excluir um StorefrontAccessToken existente
    routes.delete('/v1/shopify/deleteStorefrontAccessToken/:storefrontAccessTokenId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/storefront_access_tokens/${request.params.storefrontAccessTokenId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir o StorefrontAccessToken da Shopify");
        }
    });
    routes.post('/v1/shopify/createReport', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/reports.json`, {
                report: {
                    name: "A new app report",
                    shopify_ql: "SHOW total_sales BY order_id FROM sales SINCE -1m UNTIL today ORDER BY total_sales"
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar o relatório da Shopify");
        }
    });

    // Rota para obter a lista de relatórios emitidos
    routes.get('/v1/shopify/listReports', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/reports.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter a lista de relatórios da Shopify");
        }
    });

    // Rota para obter detalhes de um relatório específico
    routes.get('/v1/shopify/getReport/:reportId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/reports/${request.params.reportId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter detalhes do relatório da Shopify");
        }
    });

    // Rota para atualizar um relatório existente
    routes.put('/v1/shopify/updateReport/:reportId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/reports/${request.params.reportId}.json`, {
                report: {
                    name: "Changed Report Name",
                    shopify_ql: "SHOW total_sales BY order_id FROM sales SINCE -12m UNTIL today ORDER BY total_sales"
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o relatório da Shopify");
        }
    });

    // Rota para excluir um relatório existente
    routes.delete('/v1/shopify/deleteReport/:reportId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/reports/${request.params.reportId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao excluir o relatório da Shopify");
        }
    });
    routes.post('/v1/shopify/createApplicationCharge', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/application_charges.json`, {
                application_charge: {
                    name: "Super Duper Expensive action",
                    price: 100.0,
                    return_url: "http://super-duper.shopifyapps.com",
                    test: true,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar a cobrança do aplicativo da Shopify");
        }
    });

    // Rota para obter a lista de cobranças de aplicativos
    routes.get('/v1/shopify/listApplicationCharges', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/application_charges.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter a lista de cobranças do aplicativo da Shopify");
        }
    });

    // Rota para obter detalhes de uma cobrança de aplicativo específica
    routes.get('/v1/shopify/getApplicationCharge/:applicationChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/application_charges/${request.params.applicationChargeId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter detalhes da cobrança do aplicativo da Shopify");
        }
    });
routes.get('/v1/shopify/listApplicationCredits', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/application_credits.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter todos os créditos de aplicativos da Shopify");
        }
    });

    // Rota para obter detalhes de um crédito de aplicativo específico
    routes.get('/v1/shopify/getApplicationCredit/:applicationCreditId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/application_credits/${request.params.applicationCreditId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao obter detalhes do crédito de aplicativo da Shopify");
        }
    });
routes.put('/v1/shopify/updateRecurringChargeCappedAmount/:recurringChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/recurring_application_charges/${request.params.recurringChargeId}/customize.json`, {
                recurring_application_charge: {
                    capped_amount: 200,
                },
            }, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao atualizar o valor máximo da cobrança recorrente da Shopify");
        }
    });

    // Rota para cancelar uma cobrança recorrente
    routes.delete('/v1/shopify/cancelRecurringCharge/:recurringChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/recurring_application_charges/${request.params.recurringChargeId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao cancelar a cobrança recorrente da Shopify");
        }
    });
routes.post('/v1/shopify/createUsageCharge/:recurringChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/recurring_application_charges/${request.params.recurringChargeId}/usage_charges.json`, {
                usage_charge: {
                    description: "Super Mega Plan 1000 emails",
                    price: "1.00",
                },
            }, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao criar a cobrança de uso da Shopify");
        }
    });

    // Rota para listar cobranças de uso
    routes.get('/v1/shopify/listUsageCharges/:recurringChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/recurring_application_charges/${request.params.recurringChargeId}/usage_charges.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao listar as cobranças de uso da Shopify");
        }
    });

    // Rota para recuperar uma única cobrança de uso
    routes.get('/v1/shopify/getUsageCharge/:recurringChargeId/:usageChargeId', async (request: Request, response: Response) => {
        try {
            if (!shopifyAccessToken) {
                return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
            }

            const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/recurring_application_charges/${request.params.recurringChargeId}/usage_charges/${request.params.usageChargeId}.json`, {
                headers: {
                    'Authorization': `Bearer ${shopifyAccessToken}`
                }
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Falha ao recuperar a cobrança de uso da Shopify");
        }
    });
routes.post('/v1/shopify/createCustomer', async (request: Request, response: Response) => {
        try {
            // Use Shopify API to create a customer
            const shopifyResponse = await axios.post('https://your-shopify-store.myshopify.com/admin/api/2023-10/customers.json', {
                // Add your customer creation parameters here based on the Shopify API documentation
                // For example:
                // first_name: request.body.firstName,
                // last_name: request.body.lastName,
                // email: request.body.email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': 'your_shopify_access_token'
                }
            });

            response.json(shopifyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to create a customer on Shopify");
        }
    });

    // New route to send an account invite to a customer
    routes.post('/v1/shopify/sendInvite', async (request: Request, response: Response) => {
        try {
            // Use Shopify API to send an account invite
            const shopifyResponse = await axios.post(`https://your-shopify-store.myshopify.com/admin/api/2023-10/customers/${request.body.customerId}/send_invite.json`, {
                // Add your invite parameters here based on the Shopify API documentation
                // For example:
                // body: { "customer_invite": { "to": request.body.toEmail, "from": request.body.fromEmail, ... } }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': 'your_shopify_access_token'
                }
            });

            response.json(shopifyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send an account invite on Shopify");
        }
    });
routes.get('/v1/shopify/getCustomerOrders', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const { customer_id, status = 'open', api_version = 'latest' } = request.query;

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/${api_version}/customers/${customer_id}/orders.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: {
                status: status
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter pedidos do cliente da Shopify");
    }
});
routes.get('/v1/shopify/getCustomerCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const { api_version, created_at_max, created_at_min, updated_at_max, updated_at_min } = request.query;

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/${api_version}/customers/count.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: {
                created_at_max: created_at_max,
                created_at_min: created_at_min,
                updated_at_max: updated_at_max,
                updated_at_min: updated_at_min
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a contagem de clientes da Shopify");
    }
});

routes.get('/v1/shopify/searchCustomers', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const { api_version, fields, limit = 50, order = 'last_order_date DESC', query } = request.query;

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/${api_version}/customers/search.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: {
                fields: fields,
                limit: limit,
                order: order,
                query: query
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao pesquisar clientes da Shopify");
    }
});
routes.put('/v1/shopify/updateCustomer/:customer_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;

        // Seu código para construir o payload de atualização do cliente
        const updatePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de atualização de cliente aqui...
        };

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}.json`, updatePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o cliente na Shopify");
    }
});
routes.delete('/v1/shopify/deleteCustomer/:customer_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;

        const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o cliente na Shopify");
    }
});
routes.post('/v1/shopify/createAddress/:customer_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;

        // Seu código para construir o payload de criação de endereço
        const createAddressPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de criação de endereço aqui...
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses.json`, createAddressPayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o endereço na Shopify");
    }
});

// Rota para obter a lista de endereços de um cliente na Shopify
routes.get('/v1/shopify/getAddresses/:customer_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter os endereços da Shopify");
    }
});
routes.get('/v1/shopify/getAddressDetails/:customer_id/:address_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;
        const addressId = request.params.address_id;

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses/${addressId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter detalhes do endereço da Shopify");
    }
});

// Rota para atualizar um endereço de cliente na Shopify
routes.put('/v1/shopify/updateAddress/:customer_id/:address_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;
        const addressId = request.params.address_id;

        // Seu código para construir o payload de atualização de endereço
        const updateAddressPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de atualização de endereço aqui...
        };

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses/${addressId}.json`, updateAddressPayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o endereço na Shopify");
    }
});
// Rota para definir um endereço como padrão para um cliente na Shopify
routes.put('/v1/shopify/setDefaultAddress/:customer_id/:address_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;
        const addressId = request.params.address_id;

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses/${addressId}/default.json`, {}, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o endereço como padrão na Shopify");
    }
});

// Rota para realizar operações em massa em vários endereços de um cliente na Shopify
routes.put('/v1/shopify/bulkUpdateAddresses/:customer_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;

        // Seu código para construir o payload de operações em massa
        const bulkUpdatePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            address_ids: ["1053317315"],
            operation: "destroy",
            // Outros parâmetros de operações em massa aqui...
        };

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses/set.json`, bulkUpdatePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao realizar operações em massa na Shopify");
    }
});

// Rota para remover um endereço da lista de endereços de um cliente na Shopify
routes.delete('/v1/shopify/removeAddress/:customer_id/:address_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const customerId = request.params.customer_id;
        const addressId = request.params.address_id;

        const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/customers/${customerId}/addresses/${addressId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao remover o endereço da Shopify");
    }
});
// Rota para criar um lote de códigos de desconto
routes.post('/v1/shopify/createDiscountCodeBatch/:price_rule_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;

        // Seu código para construir o payload de criação de lote de códigos de desconto
        const batchCreationPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de criação de lote aqui...
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/batch.json`, batchCreationPayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o lote de códigos de desconto na Shopify");
    }
});

// Rota para criar um código de desconto único
routes.post('/v1/shopify/createDiscountCode/:price_rule_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;

        // Seu código para construir o payload de criação de código de desconto único
        const singleCodeCreationPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de criação de código único aqui...
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/discount_codes.json`, singleCodeCreationPayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o código de desconto na Shopify");
    }
});

// Rota para recuperar a contagem de códigos de desconto para uma loja
routes.get('/v1/shopify/getDiscountCodeCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de recuperação de contagem de códigos de desconto
        const countPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Outros parâmetros de recuperação de contagem aqui...
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/discount_codes/count.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: countPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar a contagem de códigos de desconto na Shopify");
    }
});
// Rota para obter a localização de um código de desconto
routes.get('/v1/shopify/lookupDiscountCode', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const code = request.query.code;

        // Seu código para construir o payload de pesquisa de código de desconto
        const lookupPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            code: code,
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/discount_codes/lookup.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: lookupPayload
        });

        response.status(303).header('Location', apiResponse.headers.location).json({});
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a localização do código de desconto na Shopify");
    }
});

// Rota para obter um trabalho de criação de códigos de desconto
routes.get('/v1/shopify/getDiscountCodeCreationJob/:price_rule_id/:batch_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;
        const batchId = request.params.batch_id;

        // Seu código para construir o payload de recuperação de trabalho de criação de códigos de desconto
        const jobPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            batch_id: batchId,
            price_rule_id: priceRuleId,
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/batch/${batchId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: jobPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o trabalho de criação de códigos de desconto na Shopify");
    }
});

// Rota para obter uma lista de códigos de desconto para um trabalho de criação de códigos
routes.get('/v1/shopify/getDiscountCodesForJob/:price_rule_id/:batch_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;
        const batchId = request.params.batch_id;

        // Seu código para construir o payload de recuperação de códigos de desconto para um trabalho de criação
        const codesPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            batch_id: batchId,
            price_rule_id: priceRuleId,
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/batch/${batchId}/discount_codes.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: codesPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter os códigos de desconto para o trabalho de criação na Shopify");
    }
});
// Rota para obter uma lista de códigos de desconto
routes.get('/v1/shopify/getDiscountCodes/:price_rule_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;

        // Seu código para construir o payload de obtenção de códigos de desconto
        const getCodesPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: priceRuleId,
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/discount_codes.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getCodesPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de códigos de desconto na Shopify");
    }
});

// Rota para obter um único código de desconto
routes.get('/v1/shopify/getDiscountCode/:price_rule_id/:discount_code_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;
        const discountCodeId = request.params.discount_code_id;

        // Seu código para construir o payload de obtenção de um código de desconto
        const getCodePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: priceRuleId,
            discount_code_id: discountCodeId,
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/discount_codes/${discountCodeId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getCodePayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o código de desconto na Shopify");
    }
});

// Rota para atualizar um código de desconto existente
routes.put('/v1/shopify/updateDiscountCode/:price_rule_id/:discount_code_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;
        const discountCodeId = request.params.discount_code_id;

        // Seu código para construir o payload de atualização de um código de desconto
        const updateCodePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: priceRuleId,
            discount_code_id: discountCodeId,
            // Adicione os campos que você deseja atualizar
        };

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/discount_codes/${discountCodeId}.json`, updateCodePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o código de desconto na Shopify");
    }
});

// Rota para excluir um código de desconto
routes.delete('/v1/shopify/deleteDiscountCode/:price_rule_id/:discount_code_id', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const priceRuleId = request.params.price_rule_id;
        const discountCodeId = request.params.discount_code_id;

        // Seu código para construir o payload de exclusão de um código de desconto
        const deleteCodePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: priceRuleId,
            discount_code_id: discountCodeId,
        };

        const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/price_rules/${priceRuleId}/discount_codes/${discountCodeId}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: deleteCodePayload
        });

        response.status(apiResponse.status).send();
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o código de desconto na Shopify");
    }
});
// Rota para criar uma regra de preço
routes.post('/v1/shopify/createPriceRule', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de criação de uma regra de preço
        const createPriceRulePayload = {
            // Adicione os campos necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros campos conforme necessário
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/price_rules.json`, createPriceRulePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar a regra de preço na Shopify");
    }
});

// Rota para obter uma lista de regras de preço
routes.get('/v1/shopify/getPriceRules', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de regras de preço
        const getPriceRulesPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getPriceRulesPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de regras de preço na Shopify");
    }
});
// Rota para criar uma regra de preço
routes.post('/v1/shopify/createPriceRule', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de criação de uma regra de preço
        const createPriceRulePayload = {
            // Adicione os campos necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros campos conforme necessário
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/price_rules.json`, createPriceRulePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar a regra de preço na Shopify");
    }
});

// Rota para obter uma lista de regras de preço
routes.get('/v1/shopify/getPriceRules', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de regras de preço
        const getPriceRulesPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getPriceRulesPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de regras de preço na Shopify");
    }
});
// Rota para obter uma única regra de preço
routes.get('/v1/shopify/getPriceRule', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de uma regra de preço única
        const getPriceRulePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: request.query.price_rule_id as string, // Certifique-se de obter o price_rule_id da solicitação
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/${request.query.price_rule_id}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getPriceRulePayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a regra de preço na Shopify");
    }
});

// Rota para obter a contagem total de regras de preço
routes.get('/v1/shopify/getPriceRulesCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção da contagem total de regras de preço
        const getPriceRulesCountPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/price_rules/count.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getPriceRulesCountPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a contagem total de regras de preço na Shopify");
    }
});

// Rota para atualizar uma regra de preço existente
routes.put('/v1/shopify/updatePriceRule', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de atualização de uma regra de preço
        const updatePriceRulePayload = {
            // Adicione os campos necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: request.body.price_rule_id, // Certifique-se de obter o price_rule_id do corpo da solicitação
            // Adicione outros campos conforme necessário
        };

        const apiResponse = await axios.put(`https://${request.body.shop}/admin/api/2023-10/price_rules/${request.body.price_rule_id}.json`, updatePriceRulePayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar a regra de preço na Shopify");
    }
});

// Rota para excluir uma regra de preço existente
routes.delete('/v1/shopify/deletePriceRule', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de exclusão de uma regra de preço
        const deletePriceRulePayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            price_rule_id: request.body.price_rule_id, // Certifique-se de obter o price_rule_id do corpo da solicitação
        };

        await axios.delete(`https://${request.body.shop}/admin/api/2023-10/price_rules/${request.body.price_rule_id}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: deletePriceRulePayload
        });

        response.status(204).send();
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir a regra de preço na Shopify");
    }
});
// Rota para obter uma lista de eventos
routes.get('/v1/shopify/getEvents', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de uma lista de eventos
        const getEventsPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros parâmetros conforme necessário
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/events.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getEventsPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de eventos na Shopify");
    }
});

// Rota para obter um único evento por seu ID
routes.get('/v1/shopify/getEvent', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de um único evento por ID
        const getEventPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            event_id: request.query.event_id as string, // Certifique-se de obter o event_id da solicitação
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/events/${request.query.event_id}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getEventPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o evento na Shopify");
    }
});

// Rota para obter a contagem total de eventos
routes.get('/v1/shopify/getEventsCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção da contagem total de eventos
        const getEventsCountPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros parâmetros conforme necessário
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/events/count.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getEventsCountPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a contagem total de eventos na Shopify");
    }
});
// Rota para criar um novo webhook
routes.post('/v1/shopify/createWebhook', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de criação de um novo webhook
        const createWebhookPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros parâmetros conforme necessário
        };

        const apiResponse = await axios.post(`https://${request.body.shop}/admin/api/2023-10/webhooks.json`, createWebhookPayload, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            }
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o webhook na Shopify");
    }
});

// Rota para obter uma lista de webhooks
routes.get('/v1/shopify/getWebhooks', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de uma lista de webhooks
        const getWebhooksPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            // Adicione outros parâmetros conforme necessário
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/webhooks.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getWebhooksPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter a lista de webhooks na Shopify");
    }
});

// Rota para obter um único webhook por seu ID
routes.get('/v1/shopify/getWebhook', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de obtenção de um único webhook por ID
        const getWebhookPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            webhook_id: request.query.webhook_id as string, // Certifique-se de obter o webhook_id da solicitação
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/webhooks/${request.query.webhook_id}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getWebhookPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao obter o webhook na Shopify");
    }
});
// Rota para contar todos os webhooks para um determinado tópico
routes.get('/v1/shopify/countWebhooks', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de contagem de todos os webhooks para um determinado tópico
        const countWebhooksPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            topic: "orders/create", // Altere o tópico conforme necessário
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/webhooks/count.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: countWebhooksPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao contar os webhooks na Shopify");
    }
});

// Rota para atualizar um webhook existente
routes.put('/v1/shopify/updateWebhook', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de atualização de um webhook existente
        const updateWebhookPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            webhook_id: request.body.webhook_id, // Certifique-se de obter o webhook_id da solicitação
        };

        const webhook = new shopify.rest.Webhook({session: session});
        webhook.id = request.body.webhook_id;
        webhook.address = "https://somewhere-else.com/"; // Altere o endereço conforme necessário

        const apiResponse = await webhook.save({
            update: true,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o webhook na Shopify");
    }
});

// Rota para remover um webhook existente
routes.delete('/v1/shopify/deleteWebhook', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de remoção de um webhook existente
        const deleteWebhookPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            webhook_id: request.body.webhook_id, // Certifique-se de obter o webhook_id da solicitação
        };

        const apiResponse = await axios.delete(`https://${request.body.shop}/admin/api/2023-10/webhooks/${request.body.webhook_id}.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: deleteWebhookPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o webhook na Shopify");
    }
});
// Rota para criar um novo cartão-presente
routes.post('/v1/shopify/createGiftCard', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de criação de um novo cartão-presente
        const createGiftCardPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            note: "This is a note",
            initial_value: "100.00",
            code: "ABCD EFGH IJKL MNOP",
            template_suffix: "gift_cards.birthday.liquid",
        };

        const giftCard = new shopify.rest.GiftCard({session: session});
        Object.assign(giftCard, createGiftCardPayload);

        const apiResponse = await giftCard.save({
            update: true,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao criar o cartão-presente na Shopify");
    }
});

// Rota para desativar um cartão-presente existente
routes.post('/v1/shopify/disableGiftCard', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de desativação de um cartão-presente existente
        const disableGiftCardPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            gift_card_id: request.body.gift_card_id, // Certifique-se de obter o gift_card_id da solicitação
        };

        const giftCard = new shopify.rest.GiftCard({session: session});
        giftCard.id = request.body.gift_card_id;

        const apiResponse = await giftCard.disable({
            body: {"gift_card": {"id": request.body.gift_card_id}},
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao desativar o cartão-presente na Shopify");
    }
});

// Rota para recuperar uma lista de cartões-presente
routes.get('/v1/shopify/getGiftCards', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de recuperação de uma lista de cartões-presente
        const getGiftCardsPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            status: "enabled", // Altere o status conforme necessário
        };

        const apiResponse = await axios.get(`https://${request.body.shop}/admin/api/2023-10/gift_cards.json`, {
            headers: {
                'Authorization': `Bearer ${shopifyAccessToken}`
            },
            params: getGiftCardsPayload
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar os cartões-presente na Shopify");
    }
});
// Rota para recuperar um único cartão-presente por seu ID
routes.get('/v1/shopify/getGiftCardById/:giftCardId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.GiftCard.find({
            session: session,
            id: request.params.giftCardId,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar o cartão-presente na Shopify");
    }
});

// Rota para recuperar a contagem de cartões-presente
routes.get('/v1/shopify/getGiftCardCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.GiftCard.count({
            session: session,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar a contagem de cartões-presente na Shopify");
    }
});

// Rota para pesquisar cartões-presente
routes.get('/v1/shopify/searchGiftCards', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de pesquisa de cartões-presente
        const searchGiftCardsPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            query: `last_characters:${request.query.last_characters}`,
        };

        const apiResponse = await shopify.rest.GiftCard.search({
            session: session,
            query: searchGiftCardsPayload.query,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao pesquisar cartões-presente na Shopify");
    }
});

// Rota para atualizar um cartão-presente existente
routes.put('/v1/shopify/updateGiftCard/:giftCardId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de atualização de um cartão-presente existente
        const updateGiftCardPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            gift_card_id: request.params.giftCardId, // Certifique-se de obter o gift_card_id da solicitação
            expires_on: "2020-01-01", // Exemplo de propriedade para atualizar
        };

        const giftCard = new shopify.rest.GiftCard({session: session});
        giftCard.id = request.params.giftCardId;
        Object.assign(giftCard, updateGiftCardPayload);

        const apiResponse = await giftCard.save({
            update: true,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o cartão-presente na Shopify");
    }
});
// Rota para recuperar uma lista detalhada de itens de inventário por IDs
routes.get('/v1/shopify/getInventoryItemsByIds', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.InventoryItem.all({
            session: session,
            ids: request.query.ids as string, // Certifique-se de ajustar o tipo conforme necessário
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar os itens de inventário na Shopify");
    }
});

// Rota para recuperar um único item de inventário por ID
routes.get('/v1/shopify/getInventoryItemById/:inventoryItemId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.InventoryItem.find({
            session: session,
            id: request.params.inventoryItemId,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar o item de inventário na Shopify");
    }
});

// Rota para atualizar um item de inventário existente
routes.put('/v1/shopify/updateInventoryItem/:inventoryItemId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de atualização de um item de inventário existente
        const updateInventoryItemPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            inventory_item_id: request.params.inventoryItemId, // Certifique-se de obter o inventory_item_id da solicitação
            sku: "new_sku", // Exemplo de propriedade para atualizar
        };

        const inventoryItem = new shopify.rest.InventoryItem({session: session});
        inventoryItem.id = request.params.inventoryItemId;
        Object.assign(inventoryItem, updateInventoryItemPayload);

        const apiResponse = await inventoryItem.save({
            update: true,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao atualizar o item de inventário na Shopify");
    }
});
// Rota para ajustar o nível de inventário de um item de inventário em uma localização
routes.post('/v1/shopify/adjustInventoryLevel', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de ajuste do nível de inventário
        const adjustInventoryPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            available_adjustment: 5,
            inventory_item_id: 808950810,
            location_id: 655441491,
        };

        const inventoryLevel = new shopify.rest.InventoryLevel({session: session});
        const apiResponse = await inventoryLevel.adjust({
            body: adjustInventoryPayload,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao ajustar o nível de inventário na Shopify");
    }
});

// Rota para conectar um item de inventário a uma localização
routes.post('/v1/shopify/connectInventoryItem', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de conexão do item de inventário à localização
        const connectInventoryPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            inventory_item_id: 457924702,
            location_id: 844681632,
        };

        const inventoryLevel = new shopify.rest.InventoryLevel({session: session});
        const apiResponse = await inventoryLevel.connect({
            body: connectInventoryPayload,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao conectar o item de inventário à localização na Shopify");
    }
});

// Rota para definir o nível de inventário para um item de inventário em uma localização
routes.post('/v1/shopify/setInventoryLevel', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de definição do nível de inventário
        const setInventoryPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            available: 42,
            inventory_item_id: 808950810,
            location_id: 655441491,
        };

        const inventoryLevel = new shopify.rest.InventoryLevel({session: session});
        const apiResponse = await inventoryLevel.set({
            body: setInventoryPayload,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao definir o nível de inventário na Shopify");
    }
});

// Rota para recuperar uma lista de níveis de inventário
routes.get('/v1/shopify/getInventoryLevels', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        // Seu código para construir o payload de recuperação de níveis de inventário
        const getInventoryLevelsPayload = {
            // Adicione os parâmetros necessários com base na documentação
            api_version: "2023-10",
            location_ids: "655441491",
        };

        const apiResponse = await shopify.rest.InventoryLevel.all({
            session: session,
            location_ids: "655441491",
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar os níveis de inventário na Shopify");
    }
});

// Rota para excluir um nível de inventário de uma localização
routes.delete('/v1/shopify/deleteInventoryLevel/:inventoryItemId/:locationId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.InventoryLevel.delete({
            session: session,
            inventory_item_id: request.params.inventoryItemId,
            location_id: request.params.locationId,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao excluir o nível de inventário na Shopify");
    }
});
// Rota para recuperar uma lista de localizações
routes.get('/v1/shopify/getLocations', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.Location.all({
            session: session,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar as localizações na Shopify");
    }
});

// Rota para recuperar uma única localização por ID
routes.get('/v1/shopify/getLocation/:locationId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.Location.find({
            session: session,
            id: request.params.locationId,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar a localização na Shopify");
    }
});

// Rota para recuperar uma lista de níveis de inventário para uma localização
routes.get('/v1/shopify/getInventoryLevelsForLocation/:locationId', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.Location.inventory_levels({
            session: session,
            id: request.params.locationId,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar os níveis de inventário para a localização na Shopify");
    }
});

// Rota para recuperar a contagem de localizações
routes.get('/v1/shopify/getLocationsCount', async (request: Request, response: Response) => {
    try {
        if (!shopifyAccessToken) {
            return response.status(400).send("Token de acesso da Shopify não obtido. Chame /v1/shopify/getAccessToken primeiro.");
        }

        const apiResponse = await shopify.rest.Location.count({
            session: session,
        });

        response.json(apiResponse.data);
    } catch (error) {
        console.error(error);
        response.status(500).send("Falha ao recuperar a contagem de localizações na Shopify");
    }
}
};