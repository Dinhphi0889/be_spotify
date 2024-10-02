import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Req, Res, Request } from '@nestjs/common';
import { FollowingService } from './following.service';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';
import { CreateFollowingDto } from './dto/create-following.dto';

class TypeFollow {
  @ApiProperty()
  userId: number
  @ApiProperty()
  followingId: number
}
@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true
})
@UseGuards(CybersoftTokenGuard)
@ApiTags('FOLLOWING')
@Controller('api/')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) { }

  // Check Follow
  @Get('is-following')
  async isFollowing(@Query('userId', ParseIntPipe) userId: number, @Query('followingUserId', ParseIntPipe) followingId: number): Promise<{ isFollowing: Boolean }> {
    const isFollowing = await this.followingService.isFollowing(userId, followingId)
    return { isFollowing }
  }

  // Follow
  @ApiBody({
    type: TypeFollow
  })
  @Post('send-follow')
  async follow(@Body('userId') userId: number, @Body('followingId') followingId: number) {
    return this.followingService.follow(userId, followingId)
  }

  // Unfollow
  @ApiBody({
    type: TypeFollow
  })
  @Delete('unfollow')
  async unfollow(@Body('userId') userId: number, @Body('followingId') followingId: number) {
    return await this.followingService.unfollow(userId, followingId)
  }

}
