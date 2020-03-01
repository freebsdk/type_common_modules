import express from "express";
import http from "http";
import socketio from "socket.io";








export default class SocketIOServer {

    private app : any;
    private server : http.Server;
    private io : socketio.Server;
    private dispatchers : Map< string /*command*/, Function /*function*/> = new Map< string, Function>();
    
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketio(this.server);

        this.io.on("connection", (socket : socketio.Socket) => {
            this.dispatchers.forEach((value, key, map) =>{
                socket.on(key, (data) => {
                    value(data);
                });
            });
        });
    }





    public RegisterProcessor(command : string, processFunc : Function) {

        // Duplicate key checking
        if(this.dispatchers.has(command)) {
            throw new Error("already_registered_socket_io_dispatcher");
        }

        this.dispatchers.set(command, processFunc);
    }
}