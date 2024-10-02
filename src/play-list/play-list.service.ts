import { Injectable, NotFoundException } from '@nestjs/common';
import { AddSongsToPlaylistDto, CreatePlayListDto } from './dto/create-play-list.dto';
import { UpdatePlayListDto } from './dto/update-play-list.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayListService {
  prisma = new PrismaClient()

  // add new song to playlist
  createPlaylist(createPlayListDto: CreatePlayListDto) {
    return this.prisma.playlists.create({
      data: {
        userId: createPlayListDto.userId,
        imagePath: createPlayListDto.imagePath,
        playlistName: createPlayListDto.playlistName,
        description: createPlayListDto.description,
        createDate: createPlayListDto.createDate,
      }
    });
  }

  // Add song to playlist
  async addSongToPlaylist(addSongToPlaylist: AddSongsToPlaylistDto) {
    const { playlistId, songId } = addSongToPlaylist;
    const playlist = await this.prisma.playlists.findUnique({
      where: { id: playlistId },
    });
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    await this.prisma.playlistSongs.create({
      data: {
        playlistId,
        songId,
      },
    });
  }

  // Get all playlist
  findAll() {
    return this.prisma.playlists.findMany()
  }

  // get all song in playlist
  getAllPlaylistSong() {
    return this.prisma.playlistSongs.findMany()
  }

  // get playlist of user
  async getPlaylistOfUser(id: number) {
    return await this.prisma.playlists.findMany({ where: { userId: id } })
  }

  // get song in playlist
  async getSongInPlaylist(id: number) {
    return await this.prisma.playlistSongs.findMany({
      where: { songId: id },
      include: {
        Song: true
      }
    })
  }

  // Edit Playlist
  editPlaylist(id: number, updatePlayListDto: UpdatePlayListDto) {
    return this.prisma.playlists.update({
      where: { id },
      data: {
        playlistName: updatePlayListDto.playlistName,
        description: updatePlayListDto.description
      }
    });
  }

  // Delete Playlist
  remove(id: number) {
    return this.prisma.playlists.delete({
      where: {
        id
      }
    });
  }
}
