import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';
import { CatRequestDto } from './cats.dto';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email }); //이건 id를 반환해준다.
      if (result) {
        console.log(result);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async createCat(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    console.log(cat);
    return cat;
  }

  async findCatByIdWithoutPassword(
    id: string | Types.ObjectId,
  ): Promise<Cat | null> {
    // const cat = await this.catModel.findById(email).select('-password');
    const cat = await this.catModel.findOne({ id }).select('-password');
    if (!cat) {
      throw new HttpException('없어요', 400);
    }
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findOne({ id });
    cat.imgUrl = `http://localhost:3000/media/${fileName}`;
    const newCat = await cat.save();
    return newCat.readOnlyData;
  }
  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
  }
}
