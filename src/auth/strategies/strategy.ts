import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

const cookieExtractor = (req: any): string | null => {
  if (req && req.cookies && req.cookies.auth_token) {
    return req.cookies.auth_token;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  validate(payload: { email: string; nome: string; cargo: string }) {
    if (!payload || !payload.email) {
      throw new UnauthorizedException('Token inválido.');
    }
    return {
      email: payload.email,
      nome: payload.nome,
      cargo: payload.cargo,
    };
  }
}
