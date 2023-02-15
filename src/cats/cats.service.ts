import { HttpException, Injectable } from '@nestjs/common';
import { CatRequestDto } from './cats.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
import { Cat } from './cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const Cat = await this.catsRepository.existsByEmail(email); // 이메일이 있으면 true 없으면 false 반환.
    if (Cat) {
      throw new HttpException('이미 존재합니다', 403);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCat = {
      email,
      name,
      password: hashedPassword,
    };
    return await this.catsRepository.createCat(newCat);
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    console.log(fileName);
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log(newCat);
    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    return allCat;
    // const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    // return readOnlyCats;
  }
}
