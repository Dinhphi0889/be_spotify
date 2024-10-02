import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Prisma } from "@prisma/client";
import { Exclude } from 'class-transformer';

export class CreateUserDto implements Prisma.UserCreateInput {
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

    @Exclude()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial)
    }
}
