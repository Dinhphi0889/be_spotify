import { Get, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(private config: ConfigService, private readonly jwtService: JwtService) { }
  prisma = new PrismaClient()

  // get all user
  async findAll() {
    return this.prisma.user.findMany();
  }

  // find user by id
  async findOne(id: number) {
    const findUser = await this.prisma.user.findUnique({
      where: { userId: id },
    });
    if (!findUser) {
      throw new NotFoundException(`Can't found UserID: ${id}`)
    }
    return findUser
  }

  // Edit user
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { userId: id },
      data: {
        account: updateUserDto.account,
        name: updateUserDto.name,
        chanalName: updateUserDto.chanalName,
        avatar: updateUserDto.avatar,
        desciption: updateUserDto.desciption,
        refreshToken: updateUserDto.refreshToken,
        banner: updateUserDto.banner,
        role: updateUserDto.role,
        password: updateUserDto.password,
        nationality: updateUserDto.nationality,
      },
    });
  }

  // Delete user
  remove(id: number) {
    return this.prisma.user.delete({ where: { userId: id } });
  }

  // check account user has used?
  async checkDuplicateAccount(account: string): Promise<Boolean> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        account,
      },
    });
    return !!existingUser;
  }

  // register user
  async create(createUserDto: CreateUserDto) {
    const isAccount = await this.checkDuplicateAccount(createUserDto.account);
    if (isAccount) {
      throw HttpStatus.BAD_REQUEST;
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);
      return this.prisma.user.create({
        data: {
          account: createUserDto.account,
          name: createUserDto.name,
          chanalName: createUserDto.chanalName,
          avatar: createUserDto.avatar,
          desciption: createUserDto.desciption,
          refreshToken: createUserDto.refreshToken,
          banner: createUserDto.banner,
          role: createUserDto.role,
          password: createUserDto.password,
          nationality: createUserDto.nationality,
        },
      });
    }
  }

  // login
  async loginUser(account: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        account,
        password,
      },
    });
    if (!user) {
      return null
    }
    const payload = { username: user.account, id: user.userId, role: user.role }
    const token = this.jwtService.sign(payload)
    return {
      user,
      token
    };
  }

  // Find user by account
  async findUserByAccount(account: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { account } })
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('File không tồn tại')
    }
    return {
      filename: file.filename,
      path: process.cwd() + "/public/imgs" + file.filename,
      mimetype: file.mimetype,
      size: file.size
    }
  }


}
