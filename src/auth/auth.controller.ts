// src/auth/auth.controller.ts
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/createUserDto';
import { LoginDto } from 'src/auth/dto/loginDto';
import { UpdateUserDto } from 'src/auth/dto/updateUserDto';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private sendToken(res: Response, token: string, user: any, message: string) {
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15 minutos
      path: '/',
    });

    return res.json({ message, user });
  }

  // Registro de usuário
  @Post('cad')
  async register(@Body() data: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.register(data);
    return this.sendToken(
      res,
      result.token,
      result.user,
      'Conta criada e usuário autenticado.',
    );
  }

  // Login de usuário
  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(data);
    return this.sendToken(
      res,
      result.token,
      result.user,
      'Login efetuado com sucesso.',
    );
  }

  // Logout de usuário
  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('auth_token', { path: '/' });

    return res.json({
      message: 'Logout realizado com sucesso.',
    });
  }

  //Verifica se o usuário está logado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return {
      user: req.user,
    };
  }

  // Buscar usuário pelo email
  @UseGuards(JwtAuthGuard)
  @Get('user/:email')
  getUser(@Param('email') email: string) {
    return this.authService.getUser(email);
  }

  // Atualizar usuário
  @UseGuards(JwtAuthGuard)
  @Patch('user/:email')
  updateUser(@Param('email') email: string, @Body() data: UpdateUserDto) {
    return this.authService.updateUser(email, data);
  }

  //Excluir usuário
  @UseGuards(JwtAuthGuard)
  @Delete('user/:email')
  deleteUser(@Param('email') email: string) {
    return this.authService.deleteUser(email);
  }
}
