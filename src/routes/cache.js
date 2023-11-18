"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const crypto_1 = __importDefault(require("crypto"));
class Cache {
    constructor() {
        this.SessionCache = new node_cache_1.default({ stdTTL: 86400 });
    }
    static getInstance() {
        if (!Cache.cache) {
            Cache.cache = new Cache();
            return Cache.cache;
        }
        return Cache.cache;
    }
    GenerateToken() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
    EncryptToken(token) {
        const algorithm = 'aes-256-cbc';
        const iv = crypto_1.default.randomBytes(16);
        const key = crypto_1.default.randomBytes(32);
        const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(token, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return {
            iv: iv.toString('hex'),
            key: key,
            encryptedToken: encrypted
        };
    }
    DecryptToken(encryptedData) {
        const algorithm = 'aes-256-cbc';
        const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(encryptedData.key), Buffer.from(encryptedData.iv, 'hex'));
        let decrypted = decipher.update(encryptedData.encryptedToken, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
    InitializeTokenAcess({ id }) {
        let inArray = false;
        let data = Object.keys(this.SessionCache.data);
        data.forEach((element) => {
            if (!inArray) {
                console.log(this.SessionCache.data[element].v.userId, id);
                if (this.SessionCache.data[element].v.userId == id) {
                    inArray = true;
                }
            }
        });
        if (!inArray) {
            let token = this.GenerateToken();
            const encryptedToken = this.EncryptToken(token);
            const newAcess = { userId: id, encryptedToken: encryptedToken };
            this.SessionCache.set(token, newAcess);
            return encryptedToken;
        }
    }
    deleteSession(CripKey) {
        let Uncripkey = this.DecryptToken(CripKey);
        this.SessionCache.del(Uncripkey);
    }
    verifyCache(key) {
        console.log(this.SessionCache.data);
        if (this.SessionCache.get(this.DecryptToken(key))) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Cache = Cache;
Cache.cache = new Cache();
