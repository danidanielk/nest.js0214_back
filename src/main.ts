import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()), //exception필터를 글로벌로 사용
    app.useGlobalPipes(new ValidationPipe()); //vilidationpipe  글로벌로 사용
  await app.listen(3000);
}
bootstrap();
