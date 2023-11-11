import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from './track.controller';

import { TrackService } from './track.service';
import { FilesService } from 'src/file/file.service';

import { Track, TrackSchema } from 'src/schemas/track.schema';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FilesService],
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
})
export class TrackModule {}
