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

    // Rota para a API do eBay (FindProducts)
    routes.post('/findProducts', async (request: Request, response: Response) => {
        try {
            const access_token = "SEU_ACCESS_TOKEN";  // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'FindProducts',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'xml',
                'Content-Type': 'application/json',
            };

            const responseEbay = await axios.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        } catch (error) {
            console.error(error);
            response.status(500).send("Não funcinou");
        }
    });
    
};