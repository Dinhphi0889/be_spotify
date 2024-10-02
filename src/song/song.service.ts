import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SongService {

  constructor(private config: ConfigService) { }
  prisma = new PrismaClient()

  // Find song by id
  findOne(id: number) {
    return this.prisma.song.findMany({ where: { userId: id } });
  }

  // Play song
  playMusic(id: number) {
    return this.prisma.song.findFirst({
      where: {
        songId: id
      }
    })
  }
  // Find all song
  findAll() {
    return this.prisma.song.findMany();
  }

  // Create new song
  async create(createSongDto: CreateSongDto) {
    return this.prisma.song.create({
      data: {
        songName: createSongDto.songName,
        userId: createSongDto.userId,
        genreId: createSongDto.genreId,
        viewer: createSongDto.viewer,
        duration: createSongDto.duration,
        popular: createSongDto.popular,
        description: createSongDto.description,
        songImage: createSongDto.songImage,
        publicDate: createSongDto.publicDate,
        filePath: createSongDto.filePath,
        discussQuality: createSongDto.discussQuality
      }
    });
  }

  // Edit song
  update(id: number, updateSongDto: UpdateSongDto) {
    return this.prisma.song.update({
      where: { songId: id },
      data: {
        songName: updateSongDto.songName,
        userId: updateSongDto.userId,
        genreId: updateSongDto.genreId,
        viewer: updateSongDto.viewer,
        duration: updateSongDto.duration,
        popular: updateSongDto.popular,
        description: updateSongDto.description,
        songImage: updateSongDto.songImage,
        publicDate: updateSongDto.publicDate,
        filePath: updateSongDto.filePath,
        discussQuality: updateSongDto.discussQuality
      }
    });
  }

  // Delete song
  remove(id: number) {
    return this.prisma.song.delete({ where: { songId: id } });
  }
}
