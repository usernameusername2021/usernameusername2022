import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';


@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService,UserController],
  exports: [UserService, UserController]
})
export class UserModule {}
