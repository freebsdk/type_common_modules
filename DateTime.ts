import moment from "moment";






export default class DateTime {



    public static GetCurUnixMsec() : number 
    {
        return moment().valueOf();
    }




    public static GetCurUnixSec() : number 
    {
        return Math.floor(DateTime.GetCurUnixMsec()/1000);
    }



    // yyyymmdd (number)
    public static GetDateTimeVal() : number 
    {

        const mt = moment(DateTime.GetCurUnixMsec());

        const y = mt.year();
        const m = (mt.month()+1);
        const d = mt.date();

        return (y*10000)+(m*100)+d;
    }



    // hhmm (number)
    public static GetTimeVal() : number 
    {
        const mt = moment(DateTime.GetCurUnixMsec());

        const h = mt.hour();
        const m = mt.minute();    

        return h*100+m;
    }






    public static UnixMsec2Sec(unixMsec : number) : number 
    {
        return Math.floor(unixMsec/1000);
    }




    public static UnixMsec2DateStr(unixMsec : number) : string 
    {
        return moment(unixMsec).format("YYYY-MM-DD HH:mm:ss");
    }




    public static DateStr2UnixMsec(dateStr : string) : number 
    {
        return moment(dateStr).valueOf();
    }

}