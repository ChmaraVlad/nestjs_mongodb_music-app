import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  createTrack() {
    return 'track was created';
  }
  getOneTrack() {
    return 'track';
  }
  getAllTracks() {}
  deleteOneTrack() {}
  deleteAllTracks() {}
}
