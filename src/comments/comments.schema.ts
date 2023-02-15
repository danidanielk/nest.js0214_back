import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    description: '댓글 작성자 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // 아이디는 원래 object 타입이다.
    required: true,
    ref: 'cats', // 다른 테이블과 연결시켜주는데 Cats 스키마는 앞자리가 소문자로 바뀐 cats 로 자동변형되어 저장된다.
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글(Contents)',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({
    default: 0,
  })
  @IsPositive() // 음수아닌 숫자
  count: number;

  @ApiProperty({
    description: '댓글이 작성된 포스트의 유저',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // 아이디는 원래 object 타입이다.
    required: true,
    ref: 'cats', // 다른 테이블과 연결시켜주는데 Cats 스키마는 앞자리가 소문자로 바뀐 cats 로 자동변형되어 저장된다.
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
