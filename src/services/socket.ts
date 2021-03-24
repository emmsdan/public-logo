import { Server, Socket } from "socket.io";

export default  class LiveEvents {
    io: Server;
    socket!: Socket

    constructor(app, http) {
        this.io = new Server(http);
        this.io.once("connection", (socket: Socket) => {
            this.socket = socket
            console.log('socket server running on id', socket)
        });
    }
}