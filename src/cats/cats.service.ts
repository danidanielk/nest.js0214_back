import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from './cats.dto';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const Cat = await this.catModel.exists({ email }); // 이메일이 있으면 true 없으면 false 반환.
    if (Cat) {
      throw new HttpException('이미 존재합니다', 403);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });
    return newCat.readOnlyData;
  }
}
