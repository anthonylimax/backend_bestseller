"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wix = void 0;
const axios_1 = __importDefault(require("axios"));
const Wix = (routes) => {
    routes.post('/getWixAccessToken', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { APP_ID, APP_SECRET, AUTH_CODE } = request.body;
            console.log(APP_ID, APP_SECRET);
            const tokenData = {
                grant_type: "authorization_code",
                client_id: APP_ID,
                client_secret: APP_SECRET,
                code: AUTH_CODE,
            };
            const headers = {
                'Content-Type': 'application/json',
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/oauth/access', tokenData, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.post('/refreshWixAccessToken', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { APP_ID, APP_SECRET, REFRESH_TOKEN } = request.body;
            const tokenData = {
                grant_type: "refresh_token",
                client_id: APP_ID,
                client_secret: APP_SECRET,
                refresh_token: REFRESH_TOKEN,
            };
            const headers = {
                'Content-Type': 'application/json',
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/oauth/access', tokenData, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Nova rota para a API do provedor (list-suggested-keywords)
    routes.post('/listSuggestedKeywords', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.body;
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': AUTH,
            };
            const providerApiResponse = yield axios_1.default.post('https://www.provider.example.com/v1/list-suggested-keywords', request.body, { headers });
            if (providerApiResponse.status === 200) {
                response.send(providerApiResponse.data);
            }
            else {
                response.status(providerApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.post('/getQuota', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.body;
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': AUTH,
            };
            const providerApiResponse = yield axios_1.default.post('https://www.provider.example.com/v1/get-quota', {}, { headers });
            if (providerApiResponse.status === 200) {
                response.send(providerApiResponse.data);
            }
            else {
                response.status(providerApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para consultar produtos na loja Wix
    routes.post('/queryWixProducts', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.body;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v1/products/query', request.body, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota adicional para consultar produtos na loja Wix (segunda chamada)
    routes.post('/queryWixProductsAgain', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.body;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v1/products/query', request.body, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.get('/getWixProductDetails', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Authorization': AUTH,
            };
            const productId = '91f7ac8b-2baa-289c-aa50-6d64764f35d3';
            const wixApiResponse = yield axios_1.default.get(`https://www.wixapis.com/stores/v1/products/${productId}?includeMerchantSpecificData=true`, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para criar um produto na loja Wix
    routes.post('/createWixProduct', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v1/products', request.body, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para atualizar um produto na loja Wix
    routes.patch('/updateWixProduct/:productId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { productId } = request.params;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.patch(`https://www.wixapis.com/stores/v1/products/${productId}`, request.body, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para excluir um produto na loja Wix
    routes.delete('/deleteWixProduct/:productId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { productId } = request.params;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.delete(`https://www.wixapis.com/stores/v1/products/${productId}`, { headers });
            if (wixApiResponse.status === 200) {
                response.send("Produto excluído com sucesso.");
            }
            else {
                response.status(wixApiResponse.status).send("Não foi possível excluir o produto.");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não foi possível excluir o produto.");
        }
    }));
    // Rota para consultar itens de inventário com base em um filtro de data de última atualização
    routes.post('/queryInventoryItems', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v2/inventoryItems/query', {
                query: {
                    filter: '{"lastUpdated": {"$gt": ["2020-01-29T09:22:00.000Z"]}}',
                },
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.post('/decrementInventoryItems', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const decrementData = request.body.decrementData;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v2/inventoryItems/decrement', {
                decrementData,
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para incrementar a quantidade de itens de inventário
    routes.post('/incrementInventoryItems', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const incrementData = request.body.incrementData;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v2/inventoryItems/increment', {
                incrementData,
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para criar pedidos
    routes.post('/createOrder', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const orderData = request.body.order;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v2/orders', {
                order: orderData,
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para atualizar o e-mail de um pedido
    routes.patch('/updateEmail', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { orderId, email } = request.body;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.patch(`https://www.wixapis.com/stores/v2/orders/${orderId}/updateEmail`, {
                orderId,
                email,
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.put('/updateShippingAddress', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { orderId, shippingAddress } = request.body;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.put(`https://www.wixapis.com/stores/v2/orders/${orderId}/updateShippingAddress`, {
                orderId,
                shippingAddress,
            }, { headers });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.get('/getOrderDetails/:orderId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { orderId } = request.params;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.get(`https://www.wixapis.com/stores/v2/orders/${orderId}`, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    routes.post('/getPaidOrders', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const requestData = {
                "query": {
                    "filter": "{\"paymentStatus\": \"PAID\"}",
                    "paging": {
                        "limit": 1
                    },
                    "sort": "[{\"number\": \"desc\"}]"
                }
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/stores/v2/orders/query', requestData, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para realizar o atendimento de um pedido
    routes.post('/fulfillOrder', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const requestData = {
                "fulfillment": {
                    "lineItems": [
                        {
                            "index": 1,
                            "quantity": 1
                        }
                    ],
                    "trackingInfo": {
                        "shippingProvider": "fedex",
                        "trackingNumber": "1234",
                        "trackingLink": "https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=1234"
                    }
                }
            };
            const orderId = 'fedb19f5-bd4c-4bfc-b2d1-212538319611'; // Substitua pelo ID real do pedido
            const wixApiResponse = yield axios_1.default.post(`https://www.wixapis.com/stores/v2/orders/${orderId}/fulfillments`, requestData, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para atualizar as informações de rastreamento de um atendimento de pedido
    routes.put('/updateFulfillmentTracking/:orderId/:fulfillmentId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { orderId, fulfillmentId } = request.params;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const requestData = {
                "fulfillmentTrackingInfo": {
                    "shippingProvider": "fedex",
                    "trackingNumber": "123"
                }
            };
            const wixApiResponse = yield axios_1.default.put(`https://www.wixapis.com/stores/v2/orders/${orderId}/fulfillments/${fulfillmentId}`, requestData, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                response.send(wixApiResponse.data);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para excluir um atendimento de pedido
    routes.delete('/deleteFulfillment/:orderId/:fulfillmentId', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const { orderId, fulfillmentId } = request.params;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.delete(`https://www.wixapis.com/stores/v2/orders/${orderId}/fulfillments/${fulfillmentId}`, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                response.sendStatus(200);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para obter a lista de moedas
    routes.get('/getCurrencies', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const wixApiResponse = yield axios_1.default.get('https://www.wixapis.com/currency_converter/api/v1/currencies', {
                headers,
            });
            if (wixApiResponse.status === 200) {
                const currencies = wixApiResponse.data; // Supondo que a resposta é um array de moedas
                response.status(200).json(currencies);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para converter moedas
    routes.post('/convertCurrency', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { AUTH } = request.headers;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': AUTH,
            };
            const requestData = {
                "amounts": [
                    {
                        "value": 30,
                        "decimal_places": 0
                    }
                ]
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/currency_converter/v1/currencies/amounts/USD/convert/EUR', requestData, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                const convertedAmount = wixApiResponse.data; // Supondo que a resposta é a quantia convertida
                response.status(200).json(convertedAmount);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para conectar ao psp.example.com
    routes.post('/connectPSP', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { client_id, client_secret, price_includes_tax, tax_percentage, country, currency, mode, wixMerchantId, } = request.body.credentials;
            const data = {
                credentials: {
                    client_id,
                    client_secret,
                    price_includes_tax,
                    tax_percentage,
                },
                country,
                currency,
                mode,
                wixMerchantId,
            };
            const headers = {
                'Content-Type': 'application/json',
                'Digest': 'JWT=ai0zIQqt71bmnkgEJ1CRJchjKJup',
            };
            const pspApiResponse = yield axios_1.default.post('https://psp.example.com/connect', data, {
                headers,
            });
            if (pspApiResponse.status === 200) {
                const pspResponseData = pspApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(pspResponseData);
            }
            else {
                response.status(pspApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para processar o pagamento com psp.example.com
    routes.post('/processPayment', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { wixMerchantId, wixTransactionId, paymentMethod, merchantCredentials, order, installments, mode, moto, paymentMethodData, } = request.body;
            const data = {
                wixMerchantId,
                wixTransactionId,
                paymentMethod,
                merchantCredentials,
                order,
                installments,
                mode,
                moto,
                paymentMethodData,
            };
            const headers = {
                'Content-Type': 'application/json',
                'Digest': 'JWT=ai0zIQqt71bmnkgEJ1CRJchjKJup',
            };
            const pspApiResponse = yield axios_1.default.post('https://psp.example.com/payment', data, {
                headers,
            });
            if (pspApiResponse.status === 200) {
                const pspResponseData = pspApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(pspResponseData);
            }
            else {
                response.status(pspApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para processar o reembolso com psp.example.com
    routes.post('/processRefund', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { wixTransactionId, wixRefundId, pluginTransactionId, merchantCredentials, refundAmount, mode, reason, } = request.body;
            const data = {
                wixTransactionId,
                wixRefundId,
                pluginTransactionId,
                merchantCredentials,
                refundAmount,
                mode,
                reason,
            };
            const headers = {
                'Content-Type': 'application/json',
                'Digest': 'JWT=ai0zIQqt71bmnkgEJ1CRJchjKJup',
            };
            const pspApiResponse = yield axios_1.default.post('https://psp.example.com/refund', data, {
                headers,
            });
            if (pspApiResponse.status === 200) {
                const pspResponseData = pspApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(pspResponseData);
            }
            else {
                response.status(pspApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
    // Rota para processar eventos de reembolso
    routes.post('/processRefundEvent', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventData = {
                event: {
                    refund: {
                        wixTransactionId: "11111111-1111-1111-1111-111111111111",
                        pluginRefundId: "22222222-2222-2222-2222-222222222222",
                        amount: "1000",
                        wixRefundId: "33333333-3333-3333-3333-333333333333",
                        reasonCode: "3025",
                        errorCode: "INSUFFICIENT_FUNDS_FOR_REFUND",
                        errorMessage: "Insufficient funds for refund",
                    },
                },
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': '<AUTH>',
            };
            const wixApiResponse = yield axios_1.default.post('https://www.wixapis.com/payments/v1/provider-platform-events', eventData, {
                headers,
            });
            if (wixApiResponse.status === 200) {
                const wixResponseData = wixApiResponse.data; // Supondo que a resposta contém os dados desejados
                response.status(200).json(wixResponseData);
            }
            else {
                response.status(wixApiResponse.status).send("Não funcionou");
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    }));
};
exports.Wix = Wix;
