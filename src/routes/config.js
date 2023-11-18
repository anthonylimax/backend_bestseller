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
exports.setRoutes = void 0;
const mysql_1 = __importDefault(require("../db/mysql"));
const cache_1 = require("./cache");
const setRoutes = (routes) => {
    routes.get("/", (request, response) => {
        response.send("wellcome");
    });
    routes.post('/verifycredentials', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const db = new mysql_1.default();
            const query = yield db.verifycredentials(request.body);
            const caching = cache_1.Cache.cache;
            let session = caching.InitializeTokenAcess(query);
            response.send(session);
        }
        catch (e) {
            response.sendStatus(404);
        }
    }));
    routes.post('/verifyCache', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const caching = cache_1.Cache.cache;
            let verifyCache = caching.verifyCache(request.body);
            response.send(verifyCache);
        }
        catch (e) {
            response.status(500).send(`${e}`);
        }
    }));
    routes.delete('/deleteSession', (request, response) => {
        const caching = cache_1.Cache.cache;
        caching.deleteSession(request.body);
        response.sendStatus(200);
    });
};
exports.setRoutes = setRoutes;
