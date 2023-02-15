import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsNoSpecController } from './comments--no-spec/comments--no-spec.controller';
import { CommentsNoSpecService } from './comments--no-spec/comments--no-spec.service';
import { MommentsController } from './momments/momments.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController, CommentsNoSpecController, MommentsController],
  providers: [AppService, CommentsNoSpecService],
})
//미들웨어는 이곳에섯 연결시켜준 뒤
//LoggerMiddleware << 이것을 의존성주입해서 사용한다.
//forRoutes('사용할모듈 이름 또는 *');   '*' 로 표시하면 전체에대해 로깅할 수 있다.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
