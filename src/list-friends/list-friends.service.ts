import { Injectable } from '@nestjs/common';
import { CreateListFriendDto } from './dto/create-list-friend.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ListFriendsService {
  prisma = new PrismaClient()

  // Add friends
  async addFriends(createListFriendDto: CreateListFriendDto) {
    return this.prisma.listFriends.create({
      data: {
        userId: createListFriendDto.userId,
        friendId: createListFriendDto.friendId,
        roomChat: createListFriendDto.roomChat
      }
    })
  }

  // get all list friend
  findAll() {
    return this.prisma.listFriends.findMany({
      include: {
        User: true
      }
    });
  }

  // Get list friend by userId
  async getListFriends(id: number) {
    return await this.prisma.listFriends.findMany({
      where: { userId: id },
      include: {
        User_ListFriends_friendIdToUser: true
      }
    });
  }

  // delete friends
  remove(id: number) {
    return this.prisma.listFriends.delete({ where: { id } });
  }
}
