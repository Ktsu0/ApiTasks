import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { Cargo } from 'src/auth/model/auth.model';

export class CreateUserDto {
  // Nome do Usuario
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  // Email valido
  @IsEmail()
  email: string;

  // Senha com requisitos minimos
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  // Cargo do usuário
  @IsEnum(Cargo)
  cargo: Cargo;
}
