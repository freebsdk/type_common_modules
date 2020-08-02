import fs from "fs";
import path from "path"




export default class CfgMgr 
{
    private static configMap : Map<string, string> = new Map<string, string>();




    public static LoadFromFile(full_path : string) 
    { 
        const resolved_path = path.resolve(full_path);

        if(fs.existsSync(resolved_path) == false) {
            console.error("[Error] Config file is not found. > "+resolved_path);
            process.exit(-1);
        }

        const data = fs.readFileSync(resolved_path, 'utf8');

        var cfgObj = JSON.parse(data);
        for(var key in cfgObj) {
            CfgMgr.configMap.set(key, cfgObj[key]);
        }
    }





    public static GetString(key : string) : string 
    {
        const val = CfgMgr.configMap.get(key);
        if(typeof val === "undefined") {
            console.error("[ERROR] Config property is not found > "+key);
            process.exit(-1);
        }

        return val;
    }




    public static GetNumber(key : string) : number
    {
        return Number(CfgMgr.GetString(key));
    }
}
