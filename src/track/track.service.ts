import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';

import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Track, TrackDocument } from 'src/schemas/track.schema';

import { CreateTrackDto } from './dto/CreateTrackDto';
import { CreateCommentDto } from './dto/CreateCommentDto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    try {
      if (!dto) {
        throw new HttpException(`Dto is not defined`, HttpStatus.BAD_REQUEST);
      }
      const track = await this.trackModel.create({
        ...dto,
        listens: 0,
      });
      return track;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getOneTrack(_id: ObjectId): Promise<Track> {
    try {
      const track = (await this.trackModel.findById(_id)).populate('comments');

      if (!track) {
        throw new HttpException(`Track is not defined`, HttpStatus.BAD_REQUEST);
      }
      return track;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllTracks(): Promise<Track[]> {
    try {
      const tracks = await this.trackModel.find();
      return tracks;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOneTrack(_id: ObjectId): Promise<mongoose.Types.ObjectId> {
    try {
      const track = await this.trackModel.findByIdAndDelete(_id);
      if (!track) {
        throw new HttpException(`Track is not defined`, HttpStatus.BAD_REQUEST);
      }
      return track._id;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteAllTracks() {}

  async createComment(dto: CreateCommentDto, _id: ObjectId): Promise<Comment> {
    try {
      if (!dto) {
        throw new HttpException(
          `Data for comment is not defined`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const comment = await this.commentModel.create({
        ...dto,
      });

      const track = await this.trackModel.findById(_id);
      if (!track) {
        throw new HttpException(`Track is not defined`, HttpStatus.BAD_REQUEST);
      }
      track.comments.push(comment);
      track.save();

      return comment;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
