import redis from "redis";






export default class RedisCtxMgr {

    private static ctxMap : Map<string /*key*/, any> = new Map<string, any>();





    public static RegisterDB(key : string, host : string, port : number, database : number) {
        const newCtx = redis.createClient({
            host : host,
            port : port,
            db : database
        });

        this.ctxMap.set(key, newCtx);
    }






    public static Context(key : string) {
        return RedisCtxMgr.ctxMap.get(key);
    }





}
