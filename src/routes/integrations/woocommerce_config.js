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
exports.Woo = void 0;
const axios_1 = __importDefault(require("axios"));
const Woo = (routes) => {
    routes.post('/woocommerce/productList/woocommerce/productList', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const woocommerceApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=product_list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(woocommerceApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/activate', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const activateApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=activate', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(activateApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/deactivate', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deactivateApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=deactivate', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(deactivateApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/status', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const statusApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=status', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(statusApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/information', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const informationApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=information', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(informationApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/updateCheck', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateCheckApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=update', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(updateCheckApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/pluginInformation', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pluginInformationApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=plugininformation', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(pluginInformationApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    routes.post('/woocommerce/pluginUpdateCheck', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pluginUpdateCheckApiResponse = yield axios_1.default.get('https://wc/?wc-api=wc-am-api&wc_am_action=pluginupdatecheck', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            response.json(pluginUpdateCheckApiResponse.data);
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }));
};
exports.Woo = Woo;
