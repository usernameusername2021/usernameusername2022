import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeCounterDto } from './create-like-counter.dto';

export class UpdateLikeCounterDto extends PartialType(CreateLikeCounterDto) {
  id: number;
}
