// Import necessary modules
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Your Auth API')
    .setDescription('The API for your authentication system')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS using enableCors
  app.enableCors();

  const server = createServer(app.getHttpAdapter().getInstance());

  const ioAdapter = new IoAdapter({ path: '/socket.io' });

  app.useWebSocketAdapter(ioAdapter);

  app.use(
    express.static('public', {
      setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
