export interface Idb{
    verifycredentials(credential : credential) : any,
    
}
export type credential = {
    email : string,
    password : string,
}