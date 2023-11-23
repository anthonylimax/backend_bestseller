import { Request, Response, Router } from "express";
import axios from "axios";

let accessToken: string | null = null;

export const setRoutes = (routes: Router) => {
    routes.post('/v3/token', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_PARTNER.ID': '43423324', // Substitua pelo seu Partner ID
                'Authorization': 'Basic YzcyOTFjNmItNzI5MC00....', // Substitua pelo seu Basic Authorization Header
                'Content-Type': 'application/x-www-form-urlencoded',
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                grant_type: 'client_credentials', // ou 'authorization_code' ou 'refresh_token' conforme necessário
            };

            const responseWalmart = await axios.post('https://api.sandbox.walmart.com/v3/token', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para a Token Detail API (GET /v3/token/detail)
    routes.get('/v3/token/detail', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'eyJraWQiOiIzZjVhYTFmNS1hYWE5LTQzM....', // Substitua pelo seu Access Token
                'Content-Type': 'application/x-www-form-urlencoded',
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.sandbox.walmart.com/v3/token/detail', { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                feedId: 'seuFeedId', // Substitua pelo seu Feed ID
                offset: '0',
                limit: '50',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/feeds', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o status de um feed específico (GET /v3/feeds/{feedId})
    routes.get('/v3/feeds/:feedId', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const pathParams = {
                feedId: request.params.feedId, // Obtém o Feed ID a partir dos parâmetros da URL
            };

            const queryParams = {
                includeDetails: 'false',
                offset: '0',
                limit: '50',
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/feeds/${pathParams.feedId}`, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o relatório de erro de um feed específico (GET /v3/feeds/{feedId}/errorReport)
    routes.get('/v3/feeds/:feedId/errorReport', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const pathParams = {
                feedId: request.params.feedId, // Obtém o Feed ID a partir dos parâmetros da URL
            };

            const queryParams = {
                feedType: 'FITMENT_ACES', // Substitua pelo tipo de feed desejado (FITMENT_ACES ou FITMENT_PIES)
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/feeds/${pathParams.feedId}/errorReport`, { headers, params: queryParams });
           
            // Salva ou envia o arquivo para o cliente conforme necessário
            // Por exemplo, se o conteúdo for um arquivo CSV, você pode enviá-lo como uma resposta de download.
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.post('/v3/items/catalog/search', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                query: {
                    field: 'productName',
                    value: 'string',
                },
                filters: [{}],
                sort: {
                    field: 'num_reviews',
                    order: 'ASC',
                },
            };

            const responseWalmart = await axios.post('https://api.walmart.com/v3/items/catalog/search', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter associações de itens (POST /v3/items/associations)
    routes.post('/v3/items/associations', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                items: [
                    { sku: 'item1' },
                    { sku: 'item2' },
                    // Adicione mais itens conforme necessário
                ],
            };

            const responseWalmart = await axios.post('https://api.walmart.com/v3/items/associations', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para configurar itens em massa (POST /v3/feeds)
    routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                feedType: 'MP_ITEM', // Substitua pelo tipo de feed desejado
            };

            // Certifique-se de configurar corretamente o corpo da requisição, incluindo o arquivo do feed
            // Veja a documentação para obter mais detalhes sobre como montar o corpo da requisição corretamente

            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', null, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/items', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                nextCursor: 'seuNextCursor', // Substitua pelo valor desejado ou mantenha o padrão "*"
                // Adicione mais parâmetros de consulta conforme necessário
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/items', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter detalhes de um item específico (GET /v3/items/{id})
    routes.get('/v3/items/:id', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const id = request.params.id;

            const queryParams = {
                productIdType: 'SKU', // Substitua pelo tipo de código do produto desejado (SKU, GTIN, UPC, etc.)
                // Adicione mais parâmetros de consulta conforme necessário
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/items/${id}`, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para pesquisa de itens (GET /v3/items/walmart/search)
    routes.get('/v3/items/walmart/search', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                query: 'suaConsulta', // Substitua pela consulta desejada
                // Adicione mais parâmetros de consulta conforme necessário
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/items/walmart/search', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter a taxonomia (GET /v3/items/taxonomy)
    routes.get('/v3/items/taxonomy', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/items/taxonomy', { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/items/groups/count', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                variantGroupId: 'seuVariantGroupId', // Substitua pelo ID do grupo de variantes desejado
                // Adicione mais parâmetros de consulta conforme necessário
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/items/groups/count', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter a contagem total de itens com base no status (GET /v3/items/count)
    routes.get('/v3/items/count', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = {
                status: 'PUBLISHED', // Substitua pelo status desejado (PUBLISHED, UNPUBLISHED, SYSTEM_PROBLEM, IN_PROGRESS, ALL)
                // Adicione mais parâmetros de consulta conforme necessário
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/items/count', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para aposentar um item (DELETE /v3/items/{SKU})
    routes.delete('/v3/items/:sku', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const sku = request.params.sku;

            const responseWalmart = await axios.delete(`https://api.walmart.com/v3/items/${sku}`, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.put('/v3/repricer/strategy/:strategyCollectionId', async (request: Request, response: Response) => {
        try {
            const strategyCollectionId = request.params.strategyCollectionId;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                repricerStrategy: 'Buy Box Strategy For testing',
                enabled: true,
                enableRepricerForPromotion: true,
                strategies: [{}],
            };

            const responseWalmart = await axios.put(`https://api.walmart.com/v3/repricer/strategy/${strategyCollectionId}`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para excluir uma estratégia de repricer (DELETE /v3/repricer/strategy/{strategyCollectionId})
    routes.delete('/v3/repricer/strategy/:strategyCollectionId', async (request: Request, response: Response) => {
        try {
            const strategyCollectionId = request.params.strategyCollectionId;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.delete(`https://api.walmart.com/v3/repricer/strategy/${strategyCollectionId}`, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter a lista de itens de incentivo (GET /v3/repricer/incentive)
    routes.get('/v3/repricer/incentive', async (request: Request, response: Response) => {
        try {
            const queryParams = {
                limit: 25,
                offset: 0,
                sortBy: 'INCENTIVE_LIMIT',
                sortOrder: 'DESC',
            };

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/repricer/incentive', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atribuir itens de incentivo ao repricer (PUT /v3/repricer/incentive)
    routes.put('/v3/repricer/incentive', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                skus: ['string'], // Substitua pelo array de SKUs desejado
            };

            const responseWalmart = await axios.put('https://api.walmart.com/v3/repricer/incentive', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o preço de um item (PUT /v3/price)
    routes.put('/v3/price', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                offerId: 'string', // Substitua pelo seu ID de oferta, aplicável apenas para promoções
                sku: 'string', // Substitua pelo SKU do item
                replaceAll: 'true', // Substitua conforme necessário (true ou false)
                pricing: [{}], // Substitua pelo array de preços desejado
            };

            const responseWalmart = await axios.put('https://api.walmart.com/v3/price', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.post('/v3/repricerFeeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                ItemFeedHeader: {
                    processMode: 'REPLACE',
                    subset: 'EXTERNAL',
                    mart: 'WALMART_US',
                    sellingChannel: 'repricerstrategy',
                    version: '1.0',
                    locale: 'en',
                },
                Item: [{}], // Substitua pelo array de itens desejado
            };

            const responseWalmart = await axios.post('https://api.walmart.com/v3/repricerFeeds', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para criar uma nova estratégia de repricer (POST /v3/repricer/strategy)
    routes.post('/v3/repricer/strategy', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                repricerStrategy: 'Buy Box Strategy For testing',
                enabled: true,
                enableRepricerForPromotion: true,
                strategies: [{}],
            };

            const responseWalmart = await axios.post('https://api.walmart.com/v3/repricer/strategy', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar preços em massa (POST /v3/feeds)
    routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = new FormData(); // Use o FormData para enviar arquivos

            requestBody.append('feedType', 'price');
            requestBody.append('file', 'seuArquivo', 'seuNomeDeArquivo'); // Substitua pelo seu arquivo

            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para configurar SKU All para o programa CAP (POST /v3/cppreference)
    routes.post('/v3/cppreference', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                subsidyEnrolled: true, // Substitua conforme necessário
                subsidyPreference: true, // Substitua conforme necessário
            };

            const responseWalmart = await axios.post('https://api.walmart.com/v3/cppreference', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter a lista de estratégias de repricer (GET /v3/repricer/strategies)
    routes.get('/v3/repricer/strategies', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/repricer/strategies', { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.put('/v3/price', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                sku: '97964_KFTest', // Substitua pelo SKU desejado
                pricing: [{}], // Substitua pelo array de preços promocionais desejado
            };

            const responseWalmart = await axios.put('https://api.walmart.com/v3/price', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar preços promocionais em massa (POST /v3/feeds)
    routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = new FormData(); // Use o FormData para enviar arquivos

            requestBody.append('feedType', 'promo');
            requestBody.append('file', 'seuArquivo', 'seuNomeDeArquivo'); // Substitua pelo seu arquivo

            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter preços promocionais para um SKU específico (GET /v3/promo/sku/{sku})
    routes.get('/v3/promo/sku/:sku', async (request: Request, response: Response) => {
        try {
            const sku = request.params.sku;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/promo/sku/${sku}`, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
routes.post('/v3/orders/:purchaseOrderId/shipping', async (request: Request, response: Response) => {
        try {
            const purchaseOrderId = request.params.purchaseOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                orderShipment: {
                    orderLines: {}
                }
            };

            const responseWalmart = await axios.post(`https://api.walmart.com/v3/orders/${purchaseOrderId}/shipping`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para reembolsar uma ou mais linhas de pedido (POST /v3/orders/{purchaseOrderId}/refund)
    routes.post('/v3/orders/:purchaseOrderId/refund', async (request: Request, response: Response) => {
        try {
            const purchaseOrderId = request.params.purchaseOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                orderRefund: {
                    purchaseOrderId,
                    orderLines: {}
                }
            };

            const responseWalmart = await axios.post(`https://api.walmart.com/v3/orders/${purchaseOrderId}/refund`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para cancelar uma ou mais linhas de pedido (POST /v3/orders/{purchaseOrderId}/cancel)
    routes.post('/v3/orders/:purchaseOrderId/cancel', async (request: Request, response: Response) => {
        try {
            const purchaseOrderId = request.params.purchaseOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = {
                orderCancellation: {
                    orderLines: {}
                }
            };

            const responseWalmart = await axios.post(`https://api.walmart.com/v3/orders/${purchaseOrderId}/cancel`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para confirmar um pedido inteiro (POST /v3/orders/{purchaseOrderId}/acknowledge)
    routes.post('/v3/orders/:purchaseOrderId/acknowledge', async (request: Request, response: Response) => {
        try {
            const purchaseOrderId = request.params.purchaseOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.post(`https://api.walmart.com/v3/orders/${purchaseOrderId}/acknowledge`, {}, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
routes.get('/v3/orders', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = request.query;
            const responseWalmart = await axios.get('https://api.walmart.com/v3/orders', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter detalhes de um pedido específico com base no purchaseOrderId (GET /v3/orders/{purchaseOrderId})
    routes.get('/v3/orders/:purchaseOrderId', async (request: Request, response: Response) => {
        try {
            const purchaseOrderId = request.params.purchaseOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = request.query;
            const responseWalmart = await axios.get(`https://api.walmart.com/v3/orders/${purchaseOrderId}`, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter todos os pedidos com itens de linha no status "created" (GET /v3/orders/released)
    routes.get('/v3/orders/released', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = request.query;
            const responseWalmart = await axios.get('https://api.walmart.com/v3/orders/released', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.post('/v3/returns/:returnOrderId/refund', async (request: Request, response: Response) => {
        try {
            const returnOrderId = request.params.returnOrderId;

            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post(`https://api.walmart.com/v3/returns/${returnOrderId}/refund`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para especificar configurações globais e substituir configurações individuais de itens para devoluções (POST /v3/feeds)
    routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = request.query;
            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', requestBody, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter detalhes de pedidos de devolução com base em critérios de filtro (GET /v3/returns)
    routes.get('/v3/returns', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const queryParams = request.query;
            const responseWalmart = await axios.get('https://api.walmart.com/v3/returns', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/inventory', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/inventory', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o inventário de um item (PUT /v3/inventory)
    routes.put('/v3/inventory', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.put('https://api.walmart.com/v3/inventory', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o inventário de um item em um nó de envio específico (GET /v3/inventories/{sku})
    routes.get('/v3/inventories/:sku', async (request: Request, response: Response) => {
        try {
            const sku = request.params.sku;
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/inventories/${sku}`, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o inventário de um item em um nó de envio específico (PUT /v3/inventories/{sku})
    routes.put('/v3/inventories/:sku', async (request: Request, response: Response) => {
        try {
            const sku = request.params.sku;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.put(`https://api.walmart.com/v3/inventories/${sku}`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', requestBody, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o inventário de vários itens em todos os nós de envio (GET /v3/inventories)
    routes.get('/v3/inventories', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/inventories', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter o inventário do WFS (GET /v3/fulfillment/inventory)
    routes.get('/v3/fulfillment/inventory', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/fulfillment/inventory', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/lagtime', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/lagtime', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o Lag Time em massa (POST /v3/feeds)
    routes.post('/v3/feeds', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/feeds', requestBody, { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.get('/v3/settings/shipping/templates/:templateId', async (request: Request, response: Response) => {
        try {
            const templateId = request.params.templateId;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get(`https://api.walmart.com/v3/settings/shipping/templates/${templateId}`, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar modelos de envio (PUT /v3/settings/shipping/templates/{templateId})
    routes.put('/v3/settings/shipping/templates/:templateId', async (request: Request, response: Response) => {
        try {
            const templateId = request.params.templateId;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.put(`https://api.walmart.com/v3/settings/shipping/templates/${templateId}`, requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para excluir modelo de envio (DELETE /v3/settings/shipping/templates/{templateId})
    routes.delete('/v3/settings/shipping/templates/:templateId', async (request: Request, response: Response) => {
        try {
            const templateId = request.params.templateId;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.delete(`https://api.walmart.com/v3/settings/shipping/templates/${templateId}`, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter todos os centros de atendimento (GET /v3/settings/shipping/shipnodes)
    routes.get('/v3/settings/shipping/shipnodes', async (request: Request, response: Response) => {
        try {
            const queryParams = request.query;
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/settings/shipping/shipnodes', { headers, params: queryParams });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para atualizar o centro de atendimento (PUT /v3/settings/shipping/shipnodes)
    routes.put('/v3/settings/shipping/shipnodes', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.put('https://api.walmart.com/v3/settings/shipping/shipnodes', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

routes.post('/v3/settings/shipping/shipnodes', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/settings/shipping/shipnodes', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter todos os modelos de envio (GET /v3/settings/shipping/templates)
    routes.get('/v3/settings/shipping/templates', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const responseWalmart = await axios.get('https://api.walmart.com/v3/settings/shipping/templates', { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para criar modelos de envio (POST /v3/settings/shipping/templates)
    routes.post('/v3/settings/shipping/templates', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/settings/shipping/templates', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para associar um centro de atendimento de terceiros (POST /v3/settings/shipping/3plshipnodes)
    routes.post('/v3/settings/shipping/3plshipnodes', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/settings/shipping/3plshipnodes', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    // Rota para obter configurações de envio (GET /v3/settings/shippingprofile)
    routes.get('/v3/settings/shippingprofile', async (request: Request, response: Response) => {
        try {
            const headers = {
                'WM_SEC.ACCESS_TOKEN': 'seuAccessToken', // Substitua pelo seu Access Token
                'WM_CONSUMER.CHANNEL.TYPE': 'seuConsumerChannelType', // Substitua pelo seu Consumer Channel Type
                'WM_QOS.CORRELATION_ID': 'b3261d2d-028a-4ef7-8602-633c23200af6',
                'WM_SVC.NAME': 'Walmart Service Name',
            };

            const requestBody = request.body;
            const responseWalmart = await axios.post('https://api.walmart.com/v3/settings/shipping/3plshipnodes', requestBody, { headers });
            response.send(responseWalmart.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
};