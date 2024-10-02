import { Prisma } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateRecentSongDto {

    @IsNumber()
    userId: number

    @IsNumber()
    songId: number

    @IsString()
    time: string
}
