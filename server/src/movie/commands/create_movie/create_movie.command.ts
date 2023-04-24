import { CreateMovieDto } from './create_movie.dto';

export class CreateMovieCommand {
  constructor(public readonly dto: CreateMovieDto) {}
}
