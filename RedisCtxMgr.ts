import redis from "redis";






export default class RedisCtxMgr 
{
    private static ctx_map_ : Map<string /*key*/, redis.RedisClient> = new Map<string, redis.RedisClient>();
    

    

    public static RegisterDB(key : string, host : string, port : number, database : number) {
        const new_ctx = redis.createClient({
            host : host,
            port : port,
            db : database
        });

        this.ctx_map_.set(key, new_ctx);
        console.log(`Redis initialization to ${host}:${port} ... Complete`);
    }






    public static Context(key : string) 
    {
        return RedisCtxMgr.ctx_map_.get(key);
    }




}
