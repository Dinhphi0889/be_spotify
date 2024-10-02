import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GenreService {

  prisma = new PrismaClient

  findAll() {
    return this.prisma.genre.findMany();
  }

}
