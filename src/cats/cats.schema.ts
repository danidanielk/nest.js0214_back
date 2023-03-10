import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'example@google.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: '아무개',
    description: 'name',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @IsString()
  @Prop({
    default:
      'data:image/jpeg;base64,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',
  })
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    emaile: this.email,
    name: this.name,
    imgUrL: this.imgUrl,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
