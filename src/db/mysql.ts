
import { randomUUID } from "crypto";
import { Idb, credential, dataToken} from "./interface/IDb";
import mysql from 'mysql2/promise';

export default class MySql implements Idb{
    constructor(){
    }
    async verifycredentials(credential : credential) {  
        const ref = await mysql.createConnection(process.env.DATABASE_URL || "");
        const [response, fields] : any = await ref.query("select id from user where email = ? and password = ? ", [credential.email, credential.password])
        return response[0];
    }
    async InsertWIX(data : dataToken){
        const ref = await mysql.createConnection(process.env.DATABASE_URL || "");
        const [response, fields] : any = await ref.query("insert into token_acess values (?, ?, ?) ", [data.nameStore ,data.user_id, data.refresh])
        console.log(response[0]);
    }
}