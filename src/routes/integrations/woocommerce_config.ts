import { Request, Response, Router } from "express";
import MySql from "../db/mysql";
import { Cache } from "./cache";
import axios from "axios";

export const setRoutes = (routes: Router) => {
    routes.post('/verifycredentials', async (request: Request, response: Response) => {
        try {
            const db = new MySql();
            const query = await db.verifycredentials(request.body);
            const caching = Cache.cache;
            let session = caching.InitializeTokenAcess(query);
            response.send(session);
        } catch (e) {
            response.sendStatus(404);
        }
    });

    routes.post('/verifyCache', async (request: Request, response: Response) => {
        try {
            const caching = Cache.cache;
            let verifyCache = caching.verifyCache(request.body);
            response.send(verifyCache);
        } catch (e) {
            response.status(500).send(`${e}`);
        }
    });

    routes.delete('/deleteSession', (request: Request, response: Response) => {
        const caching = Cache.cache;
        caching.deleteSession(request.body);
        response.sendStatus(200);
    });
    routes.post('/woocommerce/productList', async (request: Request, response: Response) => {
        try {
            const woocommerceApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=product_list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(woocommerceApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/activate', async (request: Request, response: Response) => {
        try {
            const activateApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=activate', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(activateApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/deactivate', async (request: Request, response: Response) => {
        try {
            const deactivateApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=deactivate', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(deactivateApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/status', async (request: Request, response: Response) => {
        try {
            const statusApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=status', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(statusApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/information', async (request: Request, response: Response) => {
        try {
            const informationApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=information', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(informationApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/updateCheck', async (request: Request, response: Response) => {
        try {
            const updateCheckApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=update', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(updateCheckApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/pluginInformation', async (request: Request, response: Response) => {
        try {
            const pluginInformationApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=plugininformation', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(pluginInformationApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
    routes.post('/woocommerce/pluginUpdateCheck', async (request: Request, response: Response) => {
        try {
            const pluginUpdateCheckApiResponse = await axios.get('https://wc/?wc-api=wc-am-api&wc_am_action=pluginupdatecheck', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
    
            response.json(pluginUpdateCheckApiResponse.data);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
                       

};