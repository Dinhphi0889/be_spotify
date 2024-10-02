import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { LikeDsongsService } from './like-dsongs.service';
import { LikeDsongDto } from './dto/create-like-dsong.dto';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';

class TypePostLike {
  @ApiProperty()
  userId: number

  @ApiProperty()
  idSongLiked: number

  @ApiProperty()
  liked: Boolean
}

class TypePostUnLike {
  @ApiProperty()
  userId: number

  @ApiProperty()
  idSongLiked: number
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('LIKED SONG')
@Controller('api/')
export class LikeDsongsController {
  constructor(private readonly likeDsongsService: LikeDsongsService) { }

  // Post like song
  @ApiBody({
    type: TypePostLike,
  })
  @Post('/liked')
  postLikedSong(@Body() likedSongDto: LikeDsongDto) {
    return this.likeDsongsService.postLikedSong(likedSongDto.idSongLiked, likedSongDto.userId);
  }

  // Unlike
  @ApiBody({
    type: TypePostUnLike
  })
  @Delete('/unlike')
  unlikeSong(@Body() LikeDsongDto: LikeDsongDto) {
    return this.likeDsongsService.unlikeSong(LikeDsongDto.idSongLiked, LikeDsongDto.userId)
  }

  // Get song liked
  @Get('song-liked')
  getLikedSong(@Param('userId') userId: number, @Param('songId') songId: number) {
    return this.likeDsongsService.getSongLiked(userId, songId);
  }

}
