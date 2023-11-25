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
    
};