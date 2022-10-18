import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as serveStatic from 'serve-static';
import { join } from 'path';
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { API_PREFIX, PORT } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.use(compression());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    '/public',
    serveStatic(join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  );

  await app.listen(PORT);
}
bootstrap();
