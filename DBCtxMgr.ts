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
            console.log("1");
            const thePool = this.ctxPoolRepo.get(databaseName);
            console.log("2");
            if(thePool === undefined) {
                console.log("3");
                resolve(MakeResult("invalid_db_name",`could not found the database name :${databaseName}`));
                return;
            }

            console.log("4");
            thePool.getConnection((err:MysqlError, conn:PoolConnection) => {
                if(err) {
                    console.log("5");
                    resolve(MakeResult("get_db_connection_fail", err.message));
                    return;
                }
                conn.query(query, values, (err : any, rows : any) => {
                    console.log("6");
                    conn.release();

                    if(err) {
                        console.log("7");
                        resolve(MakeResult("query_fail", err));
                        return;
                    }
                    
                    console.log("8 end");
                    resolve(MakeResult("ok", "", rows));
                });
            });
        });
    }

}
