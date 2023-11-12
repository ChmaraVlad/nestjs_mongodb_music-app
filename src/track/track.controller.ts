import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Express } from 'express';

import { TrackService } from './track.service';

import { CreateTrackDto } from './dto/CreateTrackDto';
import { CreateCommentDto } from './dto/CreateCommentDto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async createTrack(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() dto: CreateTrackDto,
  ) {
    const { audio, picture } = files;

    return this.trackService.createTrack(dto, audio[0], picture[0]);
  }

  @Get()
  async getAllTracks(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ) {
    return this.trackService.getAllTracks(count, offset);
  }

  @Get(':_id')
  async getOneTrack(@Param() _id: ObjectId) {
    return this.trackService.getOneTrack(_id);
  }

  @Delete()
  async deleteOneTrack() {}

  @Delete(':_id')
  async deleteAllTracks(@Param() _id: ObjectId) {
    return this.trackService.deleteOneTrack(_id);
  }

  @Post(':_id/comment')
  async createComment(@Body() dto: CreateCommentDto, @Param() _id: ObjectId) {
    return this.trackService.createComment(dto, _id);
  }

  @Get(':_id/listen')
  async listen(@Param() _id: ObjectId) {
    return this.trackService.listen(_id);
  }
}
