import { Module } from '@nestjs/common';

import { TrackModule } from './track/track.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@music-platform.6hgafqa.mongodb.net/',
    ),
    TrackModule,
  ],
})
export class AppModule {}
