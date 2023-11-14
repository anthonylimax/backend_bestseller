import app from "express";
import dotenv from "dotenv";
import {setRoutes} from './routes/config';
import cors from 'cors';

dotenv.config();
const init = app();
init.use(cors());
init.use(app.json());
setRoutes(init);
init.listen(process.env.LOGIN_PORT);