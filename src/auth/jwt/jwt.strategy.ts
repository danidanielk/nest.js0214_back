// import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, //만료기간설정
    });
  }
  async validate(payload) {
    // console.log(payload);
    const { id } = payload;
    const cat = await this.catRepository.findCatByIdWithoutPassword(id);
    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}
