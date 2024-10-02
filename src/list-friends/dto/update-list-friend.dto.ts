import { PartialType } from '@nestjs/swagger';
import { CreateListFriendDto } from './create-list-friend.dto';

export class UpdateListFriendDto extends PartialType(CreateListFriendDto) {}
