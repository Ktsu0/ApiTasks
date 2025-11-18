// src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/createUserDto';
import { LoginDto } from 'src/auth/dto/loginDto';
import { UpdateUserDto } from 'src/auth/dto/updateUserDto';
import { User } from 'src/auth/model/auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private users: User[] = [];

  private createPayload(user: User) {
    return { email: user.email, name: user.name, role: user.role };
  }

  private sanitizeUser(user: User) {
    const { password, ...rest } = user;
    return rest;
  }

  generateToken(user: User) {
    return this.jwtService.sign(this.createPayload(user));
  }

  // Registro de usuário
  async register(data: CreateUserDto) {
    if (this.users.find((u) => u.email === data.email))
      throw new ConflictException('Email já cadastrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const newUser: User = { ...data, password: hashed };
    this.users.push(newUser);

    const token = this.generateToken(newUser);
    return {
      message: 'Conta criada com sucesso',
      token,
      user: this.sanitizeUser(newUser),
    };
  }

  // Login de usuário
  async login(data: LoginDto) {
    const user = this.users.find((u) => u.email === data.email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    const token = this.generateToken(user);
    return {
      message: 'Login bem-sucedido',
      token,
      user: this.sanitizeUser(user),
    };
  }

  // Logout
  logout() {
    return { message: 'Logout realizado' };
  }

  // Buscar usuário por email
  getUser(email: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.sanitizeUser(user);
  }

  // Atualizar usuário
  async updateUser(email: string, data: UpdateUserDto) {
    const user = this.users.find((u) => u.email === email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (data.email && data.email !== email) {
      if (this.users.find((u) => u.email === data.email))
        throw new ConflictException('Email já está em uso');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return { message: 'Usuário atualizado', user: this.sanitizeUser(user) };
  }

  // Excluir usuário
  deleteUser(email: string) {
    const index = this.users.findIndex((u) => u.email === email);
    if (index === -1) throw new NotFoundException('Usuário não encontrado');

    this.users.splice(index, 1);
    return { message: `Conta removida para: ${email}` };
  }
}
