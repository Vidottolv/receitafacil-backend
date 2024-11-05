"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./interfaces/user.entity");
const bcrypt_1 = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async createUser(CreateUserDto) {
        try {
            await this.validateCreateUser(CreateUserDto);
            const saltOrRounds = 10;
            const passwordHashed = await (0, bcrypt_1.hash)(CreateUserDto.password, saltOrRounds);
            const newUser = await this.UserRepository.save({
                ...CreateUserDto,
                password: passwordHashed,
            });
            return {
                message: 'Usuário cadastrado com sucesso!',
                user: newUser,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Erro ao criar o usuário. Tente novamente mais tarde.');
        }
    }
    async validateCreateUser(CreateUserDto) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/;
        console.log(CreateUserDto);
        for (const [key, value] of Object.entries(CreateUserDto)) {
            if (value === '' || value === undefined || value === null) {
                throw new common_1.BadRequestException(`O campo ${key} não pode ser vazio, nulo ou indefinido.`);
            }
        }
        if (!emailRegex.test(CreateUserDto.email)) {
            console.log(CreateUserDto.email);
            throw new common_1.BadRequestException('O formato do email é inválido.');
        }
        if (!phoneRegex.test(CreateUserDto.phone)) {
            throw new common_1.BadRequestException('O formato do celular é inválido.');
        }
        if (CreateUserDto.password.length <= 6) {
            throw new common_1.BadRequestException('A senha deve ter mais do que 6 caracteres.');
        }
    }
    async validateLogin(LoginUserDto) {
        const { email, password } = LoginUserDto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email e senha são obrigatórios.');
        }
        const user = await this.UserRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas.');
        }
        return { message: 'Login bem-sucedido.', user };
    }
    async getAllUser() {
        return this.UserRepository.find();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map