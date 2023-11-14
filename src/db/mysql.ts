
import { Idb, credential} from "./interface/IDb";
import mysql from 'mysql2/promise';

export default class MySql implements Idb{
    constructor(){
    }
    async verifycredentials(credential : credential) {  
        const ref = await mysql.createConnection(process.env.DATABASE_URL || "");
        const [response, fields] : any = await ref.query("select id from user where email = ? and password = ? ", [credential.email, credential.password])
        return response[0];
    }
}