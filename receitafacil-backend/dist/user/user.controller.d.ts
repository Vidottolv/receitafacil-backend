import { CreateUserDTO } from './DTOs/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
import { LoginUserDTO } from './DTOs/loginUser.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUser: CreateUserDTO): Promise<{
        message: string;
        user?: UserEntity;
    }>;
}
export declare class UserAuth {
    private readonly userService;
    constructor(userService: UserService);
    login(loginUserDto: LoginUserDTO): Promise<{
        message: string;
        user?: UserEntity;
    }>;
}
