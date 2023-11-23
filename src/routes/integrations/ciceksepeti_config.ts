import { Request, Response, Router } from "express";
import axios from "axios";

export const setRoutes = (routes: Router) => {
    // Rota para carregar produtos na plataforma Çiçeksepeti
    routes.post('/v1/ciceksepeti/products', async (request: Request, response: Response) => {
        try {
            const productLoadResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Products', request.body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            response.json(productLoadResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to load products on Çiçeksepeti");
        }
    });
    routes.get('/v1/ciceksepeti/categories', async (request: Request, response: Response) => {
        try {
            const categoriesResponse = await axios.get('https://sandbox-apis.ciceksepeti.com/api/v1/Categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(categoriesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch Çiçeksepeti categories");
        }
    });
    routes.get('/v1/ciceksepeti/categories/:categoryId/attributes', async (request: Request, response: Response) => {
        try {
            const categoryId = request.params.categoryId;

            const attributesResponse = await axios.get(`https://sandbox-apis.ciceksepeti.com/api/v1/Categories/${categoryId}/attributes`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                }
            });

            response.json(attributesResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch Çiçeksepeti category attributes");
        }
    });
    routes.get('/v1/ciceksepeti/products', async (request: Request, response: Response) => {
        try {
            const { status, pageSize, page, sortMethod, storageCode, variantName } = request.query;

            const productsResponse = await axios.get('https://sandbox-apis.ciceksepeti.com/api/v1/Products', {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: {
                    status,
                    pageSize,
                    page,
                    sortMethod,
                    storageCode,
                    variantName,
                },
            });

            response.json(productsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch Çiçeksepeti products");
        }
    });
    routes.put('/v1/ciceksepeti/products', async (request: Request, response: Response) => {
        try {
            const { products } = request.body;

            const updateProductResponse = await axios.put('https://sandbox-apis.ciceksepeti.com/api/v1/Products', {
                products
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(updateProductResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update Çiçeksepeti product information");
        }
    });
    routes.put('/v1/ciceksepeti/products/price-and-stock', async (request: Request, response: Response) => {
        try {
            const { items } = request.body;

            const updatePriceAndStockResponse = await axios.put('https://sandbox-apis.ciceksepeti.com/api/v1/Products/price-and-stock', {
                items
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(updatePriceAndStockResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update Çiçeksepeti product price and stock");
        }
    });
    routes.get('/v1/ciceksepeti/products/batch-status/:batchId', async (request: Request, response: Response) => {
        try {
            const { batchId } = request.params;

            const batchStatusResponse = await axios.get(`https://sandbox-apis.ciceksepeti.com/api/v1/Products/batch-status/${batchId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(batchStatusResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch Çiçeksepeti batch status");
        }
    });

    // Rota para obter pedidos de fornecedores em Çiçeksepeti
    routes.post('/v1/ciceksepeti/order/get-orders', async (request: Request, response: Response) => {
        try {
            const orderRequestData = request.body;

            const getOrdersResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Order/GetOrders', orderRequestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(getOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to fetch Çiçeksepeti orders");
        }
    });
    routes.post('/Filial/EnviarInvoiceMail', async (request: Request, response: Response) => {
        try {
            const invoiceRequestData = request.body;

            const sendInvoiceMailResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/Filial/EnviarInvoiceMail', invoiceRequestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(sendInvoiceMailResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to send invoice");
        }
    });

    // Rota para obter código de carga e marcar como pronto para envio
    routes.put('/api/v1/Order/readyforcargowithcsintegration', async (request: Request, response: Response) => {
        try {
            const orderItemsGroup = request.body;

            const readyForCargoResponse = await axios.put('https://sandbox-apis.ciceksepeti.com/api/v1/Order/readyforcargowithcsintegration', orderItemsGroup, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(readyForCargoResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to mark order as ready for cargo");
        }
    });

    // Rota para atualizar status do pedido com integração de fornecedor
    routes.put('/api/v1/Order/statusupdatewithsupplierintegration', async (request: Request, response: Response) => {
        try {
            const orderItems = request.body;

            const statusUpdateResponse = await axios.put('https://sandbox-apis.ciceksepeti.com/api/v1/Order/statusupdatewithsupplierintegration', orderItems, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(statusUpdateResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to update order status with supplier integration");
        }
    });
    routes.put('/api/v1/Order/CargoCompany', async (request: Request, response: Response) => {
        try {
            const cargoCompanyData = request.body;

            const cargoCompanyResponse = await axios.put('https://sandbox-apis.ciceksepeti.com/api/v1/Order/CargoCompany', cargoCompanyData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(cargoCompanyResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to change cargo company for the order");
        }
    });

    // Rota para inserir decimal e quantidade antes de avançar pedidos de decil alto
    routes.post('/api/v1/Order/CargoMeasurement', async (request: Request, response: Response) => {
        try {
            const cargoMeasurementData = request.body;

            const cargoMeasurementResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Order/CargoMeasurement', cargoMeasurementData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(cargoMeasurementResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to insert cargo measurement for the order");
        }
    });

    // Rota para listar pedidos com status de devolução
    routes.post('/api/v1/Order/getcanceledorders', async (request: Request, response: Response) => {
        try {
            const canceledOrdersData = request.body;

            const canceledOrdersResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Order/getcanceledorders', canceledOrdersData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(canceledOrdersResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get canceled orders");
        }
    });

    // Rota para iniciar processo de devolução ao fornecedor
    routes.post('/api/v1/Order/refundprocessstartreceivedprocess', async (request: Request, response: Response) => {
        try {
            const refundProcessData = request.body;

            const refundProcessResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Order/refundprocessstartreceivedprocess', refundProcessData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(refundProcessResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to start refund process and received process");
        }
    });
    routes.post('/api/v1/Pedido/avaliacaodecancelamento', async (request: Request, response: Response) => {
        try {
            const cancelationEvaluationData = request.body;

            const cancelationEvaluationResponse = await axios.post('https://sandbox-apis.ciceksepeti.com/api/v1/Pedido/avaliacaodecancelamento', cancelationEvaluationData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(cancelationEvaluationResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to evaluate cancellation");
        }
    });

    // Rota para obter perguntas do vendedor
    routes.get('/api/v1/perguntasdovendedor', async (request: Request, response: Response) => {
        try {
            const sellerQuestionsData = request.query;

            const sellerQuestionsResponse = await axios.get('https://sandbox-apis.ciceksepeti.com/api/v1/perguntasdovendedor', {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
                params: sellerQuestionsData,
            });

            response.json(sellerQuestionsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get seller questions");
        }
    });

    // Rota para responder perguntas do vendedor
    routes.put('/api/v1/sellerquestions/:id', async (request: Request, response: Response) => {
        try {
            const questionId = request.params.id;
            const answerData = request.body;

            const answerResponse = await axios.put(`https://sandbox-apis.ciceksepeti.com/api/v1/sellerquestions/${questionId}`, answerData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(answerResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to answer seller question");
        }
    });

    // Rota para obter equivalentes dos parâmetros BranchActionId e BranchActionDetailId
    routes.get('/api/v1/perguntasdovendedor/acoes', async (request: Request, response: Response) => {
        try {
            const equivalentsResponse = await axios.get('https://sandbox-apis.ciceksepeti.com/api/v1/perguntasdovendedor/acoes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': 'YOUR_API_KEY' // Substitua YOUR_API_KEY pela chave de API válida
                },
            });

            response.json(equivalentsResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Failed to get equivalents for BranchActionId and BranchActionDetailId");
        }
    });
};