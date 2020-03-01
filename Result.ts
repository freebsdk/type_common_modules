





export default class Result {
    public ErrorCode : string = "ok";
    public ErrorMsg : string = "";
    public Result : any;
}






export function MakeResult (errorCode : string , errorMsg : string = "", result : any = null) {
    var r = new Result();
    r.ErrorCode = errorCode;
    r.ErrorMsg = errorMsg;
    r.Result = result;

    return r;
}