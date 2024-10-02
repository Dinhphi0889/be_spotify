import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SongModule } from './song/song.module';
import { GenreModule } from './genre/genre.module';
import { MessagesModule } from './messages/messages.module';
import { RecentSongsModule } from './recent-songs/recent-songs.module';
import { LikeDsongsModule } from './likedsongs/like-dsongs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './ResponseInterceptor';
import { DiscussModule } from './discuss/discuss.module';
import { FollowingModule } from './following/following.module';
import { PlayListModule } from './play-list/play-list.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ListFriendsModule } from './list-friends/list-friends.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'local' }),
    UserModule,
    SongModule,
    GenreModule,
    MessagesModule,
    RecentSongsModule,
    LikeDsongsModule,
    DiscussModule,
    FollowingModule,
    PlayListModule,
    AuthModule,
    JwtModule.register({
      secret: 'testToken12333',
      signOptions: { expiresIn: '24h' },
      global: true
    }),
    ListFriendsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
