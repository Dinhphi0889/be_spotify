import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FollowingService {

  prisma = new PrismaClient()

  // Check follow
  async isFollowing(userId: number, followingId: number) {
    const follow = await this.prisma.following.findFirst({
      where: { followingId, userId }
    })
    return !!follow
  }

  // Follow
  async follow(userId: number, followingId: number) {
    const checkFollow = await this.prisma.following.findFirst({ where: { followingId: followingId, userId: userId } })
    if (checkFollow) {
      return
    }
    return this.prisma.following.create({
      data: {
        userId,
        followingId,
      }
    })
  }

  // unfollow
  async unfollow(userId: number, followingId: number) {
    const followingRecord = await this.prisma.following.findFirst({
      where: {
        userId: userId,
        followingId: followingId,
      },
    });

    if (followingRecord) {
      return await this.prisma.following.delete({
        where: {
          id: followingRecord.id,
          userId: followingRecord.userId,
          followingId: followingRecord.followingId
        }
      })
    }
  }
}
