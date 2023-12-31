import app from "express";
import dotenv from "dotenv";
import {setRoutes} from './routes/config';
import { rakutenApi } from "./routes/integrations/rakuten";
import cors from 'cors';
import { Woo } from "./routes/integrations/woocommerce_config";
import { Wix } from "./routes/integrations/wix_config";
dotenv.config();
const init = app();
init.use(cors());
init.use(app.json());
rakutenApi(init);
setRoutes(init);
Wix(init);
init.listen(process.env.LOGIN_PORT);