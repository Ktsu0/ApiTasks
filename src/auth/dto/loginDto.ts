import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  // Email do usuario
  @IsEmail()
  email: string;

  // Senha do usuario
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
