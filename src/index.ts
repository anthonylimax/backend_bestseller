import app from "express";
import dotenv from "dotenv";
import {setRoutes} from './routes/config';
import { rakutenApi } from "./routes/integrations/rakuten";
import cors from 'cors';

dotenv.config();
const init = app();
init.use(cors());
init.use(app.json());
rakutenApi(init);
setRoutes(init);
init.listen(process.env.LOGIN_PORT);