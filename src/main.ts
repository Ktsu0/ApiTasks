// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global para cookie
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    credentials: true,
  });

  // Configuração global para os BTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não permitidas
      forbidNonWhitelisted: true, // Bloqueia envios com propriedades extras
      transform: true, // Transforma payloads nos DTOs automaticamente
      transformOptions: {
        enableImplicitConversion: true, // Ajuda na conversão de tipos (number, boolean, etc.)
      },
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
