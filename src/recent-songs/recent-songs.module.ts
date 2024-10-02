import { Module } from '@nestjs/common';
import { RecentSongsService } from './recent-songs.service';
import { RecentSongsController } from './recent-songs.controller';

@Module({
  controllers: [RecentSongsController],
  providers: [RecentSongsService],
})
export class RecentSongsModule {}
