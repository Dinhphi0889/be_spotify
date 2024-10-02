import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDiscussDto {
    @IsNumber()
    userId: number

    @IsNumber()
    discussId: number

    @IsString()
    content: string

    @IsNumber()
    songId: number

    @IsDate()
    discussDate: Date

    @IsString()
    replayDiscuss: string

}
