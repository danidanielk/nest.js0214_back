import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsDto } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @Post(':id') //특정 고양이의 아이디(게시물 올린 유저) 를 가져와서 그아이디를 갖고있는 유저에게 댓글을 남김()
  async createComment(@Param() id: string, @Body() body: CommentsDto) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param() id: string) {
    return this.commentsService.plusLike(id);
  }
}
