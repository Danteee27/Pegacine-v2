import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GenreController } from './genre.controller';
import { GenreProviders } from './genre.providers';
import { GenreService } from './genre.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GenreController],
  providers: [...GenreProviders, GenreService],
})
export class GenreModule {}
