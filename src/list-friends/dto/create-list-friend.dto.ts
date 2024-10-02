import { IsNumber, IsString } from "class-validator"

export class CreateListFriendDto {
    @IsNumber()
    userId: number
    @IsNumber()
    friendId: number
    @IsString()
    roomChat: string
}
