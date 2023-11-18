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
const promise_1 = __importDefault(require("mysql2/promise"));
class MySql {
    constructor() {
    }
    verifycredentials(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = yield promise_1.default.createConnection(process.env.DATABASE_URL || "");
            const [response, fields] = yield ref.query("select id from user where email = ? and password = ? ", [credential.email, credential.password]);
            return response[0];
        });
    }
}
exports.default = MySql;
