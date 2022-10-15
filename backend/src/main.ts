import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './filters/error-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(compression());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
