import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';

import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Track, TrackDocument } from 'src/schemas/track.schema';

import { CreateTrackDto } from './dto/CreateTrackDto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
    });
    return track;
  }

  async getOneTrack(_id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(_id);
    return track;
  }

  async getAllTracks(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }

  async deleteOneTrack(_id: ObjectId): Promise<mongoose.Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(_id);
    return track._id;
  }

  deleteAllTracks() {}
}
