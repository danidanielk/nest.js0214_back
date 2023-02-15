import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist';
import { LoginRequestDto } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CatRequestDto } from './cats.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenUser } from 'src/common/decorator/user.decorator';
import { UploadedFiles } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerOptions } from 'src/common/utils/multer.options';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

@Controller('cats')
@UseGuards(AuthGuard())
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  LogIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '현재 사용자 가져오기' })
  @Get()
  getCurrentCat(@TokenUser() user) {
    return user;
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @TokenUser() cat,
  ) {
    console.log(files);
    // return { image: `http://localhost:3000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }

  @Post('test')
  async test(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @TokenUser() cat,
  ) {
    const findbyid = await this.catModel.findById(cat.id);
    console.log('findbyid = ', findbyid);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
