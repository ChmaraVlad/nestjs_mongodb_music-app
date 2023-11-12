import { Module } from '@nestjs/common';

import { TrackModule } from './track/track.module';
import { FilesModule } from './file/file.module';

import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';

import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@music-platform.6hgafqa.mongodb.net/',
    ),
    TrackModule,
    FilesModule,
  ],
})
export class AppModule {}
