import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  async createTrack() {
    return this.trackService.createTrack();
  }

  @Get()
  async getOneTrack() {
    return this.trackService.getOneTrack();
  }

  @Get()
  async getAllTracks() {}

  @Delete()
  async deleteOneTrack() {}

  @Delete()
  async deleteAllTracks() {}
}
