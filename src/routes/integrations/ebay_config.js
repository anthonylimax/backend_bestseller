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
const axios_1 = __importDefault(require("axios"));
const setRoutes = (routes) => {
    // Rota para a API do eBay (FindProducts)
    routes.post('/findProducts', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const access_token = "SEU_ACCESS_TOKEN"; // Substitua pelo seu token de acesso do eBay
            const headers = {
                'X-EBAY-API-IAF-TOKEN': `Bearer ${access_token}`,
                'X-EBAY-API-SITE-ID': '0',
                'X-EBAY-API-CALL-NAME': 'FindProducts',
                'X-EBAY-API-VERSION': '863',
                'X-EBAY-API-REQUEST-ENCODING': 'xml',
                'Content-Type': 'application/json',
            };
            const responseEbay = yield axios_1.default.post('https://open.api.sandbox.ebay.com/shopping', request.body, { headers });
            response.send(responseEbay.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).send("Não funcinou");
        }
    }));
};
exports.setRoutes = setRoutes;
