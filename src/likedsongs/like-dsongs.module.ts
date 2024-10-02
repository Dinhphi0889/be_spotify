import { Module } from '@nestjs/common';
import { LikeDsongsService } from './like-dsongs.service';
import { LikeDsongsController } from './like-dsongs.controller';

@Module({
  controllers: [LikeDsongsController],
  providers: [LikeDsongsService],
})
export class LikeDsongsModule {}
