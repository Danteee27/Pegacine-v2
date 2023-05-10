import { UpdateMovieDto } from './update_movie.dto';

export class UpdateMovieCommand {
  constructor(
    public readonly movie_id: number,
    public readonly dto: UpdateMovieDto,
  ) {}
}
