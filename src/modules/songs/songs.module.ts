import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsController } from './controllers/songs.controller';
import { SongsRepository } from './repositories/songs.repository';
import { SongsService } from './services/songs.service';


@Module({
  controllers: [SongsController],
  imports: [TypeOrmModule.forFeature([SongsRepository])],
  providers: [ SongsService ]
})
export class SongsModule {}
