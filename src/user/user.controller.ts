import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
import { LoginUserDTO } from './DTOs/loginUser.dto';

@Controller('user')
export class UserController {
    
    constructor(private readonly userService: UserService ){}

    @Post()
    async createUser(
        @Body() createUser : CreateUserDTO
    ): Promise<{ message: string; user?: UserEntity }>
        {
            return this
                .userService
                .createUser(createUser);
        } 
}

@Controller('auth')
export class UserAuth {
  constructor(private readonly userService: UserService) {}

  @Post()
  async login(
    @Body() loginUserDto: LoginUserDTO) {
    return this
        .userService
        .validateLogin(loginUserDto);
    }
}