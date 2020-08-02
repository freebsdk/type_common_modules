const os = require('os');




export default class Util 
{
    public static IsNullOrUndefined(x : any) : boolean
    {
        if(typeof x === "undefined") return true;
        if(x == null) return true;

        return false;
    }

    
    
    
    
    public static IsNullOrUndefinedOrEmpty(x : string | null | undefined) : boolean
    {
        if(this.IsNullOrUndefined(x)) return true;
        if(typeof x === "string" && x.length <= 0) return true;

        return false;
    }




    public static GetCommandLineParameters() : string[]
    {
        return process.argv.slice(2);
    }




    public static SleepAsync(msec : number) 
    {
        return new Promise((resolve) =>{
            setTimeout(()=>{
                resolve();
            }, msec);
        });
    }



    public static GetLocalIpList() : Array<string>
    {
        var ip_adrs_list = Array<string>()

        const ifaces = os.networkInterfaces();
        const key_list = Object.keys(ifaces);
        for(var i=0; i<key_list.length; i++)
        {
            const iface_adrs_list = ifaces[key_list[i]];
            for(var j=0; j<iface_adrs_list.length; j++)
            {
                const iface = iface_adrs_list[j];
                if(iface.family !== "IPv4" || iface.internal !== false) continue;

                ip_adrs_list.push(iface.address);
            }
        }

        return ip_adrs_list;
    }

}
