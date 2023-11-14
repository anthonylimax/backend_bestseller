import Nodecache, { Key } from 'node-cache';
import crypto, { generateKey } from 'crypto';
import { arrayBuffer } from 'stream/consumers';
export class Cache {
    private SessionCache = new Nodecache({stdTTL: 86400});
    static cache = new Cache();

    constructor(){
    }
    public static getInstance():Cache{
       if(!Cache.cache){
            Cache.cache = new Cache();
            return Cache.cache;
        }
       return Cache.cache;
    }
    GenerateToken() {
        return crypto.randomBytes(32).toString('hex');
    }
    EncryptToken(token : string) {
        
        const algorithm = 'aes-256-cbc';
        const iv = crypto.randomBytes(16);
    
        const key = crypto.randomBytes(32);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    
        let encrypted = cipher.update(token, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        
        return {
            iv: iv.toString('hex'),
            key: key,
            encryptedToken: encrypted
        };
    }
    private DecryptToken(encryptedData : {encryptedToken : string, key: Buffer, iv: string}) : string {
        
        const algorithm = 'aes-256-cbc';
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptedData.key), Buffer.from(encryptedData.iv, 'hex'));
    
        let decrypted = decipher.update(encryptedData.encryptedToken, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
    
        return decrypted;
    }
    InitializeTokenAcess({id}: {id: string}) : any {
        let inArray = false;
        let data = Object.keys(this.SessionCache.data);
        data.forEach((element)=>{
            if(!inArray){
                
                console.log(this.SessionCache.data[element].v.userId, id);
                if(this.SessionCache.data[element].v.userId == id){
                    inArray = true;
                }
            }
        })
        if(!inArray){
        let token = this.GenerateToken();
        const encryptedToken = this.EncryptToken(token);
        const newAcess = {userId: id, encryptedToken: encryptedToken};
        this.SessionCache.set(token, newAcess);
        return encryptedToken;
    }
    }
    deleteSession(CripKey : {iv: string, key: Buffer, encryptedToken : string}){
        let Uncripkey = this.DecryptToken(CripKey);
        this.SessionCache.del(Uncripkey);

    }
    verifyCache(key: {iv: string, key: Buffer, encryptedToken : string}) {
        console.log(this.SessionCache.data)
        if(this.SessionCache.get(this.DecryptToken(key))){
            return true;
        }
        else{
            return false;
        }
    }
}