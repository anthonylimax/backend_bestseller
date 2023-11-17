import { Request, Response, Router } from "express";
import axios from "axios";

export const setRoutes = (routes: Router) => {
    
    // Rota para a API do eBay (FindProducts)
    routes.post('/findProducts', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'FindProducts',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcinou");
        }
    });
    routes.post('/getCategoryInfo', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetCategoryInfo',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/geteBayTime', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GeteBayTime',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json', // Alterado para JSON
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getItemStatus', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetItemStatus',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getMultipleItems', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetMultipleItems',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getShippingCosts', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetShippingCosts',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getSingleItem', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetSingleItem',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'json',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getUserProfile', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'GetUserProfile',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'xml',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/findItemsAdvanced', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'findItemsAdvanced',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/findItemsByCategory', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'findItemsByCategory',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/findItemsByKeywords', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'findItemsByKeywords',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/findItemsByProduct', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'findItemsByProduct',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/findItemsIneBayStores', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'findItemsIneBayStores',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getHistograms', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'getHistograms',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getSearchKeywordsRecommendation', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'getSearchKeywordsRecommendation',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getVersion', async (request: Request, response: Response) => {
        try {
            const app_name = "IsaaclAm-appsite-SBX-34e5ff41f-b7270287";  // Substitua pelo seu App ID/Client ID
            const headers = {
                'X-EBAY-SOA-SECURITY-APPNAME': app_name,
                'X-EBAY-SOA-OPERATION-NAME': 'getVersion',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://svcs.sandbox.ebay.com/services/search/FindingService/v1', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    //AQUI É PARA A PARTE DE EDIÇÃO, ADIÇÃO E REMOÇÃO DE PRODUTOS, ENTRE OUTRAS COISAS

    routes.post('/addFixedPriceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddFixedPriceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddItems', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddItems',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddMemberMessageAAQToPartner', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddMemberMessageAAQToPartner',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });

    routes.post('/AddMemberMessageRTQ', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddMemberMessageRTQ',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddMemberMessagesAAQToBidder', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddMemberMessagesAAQToBidder',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddMemberMessagesAAQToBidder', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddMemberMessagesAAQToBidder',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddOrder', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddOrder',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddSecondChanceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddSecondChanceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddToItemDescription', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddToItemDescription',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddToItemDescription', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddToItemDescription',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/AddToWatchList', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'AddToWatchList',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/CompleteSale', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'CompleteSale',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/CompleteSale', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'CompleteSale',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/confirmIdentity', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const app_name = 'IsaaclAm-appsite-SBX-34e5ff41f-b7270287';  // Substitua pelo seu App ID/Client ID
            const dev_name = '11a9420a-9d41-4f23-8e0e-1346ae4405a5';  // Substitua pelo seu Dev ID
            const cert_name = 'SBX-4e5ff41f4912-1049-4803-bf63-7eff';  // Substitua pelo seu Cert ID
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ConfirmIdentity',
                'X-EBAY-API-APP-NAME': app_name,
                'X-EBAY-API-DEV-NAME': dev_name,
                'X-EBAY-API-CERT-NAME': cert_name,
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/DeleteMyMessages', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'DeleteMyMessages',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/EndFixedPriceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'EndFixedPriceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/EndItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'EndItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/EndItems', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'EndItems',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ExtendSiteHostedPictures', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ExtendSiteHostedPictures',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ExtendSiteHostedPictures', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ExtendSiteHostedPictures',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/fetchToken', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const app_name = 'IsaaclAm-appsite-SBX-34e5ff41f-b7270287';  // Substitua pelo seu App ID/Client ID
            const dev_name = '11a9420a-9d41-4f23-8e0e-1346ae4405a5';  // Substitua pelo seu Dev ID
            const cert_name = 'SBX-4e5ff41f4912-1049-4803-bf63-7eff';  // Substitua pelo seu Cert ID
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'FetchToken',
                'X-EBAY-API-APP-NAME': app_name,
                'X-EBAY-API-DEV-NAME': dev_name,
                'X-EBAY-API-CERT-NAME': cert_name,
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetAccount', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetAccount',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetAdFormatLeads', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetAdFormatLeads',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetAllBidders', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetAllBidders',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetBestOffers', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetBestOffers',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetBidderList', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetBidderList',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetCategories', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetCategories',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetCategoryFeatures', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetCategoryFeatures',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetCategoryMappings', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetCategoryMappings',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetClientAlertsAuthToken', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetClientAlertsAuthToken',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetChallengeToken', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetChallengeToken',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetDescriptionTemplates', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetDescriptionTemplates',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GeteBayDetails', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GeteBayDetails',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GeteBayOfficialTime', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GeteBayOfficialTime',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetFeedback', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetFeedback',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetItemsAwaitingFeedback', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetItemsAwaitingFeedback',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetItemShipping', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetItemShipping',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetItemTransactions', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetItemTransactions',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMemberMessages', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMemberMessages',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMessagePreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMessagePreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMyeBayBuying', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMyeBayBuying',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMyeBaySelling', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMyeBaySelling',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMyMessages', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMyMessages',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetMyMessages', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetMyMessages',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetNotificationPreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetNotificationPreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetNotificationsUsage', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetNotificationsUsage',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetOrders', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetOrders',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetOrderTransactions', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetOrderTransactions',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetOrderTransactions', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetOrderTransactions',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetSellerDashboard', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSellerDashboard',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetSellerEvents', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSellerEvents',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetSellerList', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSellerList',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetSellerTransactions', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSellerTransactions',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/getSessionID', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const app_name = 'IsaaclAm-appsite-SBX-34e5ff41f-b7270287';  // Substitua pelo seu App ID/Client ID
            const dev_name = '11a9420a-9d41-4f23-8e0e-1346ae4405a5';  // Substitua pelo seu Dev ID
            const cert_name = 'SBX-4e5ff41f4912-1049-4803-bf63-7eff';  // Substitua pelo seu Cert ID
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSessionID',
                'X-EBAY-API-APP-NAME': app_name,
                'X-EBAY-API-DEV-NAME': dev_name,
                'X-EBAY-API-CERT-NAME': cert_name,
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetShippingDiscountProfiles', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetShippingDiscountProfiles',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetStore', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetStore',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetStoreCategoryUpdateStatus', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetStoreCategoryUpdateStatus',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetSuggestedCategories', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetSuggestedCategories',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetTaxTable', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetTaxTable',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetTaxTable', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetTaxTable',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetTokenStatus', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const app_name = 'IsaaclAm-appsite-SBX-34e5ff41f-b7270287';  // Substitua pelo seu App ID/Client ID
            const dev_name = '11a9420a-9d41-4f23-8e0e-1346ae4405a5';  // Substitua pelo seu Dev ID
            const cert_name = 'SBX-4e5ff41f4912-1049-4803-bf63-7eff';  // Substitua pelo seu Cert ID
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetTokenStatus',
                'X-EBAY-API-APP-NAME': app_name,
                'X-EBAY-API-DEV-NAME': dev_name,
                'X-EBAY-API-CERT-NAME': cert_name,
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetUser', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetUser',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetUserContactDetails', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetUserContactDetails',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetUserPreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetUserPreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetVeROReasonCodeDetails', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetVeROReasonCodeDetails',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/GetVeROReportStatus', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'GetVeROReportStatus',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/LeaveFeedback', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'LeaveFeedback',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/PlaceOffer', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'PlaceOffer',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RelistFixedPriceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RelistFixedPriceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RelistItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RelistItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RemoveFromWatchList', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RemoveFromWatchList',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RespondToBestOffer', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RespondToBestOffer',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RespondToFeedback', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RespondToFeedback',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseFixedPriceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseFixedPriceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseInventoryStatus', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseInventoryStatus',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseMyMessages', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseMyMessages',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseMyMessagesFolders', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseMyMessagesFolders',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ReviseMyMessagesFolders', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ReviseMyMessagesFolders',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/RevokeToken', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const app_name = 'IsaaclAm-appsite-SBX-34e5ff41f-b7270287';  // Substitua pelo seu App ID/Client ID
            const dev_name = '11a9420a-9d41-4f23-8e0e-1346ae4405a5';  // Substitua pelo seu Dev ID
            const cert_name = 'SBX-4e5ff41f4912-1049-4803-bf63-7eff';  // Substitua pelo seu Cert ID
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'RevokeToken',
                'X-EBAY-API-APP-NAME': app_name,
                'X-EBAY-API-DEV-NAME': dev_name,
                'X-EBAY-API-CERT-NAME': cert_name,
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SendInvoice', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SendInvoice',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetMessagePreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetMessagePreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetNotificationPreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetNotificationPreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetShippingDiscountProfiles', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetShippingDiscountProfiles',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetStoreCategories', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetStoreCategories',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetTaxTable', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetTaxTable',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetUserNotes', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetUserNotes',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/SetUserPreferences', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'SetUserPreferences',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/UploadSiteHostedPictures', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'UploadSiteHostedPictures',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ValidateChallengeInput', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ValidateChallengeInput',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/ValidateTestUserRegistration', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'ValidateTestUserRegistration',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/VerifyAddFixedPriceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'VerifyAddFixedPriceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/VerifyAddItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'VerifyAddItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/VerifyAddSecondChanceItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'VerifyAddSecondChanceItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/VerifyRelistItem', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'VerifyRelistItem',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
    routes.post('/VeROReportItems', async (request: Request, response: Response) => {
        try {
            const site_id = '0';  // Substitua pelo seu Site ID
            const compatibility_level = '967';
            const headers = {
                'X-EBAY-API-SITEID': site_id,
                'X-EBAY-API-COMPATIBILITY-LEVEL': compatibility_level,
                'X-EBAY-API-CALL-NAME': 'VeROReportItems',
                'Content-Type': 'application/xml', // Ou 'text/xml' dependendo do formato aceito pela API
            };

            const responseEbay = await axios.post('https://api.sandbox.ebay.com/ws/api.dll', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcionou");
        }
    });
};