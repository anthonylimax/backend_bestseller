import { Request, Response, Router } from "express";
import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiParams {
    method: string;
    app_key: string;
    session: string;
    timestamp: string;
    format: string;
    v: string;
    sign_method: string;
    aeop_a_e_product_list_query?: string;  // Adicione os outros parâmetros conforme necessário
    product_id?: string;  // Adicione os outros parâmetros conforme necessário
    sign?: string;  // Adicione a propriedade de assinatura
}

function signTopRequest(params: any, clientSecret: string, signMethod: string): string {
    // Implementação da lógica de assinatura aqui
    // Certifique-se de substituir isso com a lógica real
    return 'assinatura_gerada';
}

export const setRoutes = (routes: Router) => {
    routes.post('/v1/aliexpress/solution/product/list/get', async (request: Request, response: Response) => {
        try {
            const accessToken = 'seuAccessToken';

            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.list.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                aeop_a_e_product_list_query: request.body.aeop_a_e_product_list_query,
            };

            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/product/info/get', async (request: Request, response: Response) => {
        try {
            const accessToken = 'seuAccessToken';

            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.info.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_id: request.body.product_id,
            };

            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });


    routes.post('/v1/aliexpress/image-search', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.ds.image.search
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.image.search';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                // ... outros parâmetros específicos da API
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Exemplo de envio de uma imagem (substitua '<file_path>' pelo caminho do arquivo apropriado)
            const imageBytes = open('<file_path>', 'rb').read();
            apiParams.image_file_bytes = imageBytes;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/product/:productId', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            const productId = request.params.productId;

            // Exemplo de invocação da API aliexpress.ds.product.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.product.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                ship_to_country: 'US', // Substitua pelo país desejado
                product_id: productId,
                target_currency: 'USD',
                target_language: 'EN',
                // ... outros parâmetros específicos da API
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/order/place', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.trade.buy.placeorder
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.trade.buy.placeorder';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                param_place_order_request4_open_api_d_t_o: JSON.stringify({
                    // ... preencha com os parâmetros específicos para criar uma ordem
                }),
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, null, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/order/:orderId', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.ds.trade.order.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.trade.order.get';

            const orderId = request.params.orderId;

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                order_id: orderId,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/commission/orders', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.ds.commissionorder.listbyindex
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.commissionorder.listbyindex';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                page_size: 50,
                start_query_index_id: '1111-2222-3333',
                page_no: 1,
                start_time: '2019-08-14 00:00:00',
                end_time: '2019-08-19 00:00:00',
                status: 'Payment Completed',
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/member/orderdata/submit', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.ds.member.orderdata.submit
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.member.orderdata.submit';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                ae_product_id: '1334345',
                product_amount: '35.33',
                order_amount: '35.33',
                paytime: '20191122:150606',
                ae_sku_info: '200000182:193;200007763:201336100',
                product_url: 'https://www.yousite.com/item/32862631421.html',
                ae_orderid: '1334345',
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/logistics/buyer/freight/calculate', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.logistics.buyer.freight.calculate
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.logistics.buyer.freight.calculate';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                param_aeop_freight_calculate_for_buyer_d_t_o: JSON.stringify({
                    // Substitua com os parâmetros de solicitação adequados
                }),
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/logistics/ds/trackinginfo/query', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.logistics.ds.trackinginfo.query
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.logistics.ds.trackinginfo.query';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                logistics_no: '20100810142400000-0700', // Substitua com o número de rastreamento adequado
                origin: 'ESCROW', // Substitua conforme necessário
                out_ref: '1160045240183009', // Substitua conforme necessário
                service_name: 'UPS', // Substitua com o serviço de logística adequado
                to_area: 'DE', // Substitua com o país de destino adequado
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/ds/add/info', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.ds.add.info
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.ds.add.info';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                param0: JSON.stringify({
                    store_url: 'https://accounts.shopify.com/', // Substitua com a URL da loja adequada
                }),
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/seller/category/tree', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.seller.category.tree.query
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.seller.category.tree.query';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                parent_category_id: 0, // Substitua pelo ID da categoria pai desejada
                filter_no_permission: false, // Substitua conforme necessário
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/merchant/profile', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.merchant.profile.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.merchant.profile.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/seller/category/tree', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.seller.category.tree.query
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.seller.category.tree.query';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                category_id: 509, // Substitua pelo ID da categoria desejada
                filter_no_permission: true, // Substitua pelo valor desejado
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/category/redefining/:categoryId/attributes', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.category.redefining.getchildattributesresultbypostcateidandpath
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.category.redefining.getchildattributesresultbypostcateidandpath';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                param1: request.params.categoryId, // Substitua pelo ID da categoria desejada
                locale: 'en_US', // Substitua pelo locale desejado
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/category/redefining/:categoryId/all-child-attributes', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.category.redefining.getallchildattributesresult
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.category.redefining.getallchildattributesresult';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                cate_id: request.params.categoryId, // Substitua pelo ID da categoria desejada
                locale: 'en_US', // Substitua pelo locale desejado
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/solution/product-category/suggest', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.category.suggest
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.category.suggest';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                title: 'Kit Com 2 Pijamas Infantil Menina De Algodão Atacado Revenda', // Substitua pelo título desejado
                language: 'pt_BR', // Substitua pelo idioma desejado
                image_url: 'https://ae01.alicdn.com/kf/S19d428d59d91446ba657d2a4359d4a67J.png', // Substitua pela URL da imagem desejada
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/solution/product-schema/get', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.schema.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.schema.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                aliexpress_category_id: 200000346, // Substitua pelo ID da categoria desejada
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/schema/product-instance/post', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.schema.product.instance.post
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.schema.product.instance.post';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_instance_request: JSON.stringify(request.body), // Use o corpo da solicitação como instância de produto JSON
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, null, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/schema/product-full/update', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.schema.product.full.update
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.schema.product.full.update';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                schema_full_update_request: JSON.stringify(request.body), // Use o corpo da solicitação como instância de produto JSON
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, null, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/feed/submit', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.feed.submit
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.feed.submit';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                operation_type: request.body.operation_type,
                item_list: JSON.stringify(request.body.item_list),
                developer_features: JSON.stringify(request.body.developer_features),
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, null, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/solution/feed/query', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.feed.query
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.feed.query';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                job_id: request.query.job_id,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.get('/v1/aliexpress/solution/feed/list', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.feed.list.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.feed.list.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                current_page: request.query.current_page || 1,
                feed_type: request.query.feed_type || 'PRODUCT_CREATE',
                page_size: request.query.page_size || 50,
                status: request.query.status || 'FINISH',
                submitted_time_end: request.query.submitted_time_end,
                submitted_time_start: request.query.submitted_time_start,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.get(apiEndpoint, {
                params: apiParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/feed/invalidate', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.feed.invalidate
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.feed.invalidate';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                job_id_list: request.body.job_id_list,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/product/post', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.post
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.post';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                post_product_request: request.body.post_product_request,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/product/edit', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.edit
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.edit';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                edit_product_request: request.body.edit_product_request,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/batch/product/price/update', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.batch.product.price.update
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.batch.product.price.update';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                mutiple_product_update_list: request.body.mutiple_product_update_list,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/batch/product/inventory/update', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.batch.product.inventory.update
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.batch.product.inventory.update';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                mutiple_product_update_list: request.body.mutiple_product_update_list,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/postproduct/redefining/offlineaeproduct', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.postproduct.redefining.offlineaeproduct
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.postproduct.redefining.offlineaeproduct';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_ids: request.body.product_ids,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/postproduct/redefining/onlineaeproduct', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.postproduct.redefining.onlineaeproduct
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.postproduct.redefining.onlineaeproduct';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_ids: request.body.product_ids,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/postproduct/redefining/offlineaeproduct', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.postproduct.redefining.offlineaeproduct
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.postproduct.redefining.offlineaeproduct';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_ids: request.body.product_ids,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/batch/product/delete', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.batch.product.delete
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.batch.product.delete';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_ids: request.body.product_ids.join(','),
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/product/list/get', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.list.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.list.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                aeop_a_e_product_list_query: request.body.aeop_a_e_product_list_query,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
    });

    routes.post('/v1/aliexpress/solution/product/info/get', async (request: Request, response: Response) => {
        try {
            // Certifique-se de autenticar a solicitação, se necessário
            // Substitua 'seuAccessToken' pelo token de acesso adequado, se necessário
            const accessToken = 'seuAccessToken';

            // Exemplo de invocação da API aliexpress.solution.product.info.get
            const apiEndpoint = 'https://eco.taobao.com/router/rest';
            const apiMethod = 'aliexpress.solution.product.info.get';

            const apiParams = {
                method: apiMethod,
                app_key: 'suaAppKey',
                session: 'suaSessao',
                timestamp: '2023-11-22 12:00:00', // Substitua pela data/hora atual formatada corretamente
                format: 'json',
                v: '2.0',
                sign_method: 'md5',
                product_id: request.body.product_id,
            };

            // Gerar assinatura
            const signature = signTopRequest(apiParams, 'seuClientSecret', 'md5');
            apiParams.sign = signature;

            // Realizar a chamada da API
            const apiResponse: AxiosResponse = await axios.post(apiEndpoint, apiParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Retornar a resposta da API para o cliente
            response.json(apiResponse.data);
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;  // Adicionado esta linha para obter o objeto AxiosError
                response.status(axiosError.response?.status || 500).json(axiosError.response?.data || 'Erro ao chamar a API');
            } else {
                response.status(500).json('Erro interno do servidor');
            }
        }
        }
    };

