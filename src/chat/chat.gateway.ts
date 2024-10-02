import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { PrismaService } from "./prisma.service";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer() server: Server
    constructor(private readonly chatService: ChatService, private prismaService: PrismaService) {
        console.log('ChatGateway initialized')
    }

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server) {
        this.logger.log('Connect success')
    }
    async handleConnection(client: Socket) {
        console.log("ChatGateway  handleConnection  client:", client.id)
    }
    async handleDisconnect(client: Socket) {
        console.log("ChatGateway  handleDisconnect  client:", client.id)
    }

    @SubscribeMessage('message')
    async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: { idSender: number, contentMess: string, timeSend: Date, roomChat: string }) {
        const message = await this.prismaService.message.create({
            data: {
                idSender: payload.idSender,
                contentMess: payload.contentMess,
                timeSend: payload.timeSend,
                roomChat: payload.roomChat
            },
        })
        this.server.emit('message', message)
    }
}