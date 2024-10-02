import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Message, Prisma } from '@prisma/client';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';
import { CheckTokenUser } from 'src/Guards/tokenUser.guard';

class TypeSendMessage {
  @ApiProperty()
  contentMess: string

  @ApiProperty()
  idSender: 1

  @ApiProperty()
  timeSend?: Date

  @ApiProperty()
  roomChat: string
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('MESSAGES')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  // Get all Message
  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  // Get message by room
  @Get('/byRoom')
  async getMessageByRoom(@Query("roomChat") roomChat: string) {
    return this.messagesService.getMessageByRoom(roomChat)
  }

  // send message
  @ApiHeader({
    name: 'Token-User',
    description: 'Input token user',
    required: true
  })
  @UseGuards(CheckTokenUser)
  @ApiBody({
    type: TypeSendMessage
  })
  @Post('/byRoom')
  async sendMessage(@Body() messageData: Prisma.MessageCreateInput): Promise<Message> {
    return this.messagesService.sendMessage(messageData)
  }

  @Get('/by-userId')
  async getMessageByUserId(@Query('userId') userId: number) {
    return this.messagesService.getMessageByUserId(userId)
  }

}
