import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { LoginUserDTO } from './DTOs/loginUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly UserRepository : Repository<UserEntity>,
    ) {}

    async createUser(CreateUserDto: CreateUserDTO) : Promise<{ message: string; user?: UserEntity }> {
        try {
            // console.log('Iniciando validação...');
            await this.validateCreateUser(CreateUserDto);
            // console.log('Validação concluída.');
            const saltOrRounds = 10;
            // console.log('Iniciando hashing da senha...');
            const passwordHashed = await hash(CreateUserDto.password, saltOrRounds);
            // console.log('Hashing concluído.');
            // console.log('Iniciando salvamento do usuário...');
            const newUser = await this.UserRepository.save({
                ...CreateUserDto,
                password: passwordHashed,
            });
            // console.log('Usuário salvo com sucesso.');
            return {
                message: 'Usuário cadastrado com sucesso!',
                user: newUser,
            };
        } catch (error) {
            // console.error('Erro ao criar o usuário:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao criar o usuário. Tente novamente mais tarde.');
        }
    }

    async validateCreateUser(CreateUserDto: CreateUserDTO){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/;

        console.log(CreateUserDto)
        for (const [key, value] of Object.entries(CreateUserDto)) {
            if (value === '' || value === undefined || value === null) {
                throw new BadRequestException(`O campo ${key} não pode ser vazio, nulo ou indefinido.`);
            }
        }
        if (!emailRegex.test(CreateUserDto.email)) {
            console.log(CreateUserDto.email)
            throw new BadRequestException('O formato do email é inválido.');
        }
        if (!phoneRegex.test(CreateUserDto.phone)) {
            throw new BadRequestException('O formato do celular é inválido.');
        }
        if(CreateUserDto.password.length <= 6) {
            throw new BadRequestException('A senha deve ter mais do que 6 caracteres.')
        }
    }

    async validateLogin(LoginUserDto: LoginUserDTO): Promise<{ message: string; user?: UserEntity }> {
        const { email, password } = LoginUserDto;
        if (!email || !password) {
          throw new BadRequestException('Email e senha são obrigatórios.');
        }
        const user = await this.UserRepository.findOne({ where: { email } });
        if (!user) {
          throw new UnauthorizedException('Credenciais inválidas.');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Credenciais inválidas.');
        }
        return { message: 'Login bem-sucedido.', user };
      }
    

    async getAllUser(): Promise<UserEntity[]>{
        return this.UserRepository.find();
    }
}
