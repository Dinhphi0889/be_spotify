import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreatePlayListDto {
    @IsNumber()
    userId: number
    @IsString()
    imagePath: string
    @IsString()
    playlistName: string
    @IsNumber()
    songsId: number
    @IsString()
    description: string
    @IsDate()
    createDate: Date
    @IsString()
    songName: string
    @IsNumber()
    playlistId: number
}

export class AddSongsToPlaylistDto {
    @IsNotEmpty()
    @IsInt()
    playlistId: number;

    @IsArray()
    @IsInt()
    songId: number;
}