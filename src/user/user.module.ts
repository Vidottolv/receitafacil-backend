import { Module } from '@nestjs/common';
import { UserAuth, UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, UserAuth],
  providers: [UserService]
})
export class UserModule {}
