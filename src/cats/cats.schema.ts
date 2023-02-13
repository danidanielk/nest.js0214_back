import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  email: string;

  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @IsString()
  @Prop()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    emaile: this.email,
    name: this.name,
  };
});
