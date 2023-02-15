import { HttpException, Injectable } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService, // jwt의 모듈안에있는 jwtService 를 인젝션해준다.
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    const cat = await this.catsRepository.findCatByEmail(email); //email과 같은 오브젝트 가져온다.
    const isPasswordValidated: boolean = await bcrypt.compare(
      //compare 를 활용해서 복호화
      password,
      cat.password,
    );

    if (!cat) {
      throw new HttpException('email을 확인해 주세요. ', 400);
    } else if (!isPasswordValidated) {
      throw new HttpException('password를 확인해 주세요.', 400);
    }

    //토큰 생성하여 리턴
    const payload = { email: email, sub: cat.id };
    const token = await this.jwtService.sign(payload);
    return {
      token,
    };
  }
}
