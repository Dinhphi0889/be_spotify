import { Injectable } from '@nestjs/common';
import { PrismaClient, RecentSong } from '@prisma/client';
import { CreateRecentSongDto } from './dto/create-recent-song.dto';

@Injectable()
export class RecentSongsService {
  prisma = new PrismaClient()

  findOne(id: number) {
    return this.prisma.recentSong.findMany({
      where: { userId: id },
      include: {
        Song: true,
      }
    });
  }

  PostRecentSongs(data: CreateRecentSongDto): Promise<RecentSong> {
    const { userId, songId, time } = data
    const formatTime = new Date(time.replace(" ", "T") + "Z")
    return this.prisma.recentSong.create({
      data: {
        userId,
        songId,
        time: formatTime
      }
    })
  }

  deleteSong(idTable: number) {
    return this.prisma.recentSong.delete({ where: { id: idTable } })
  }

}
