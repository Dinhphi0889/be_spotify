import { PartialType } from '@nestjs/swagger';
import { LikeDsongDto } from './create-like-dsong.dto';

export class UpdateLikeDsongDto extends PartialType(LikeDsongDto) {}
