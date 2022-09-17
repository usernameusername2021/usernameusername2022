import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsController } from './controllers/songs.controller';
import { Songs } from './entities/songs.entity';
import { SongsRepository } from './repositories/songs.repository';
import { SongsService } from './services/songs.service';


@Module({
  controllers: [SongsController],
  imports: [TypeOrmModule.forFeature([SongsRepository])],
  providers: [ SongsService ],
  exports: [SongsService]
})
export class SongsModule {
  
  // constructor(private songsController: SongsController){}

  // async get_all_songs():Promise<Songs[]>{
  //   return await this.songsController.get_all_songs();
  // }
}
