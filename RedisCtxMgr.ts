import redis from "redis";






export default class RedisCtxMgr 
{
    private static ctx_map_ : Map<string /*key*/, redis.RedisClient> = new Map<string, redis.RedisClient>();
    

<<<<<<< HEAD
    private static ctxMap : Map<string /*key*/, any> = new Map<string, any>();
=======
>>>>>>> dbbbc2012b46385bf81f5218b657c6dac4d1c713

    

<<<<<<< HEAD



    public static RegisterDB(key : string, host : string, port : number, database : number) {
        const newCtx = redis.createClient({
=======
    public static Init(key : string, host : string, port : number, database : number) 
    {
        console.log(`Redis initialization to ${host}:${port} ... Start`);
        const new_ctx = redis.createClient({
>>>>>>> dbbbc2012b46385bf81f5218b657c6dac4d1c713
            host : host,
            port : port,
            db : database
        });

<<<<<<< HEAD
        this.ctxMap.set(key, newCtx);
=======
        this.ctx_map_.set(key, new_ctx);
        console.log(`Redis initialization to ${host}:${port} ... Complete`);
>>>>>>> dbbbc2012b46385bf81f5218b657c6dac4d1c713
    }






<<<<<<< HEAD
    public static Context(key : string) {
        return RedisCtxMgr.ctxMap.get(key);
=======
    public static Context(key : string) : redis.RedisClient
    {
        return this.ctx_map_.get(key);
>>>>>>> dbbbc2012b46385bf81f5218b657c6dac4d1c713
    }





}
