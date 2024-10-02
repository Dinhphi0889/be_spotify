import { IsNumber } from "class-validator";

export class LikeDsongDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    idSongLiked: number;
    
}
