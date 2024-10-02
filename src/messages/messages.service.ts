import { Injectable } from '@nestjs/common';
import { Message, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MessagesService {
  prisma = new PrismaClient()

  findAll() {
    return this.prisma.message.findMany()
  }

  async sendMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({ data })
  }

  async getMessageByRoom(roomChat: string) {
    const getIdSender = roomChat.split("-")[1]
    const getMessage = await this.prisma.message.findMany({ where: { roomChat } })
    const getUserSender = await this.prisma.user.findUnique({ where: { userId: Number(getIdSender) } })
    return { message: getMessage, sender: getUserSender }

  }

  async getMessageByUserId(userId: number) {
    return this.prisma.message.findMany({
      where: { idSender: Number(userId) }
    })
  }


}
