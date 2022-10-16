import { Injectable } from '@nestjs/common';
import { Songs } from 'src/modules/songs/entities/songs.entity';
import { getRepository } from 'typeorm';
import { CreateLikeCounterDto } from './dto/create-like-counter.dto';
import { UpdateLikeCounterDto } from './dto/update-like-counter.dto';

@Injectable()
export class LikeCounterService {
  async get_like_counter(song_id: number) {
    const song = await getRepository(Songs)
    .createQueryBuilder("songs")
    .where("songs.id = :id", { id: song_id }).getOne();
    
    return song.like_counter;
  }
  // create(createLikeCounterDto: CreateLikeCounterDto) {
  //   return 'This action adds a new likeCounter';
  // }

  // findAll() {
  //   return `This action returns all likeCounter`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} likeCounter`;
  // }

  // update(id: number, updateLikeCounterDto: UpdateLikeCounterDto) {
  //   return `This action updates a #${id} likeCounter`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} likeCounter`;
  // }
}
