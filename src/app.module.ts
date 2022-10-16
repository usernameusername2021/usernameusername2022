
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Songs } from './modules/songs/entities/songs.entity';
import { SongsModule } from './modules/songs/songs.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { HttpModule} from '@nestjs/axios';
import { LocalStrategy } from './modules/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { LikeCounterModule } from './like-counter/like-counter.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ec2-52-51-3-22.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'lbwbcalvpbnbux',
    password: 'ded4eaec606f9962a507e4db42c94e8020cbd6610a60e6712d7d7c0d79bd9b4f',
    database: 'ddgasshgqisggu',
    entities: [User, Songs],
    synchronize: true,
    ssl: { rejectUnauthorized: false },
  }), SongsModule, UserModule, HttpModule, AuthModule, LikeCounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
