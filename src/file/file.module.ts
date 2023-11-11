import { Module } from '@nestjs/common';
import { FilesService } from './file.service';

@Module({
  providers: [FilesService],
})
export class FilesModule {}
