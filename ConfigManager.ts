import fs from "fs";





export default class ConfigManager 
{
    private static configMap : Map<string, string> = new Map<string, string>();




    public static LoadFromFile(fullPath : string) 
    {
        if(fs.existsSync(fullPath) == false) {
            console.error("[Error] Config file is not found. > "+fullPath);
            process.exit(-1);
        }

        const data = fs.readFileSync(fullPath, 'utf8');

        var cfgObj = JSON.parse(data);
        for(var key in cfgObj) {
            ConfigManager.configMap.set(key, cfgObj[key]);
        }
    }





    public static GetString(key : string) : string 
    {
        const val = ConfigManager.configMap.get(key);
        if(typeof val === "undefined") {
            console.error("[ERROR] Config property is not found > "+key);
            process.exit(-1);
        }

        return val;
    }




    public static GetNumber(key : string) : number
    {
        return Number(ConfigManager.GetString(key));
    }
}
