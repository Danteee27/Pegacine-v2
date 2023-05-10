import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMovieCommand } from './update_movie.command';
import { BadRequestException, Inject } from '@nestjs/common';
import { Movie } from 'src/movie/entities';
import { Repository } from 'typeorm';
import { OkResponse } from 'libs/models/responses';

@CommandHandler(UpdateMovieCommand)
export class UpdateMovieCommandHandler
  implements ICommandHandler<UpdateMovieCommand>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async execute(command: UpdateMovieCommand): Promise<any> {
    const existedMovie = await this.movieRepository.findOne({
      where: { movie_id: command.movie_id },
    });

    if (!existedMovie) {
      throw new BadRequestException('Movie not found');
    }

    existedMovie.title = command.dto.title || existedMovie.title;
    existedMovie.budget = command.dto.budget || existedMovie.budget;
    existedMovie.homepage = command.dto.homepage || existedMovie.homepage;
    existedMovie.overview = command.dto.overview || existedMovie.overview;
    existedMovie.popularity = command.dto.popularity || existedMovie.popularity;
    existedMovie.release_date =
      command.dto.release_date || existedMovie.release_date;
    existedMovie.runtime = command.dto.runtime || existedMovie.runtime;
    existedMovie.movie_status =
      command.dto.movie_status || existedMovie.movie_status;
    existedMovie.tagline = command.dto.tagline || existedMovie.tagline;
    existedMovie.vote_average =
      command.dto.vote_average || existedMovie.vote_average;
    existedMovie.vote_count = command.dto.vote_count || existedMovie.vote_count;
    existedMovie.image = command.dto.image || existedMovie.image;
    existedMovie.backdrop = command.dto.backdrop || existedMovie.backdrop;
    existedMovie.thumbnail = command.dto.thumbnail || existedMovie.thumbnail;
    existedMovie.poster = command.dto.poster || existedMovie.poster;
    existedMovie.seriesId = command.dto.seriesId || existedMovie.seriesId;
    existedMovie.seriesOrder =
      command.dto.seriesOrder || existedMovie.seriesOrder;
    existedMovie.isSeries = command.dto.isSeries || existedMovie.isSeries;
    existedMovie.video = command.dto.video || existedMovie.video;
    existedMovie.trailer = command.dto.trailer || existedMovie.trailer;
    existedMovie.isAdult = command.dto.isAdult || existedMovie.isAdult;

    existedMovie.save();

    return new OkResponse(existedMovie);
  }
}
