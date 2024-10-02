import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // open CORS
  app.enableCors({
    origin: '*',
  });

  app.useWebSocketAdapter(new IoAdapter(app))
  const config = new DocumentBuilder()
    .setTitle('Spotify')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  // app.useGlobalPipes(new ValidationPipe());
  app.use(express.static('.'));

  await app.listen(8080);
}
bootstrap();
