import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscussDto } from './dto/create-discuss.dto';
import { UpdateDiscussDto } from './dto/update-discuss.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DiscussService {
  prisma = new PrismaClient();

  // Post discuss
  async postDiscuss(createDiscussDto: CreateDiscussDto) {
    return this.prisma.discuss.create({
      data: {
        userId: createDiscussDto.userId,
        songId: createDiscussDto.songId,
        discussId: createDiscussDto.discussId,
        content: createDiscussDto.content,
        discussDate: createDiscussDto.discussDate,
        replayDiscussId: createDiscussDto.replayDiscuss,
      },
    });
  }

  // get all discuss
  getAllDiscuss() {
    return this.prisma.discuss.findMany();
  }

  //find one discuss
  async findOne(id: number) {
    const discuss = await this.prisma.discuss.findMany({
      where: { songId: id },
      include: { User:true }
    });
    if (!discuss) {
      throw new NotFoundException(`Discuss with ID ${id} not found`);
    }
    return discuss;
  }

  //update discuss
  async update(id: number, updateDiscussDto: UpdateDiscussDto) {
    const existingDiscuss = await this.prisma.discuss.findUnique({
      where: { discussId: id },
    });
    if (!existingDiscuss) {
      throw new NotFoundException(`Discuss with ID ${id} not found`);
    }
    return this.prisma.discuss.update({
      where: { discussId: id },
      data: updateDiscussDto,
    });
  }

  // Delete discuss
  async remove(id: number) {
    const existingDiscuss = await this.prisma.discuss.findUnique({
      where: { discussId: id },
    });
    if (!existingDiscuss) {
      throw new NotFoundException(`Discuss with ID ${id} not found`);
    }
    return this.prisma.discuss.delete({
      where: { discussId: id },
    });
  }
}
