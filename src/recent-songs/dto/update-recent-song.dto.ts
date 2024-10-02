import { PartialType } from '@nestjs/swagger';
import { CreateRecentSongDto } from './create-recent-song.dto';

export class UpdateRecentSongDto extends PartialType(CreateRecentSongDto) {}
