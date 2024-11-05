import { CreateUserDTO } from './DTOs/createUser.dto';
import { LoginUserDTO } from './DTOs/loginUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly UserRepository;
    constructor(UserRepository: Repository<UserEntity>);
    createUser(CreateUserDto: CreateUserDTO): Promise<{
        message: string;
        user?: UserEntity;
    }>;
    validateCreateUser(CreateUserDto: CreateUserDTO): Promise<void>;
    validateLogin(LoginUserDto: LoginUserDTO): Promise<{
        message: string;
        user?: UserEntity;
    }>;
    getAllUser(): Promise<UserEntity[]>;
}
