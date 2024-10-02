import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'
import {PrismaService} from './prisma.service'

@Module({
    imports: [],
    providers: [ChatGateway, ChatService, PrismaService],
    controllers: []
})
export class ChatModule { }