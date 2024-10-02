import { IsString } from 'class-validator';

export class UpdatePlayListDto {
    @IsString()
    playlistName: string
    @IsString()
    description: string
}