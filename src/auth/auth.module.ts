import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/strategy';
import { JwtAuthGuard } from './guards/auth.guard';

const JWT_EXPIRES = '15m';
const JWT_SECRET =
  'AWTKS36N7K8ODI2FMV58W5B2M1N7WP3O1G5ZA4578Q54Y321O898YT021GF4D6213554GDF97UDFMNLKPO5I46GFD789SADEQW18DSA789GH123U7I8RWE2378KJHKQEURNAS7236MLOSTS7891YUT';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
