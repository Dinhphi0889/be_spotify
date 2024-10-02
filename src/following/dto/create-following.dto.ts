import { IsNumber } from "class-validator";

export class CreateFollowingDto {
    @IsNumber()
    userId: number
    @IsNumber()
    followingId: number
    
}
