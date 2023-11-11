import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { TrackService } from './track.service';

import { CreateTrackDto } from './dto/CreateTrackDto';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  async createTrack(@Body() dto: CreateTrackDto) {
    return this.trackService.createTrack(dto);
  }

  @Get()
  async getAllTracks() {
    return this.trackService.getAllTracks();
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
}
