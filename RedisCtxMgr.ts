import redis from "redis";






export default class RedisCtxMgr {

    private ctxMap : Map<number /*database*/, any> = new Map<number, any>();





    public RegisterDB(host : string, port : number, database : number) {
        const newCtx = redis.createClient({
            host : host,
            port : port,
            db : database
        });

        this.ctxMap.set(database, newCtx);
    }






    public GetCtx(database : number) {
        return this.ctxMap.get(database);
    }





}
