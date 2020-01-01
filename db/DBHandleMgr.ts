import mysql, {MysqlError, PoolConnection} from "mysql";
import DBConnectInfo from "./DBConnectInfo";





export default class DBHandleMgr {

    private static poolRepo : Map<string, any> = new Map<string, any>();




    public static RegisterDB(dbConfig : DBConnectInfo) {
        const newPool = mysql.createPool(dbConfig);
        this.poolRepo.set(dbConfig.database, newPool);
    }



    public static async QueryAsync(databaseName : string, query : string, values : any) {
        return new Promise<any>((resolve, reject) => {

            // get db_pool handle from the pool
            const thePool = this.poolRepo.get(databaseName);
            if(typeof thePool == 'undefined') {
                reject({error:"invalid_db_name",error_detail:`not exist database name > ${databaseName}}`});
                return;
            }

            thePool.getConnection((err:MysqlError, conn:PoolConnection) => {
                if(err) {
                    reject({error: "get_db_connection_fail", error_detail:err});
                    return;
                }
                conn.query(query, values, (err, rows) => {
                    if(err) {
                        reject({error: "query_fail", error_detail:err});
                        return;
                    }
                    resolve({error : undefined, error_detail:"", rows:rows});
                    conn.release();
                });
            });
        });
    }

}
