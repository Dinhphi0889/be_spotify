import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RecentSongsService } from './recent-songs.service';
import { CreateRecentSongDto } from './dto/create-recent-song.dto';

import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { RecentSong } from '@prisma/client';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';

class TypePostRecentSong {
  @ApiProperty()
  userId: number

  @ApiProperty()
  songId: number

  @ApiProperty()
  time: Date
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('RECENT SONG')
@Controller('api/recent-songs')
export class RecentSongsController {
  constructor(private readonly recentSongsService: RecentSongsService) { }

  // Get recentSong via userId
  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.recentSongsService.findOne(+id);
  }

  // Post recentSong
  @ApiBody({
    type: TypePostRecentSong
  })
  @Post()
  PostRecentSongs(@Body() recentSongData: CreateRecentSongDto): Promise<RecentSong> {
    return this.recentSongsService.PostRecentSongs(recentSongData);
  }

  // Delete recentSong
  @Delete(':id')
  async deleteSong(@Query('id') idTable: number) {
    return this.recentSongsService.deleteSong(+idTable)
  }

}
