import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 🛑 LOG 9: Verifica se o guarda está sendo ativado
    console.log(
      '--- LOG 9: JwtAuthGuard Ativado (Verifica se há Cookie/Header) ---',
    );
    return super.canActivate(context); // Chama a lógica da Strategy
  }
}
