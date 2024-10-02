import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';

class TypeCreateSong {

  @ApiProperty()
  userId: number;

  @ApiProperty()
  viewer?: number;

  @ApiProperty()
  genreId: number;

  @ApiProperty()
  songName: string;

  @ApiProperty()
  duration?: number;

  @ApiProperty()
  popular: boolean;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  songImage?: string;

  @ApiProperty()
  publicDate?: string | Date;

  @ApiProperty()
  filePath?: string;

  @ApiProperty()
  discussQuality?: number;
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)

@ApiTags('SONG')
@Controller('api/')
export class SongController {
  constructor(private readonly songService: SongService) { }

  // Find all song
  @Get('/all-songs')
  findAll() {

    return this.songService.findAll();
  }

  // Find song by id
  @Get('find-song/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.songService.findOne(+id);
  }

  // Play music
  @Get('/play-music/:id')
  playMusic(@Param('id') id: number) {
    return this.songService.playMusic(+id)
  }

  // Create new song
  @ApiBody({
    type: TypeCreateSong
  })
  @Post('/create-new-song')
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  // Edit song
  @ApiBody({
    type: TypeCreateSong
  })
  @Put('edit-song/:id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songService.update(+id, updateSongDto);
  }

  // Delete song
  @Delete('delete-song/:id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}
