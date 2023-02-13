import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    //request 에는 요청하는 대상의 정보가 담겨져있다.
    res.on('finish', () => {
      //요청 에대한 응답이 완료 되었을때를 기준으로
      this.logger.log(req.originalUrl); //요청 url을 log에 출력
      this.logger.log(res.statusCode); //응답 code를 log에 출력
    });
    next();
  }
}
