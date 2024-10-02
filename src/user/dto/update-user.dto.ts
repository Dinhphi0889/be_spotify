import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto implements Prisma.UserCreateInput {
    @IsNumber()
    userId: Number;

    @IsString()
    account: string;

    @IsString()
    name: string;

    @IsString()
    nationality: string;

    @IsString()
    chanalName: string;

    @IsString()
    avatar: string;

    @IsString()
    desciption: string;

    @IsString()
    refreshToken: string;

    @IsString()
    banner: string;

    @IsString()
    role: string;

    @MinLength(6)
    @MaxLength(20)
    password: string;
    
}
