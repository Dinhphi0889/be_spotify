import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { DiscussService } from './discuss.service';
import { CreateDiscussDto } from './dto/create-discuss.dto';
import { UpdateDiscussDto } from './dto/update-discuss.dto';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';
import { JwtService } from '@nestjs/jwt';
import { CheckTokenUser } from 'src/Guards/tokenUser.guard';
import { Roles } from 'src/Guards/roles.decorator';
import { Role } from 'src/Types/role.enum';

class TypePostDiscuss {
  @ApiProperty()
  userId: number
  @ApiProperty()
  songId: number
  @ApiProperty()
  content: string
  @ApiProperty()
  discussDate: Date
  @ApiProperty()
  replayDiscussId: string
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Input token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('COMMENT')
@Controller('api/')
export class DiscussController {
  constructor(private readonly discussService: DiscussService,
    private jwtService: JwtService
  ) { }

  // Post Discuss
  @ApiHeader({
    name: 'Token-User',
    description: 'Input token user',
    required: true
  })
  @UseGuards(CheckTokenUser)
  @ApiBody({
    type: TypePostDiscuss
  })
  @Post('send-discuss')
  postDiscuss(@Body() createDiscussDto: CreateDiscussDto, @Req() req: Request) {
    return this.discussService.postDiscuss(createDiscussDto);
  }

  // get all discuss
  @Get('/all-discuss')
  getAllDiscuss() {
    return this.discussService.getAllDiscuss();
  }

  // Find Discuss
  @Get('find-discuss/:songId')
  findOne(@Param('songId') id: string) {
    return this.discussService.findOne(+id);
  }

  // Edit discuss
  @ApiHeader({
    name: 'Token-User',
    description: 'Input token user',
    required: true
  })
  // @UseGuards(CheckTokenUser)
  @ApiBody({
    type: TypePostDiscuss
  })
  @Put('edit-discuss/:id')
  update(@Param('id') id: string, @Body() updateDiscussDto: UpdateDiscussDto) {
    return this.discussService.update(+id, updateDiscussDto);
  }

  // Delete Discuss
  @ApiHeader({
    name: 'Token-User',
    description: 'Input token user',
    required: true
  })
  @UseGuards(CheckTokenUser)
  @Roles(Role.Admin)
  @Delete('delete-discuss/:id')
  remove(@Param('id') id: string) {
    return this.discussService.remove(+id);
  }
}
