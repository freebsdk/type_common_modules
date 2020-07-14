import mysql, {MysqlError, PoolConnection} from "mysql";
import {MakeResult} from "./Result";






export default class DBCtxMgr {

    private static ctxPoolRepo : Map<string /*database name*/, any> = new Map<string, any>();




    public static RegisterDB(host : string, user : string , password : string, port : number, database : string, connectionLimit : number = 50) {
        const newCtxPool = mysql.createPool({
            host : host,
            user : user,
            password : password,
            port : port,
            database : database,
            connectionLimit : connectionLimit,
            dateStrings:true, 
        });

        this.ctxPoolRepo.set(database, newCtxPool);
    }



    public static async QueryAsync(databaseName : string, query : string, values : any) {
        return new Promise<any>((resolve) => {
            const thePool = this.ctxPoolRepo.get(databaseName);
            if(thePool === undefined) {
                resolve(MakeResult("invalid_db_name",`could not found the database name :${databaseName}`));
                return;
            }

            thePool.getConnection((err1:MysqlError, conn:PoolConnection) => {
                if(err1) {
                    conn.release();
                    console.log(err1.message);
                    resolve(MakeResult("get_db_connection_fail", err1.message));
                    return;
                }

                conn.query(query, values, (err2 : MysqlError, rows : any) => {
                    conn.release();
                    if(err2) {
                        console.log(err2.message);
                        resolve(MakeResult("query_fail", err2.message));
                        return;
                    }
                    
                    resolve(MakeResult("ok", "", rows));
                });
            });
        });
    }

}
