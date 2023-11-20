export interface Idb{
    verifycredentials(credential : credential) : any,
    
}
export type credential = {
    email : string,
    password : string,
}
export type dataToken = {
    nameStore: string,
    refresh: string,
    user_id: any,
}