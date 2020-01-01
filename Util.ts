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
}
