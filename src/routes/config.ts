import { Request, Response, Router } from "express";
import MySql from "../db/mysql";
import { Cache } from "./cache";
import axios from "axios";

export const setRoutes = (routes: Router) => {
    routes.get("/", (request: Request, response : Response)=>{
        response.send("wellcome")
    })
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

};
