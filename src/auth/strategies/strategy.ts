import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cargo } from '../model/auth.model';

const JWT_SECRET =
  'AWTKS36N7K8ODI2FMV58W5B2M1N7WP3O1G5ZA4578Q54Y321O898YT021GF4D6213554GDF97UDFMNLKPO5I46GFD789SADEQW18DSA789GH123U7I8RWE2378KJHKQEURNAS7236MLOSTS7891YUT';

const cookieExtractor = (req: any): string | null => {
  if (req && req.cookies && req.cookies.auth_token) {
    return req?.cookies?.auth_token;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(payload: { email: string; name: string; role: string }) {
    // 🛑 LOG 7: O Payload decodificado do Token
    console.log('--- LOG 7: JwtStrategy (Payload Decodificado) ---');
    console.log('Payload do Token:', payload);

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Token inválido.');
    }

    const userObject = {
      email: payload.email,
      name: payload.name,
      cargo: payload.role, // Mapeamento crucial
    };

    // 🛑 LOG 8: O Objeto que será injetado em req.user
    console.log('--- LOG 8: JwtStrategy (Objeto Injetado em req.user) ---');
    console.log('Objeto a ser injetado:', userObject);
    console.log('----------------------------------------------------------');

    return userObject;
  }
}
