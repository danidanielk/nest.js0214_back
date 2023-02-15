import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { CommentsDto } from './comments.dto';
import { Comments } from './comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async createComment(id: string, commentsDto: CommentsDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = commentsDto;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new HttpException('error', 400);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.count += 1;
      return await comment.save();
    } catch (error) {
      throw new HttpException('error', 400);
    }
  }
}
