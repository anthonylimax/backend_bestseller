"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./routes/config");
const rakuten_1 = require("./routes/integrations/rakuten");
const cors_1 = __importDefault(require("cors"));
const wix_config_1 = require("./routes/integrations/wix_config");
dotenv_1.default.config();
const init = (0, express_1.default)();
init.use((0, cors_1.default)());
init.use(express_1.default.json());
(0, rakuten_1.rakutenApi)(init);
(0, config_1.setRoutes)(init);
(0, wix_config_1.Wix)(init);
init.listen(process.env.LOGIN_PORT);
