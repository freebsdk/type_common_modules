import mysql, {MysqlError, PoolConnection} from "mysql";
import {MakeResult} from "./Result";






export default class DBCtxMgr {

    private static ctxPoolRepo : Map<string /*dbname*/, any> = new Map<string, any>();




    public static RegisterDB(host : string, user : string , password : string, port : number, database : string, connectionLimit : number = 10) {
        const newCtxPool = mysql.createPool({
            host : host,
            user : user,
            password : password,
            port : port,
            database : database,
            connectionLimit : connectionLimit
        });

        this.ctxPoolRepo.set(database, newCtxPool);
    }



    public static async QueryAsync(databaseName : string, query : string, values : any) {
        return new Promise<any>((resolve) => {

            // Get db_pool handle from the pool
            const thePool = this.ctxPoolRepo.get(databaseName);
            if(thePool === undefined) {
                resolve(MakeResult("invalid_db_name",`not exist database name :${databaseName}`));
                return;
            }

            thePool.getConnection((err:MysqlError, conn:PoolConnection) => {
                if(err) {
                    resolve(MakeResult("get_db_connection_fail", err.message));
                    return;
                }
                conn.query(query, values, (err : any, rows : any) => {
                    if(err) {
                        resolve(MakeResult("query_fail", err));
                        return;
                    }
                    resolve(MakeResult("ok", "", rows));
                    conn.release();
                });
            });
        });
    }

}
