import { Module } from '@nestjs/common';
import { ListFriendsService } from './list-friends.service';
import { ListFriendsController } from './list-friends.controller';

@Module({
  controllers: [ListFriendsController],
  providers: [ListFriendsService],
})
export class ListFriendsModule {}
