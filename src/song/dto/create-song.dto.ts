import { Prisma } from '@prisma/client';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator'

export class CreateSongDto implements Prisma.SongCreateManyInput {
    @IsString()
    songName: string;

    @IsNumber()
    viewer?: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    genreId: number;

    @IsString()
    duration?: string;

    @IsBoolean()
    popular: boolean;

    @IsString()
    description?: string;

    @IsString()
    songImage?: string;

    @IsDate()
    publicDate?: string | Date;

    @IsString()
    filePath?: string;

    @IsNumber()
    discussQuality?: number;

}
