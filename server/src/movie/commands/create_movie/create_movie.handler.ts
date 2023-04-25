import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMovieCommand } from './create_movie.command';
import { Repository } from 'typeorm';
import { Movie } from 'src/movie/entities';
import { Inject } from '@nestjs/common';
import { MovieGenres } from 'src/movie_genres/entities';
import { MovieCast } from 'src/movie_cast/entities';
import { MovieKeywords } from 'src/movie_keywords/entities';
import { MovieLanguages } from 'src/movie_languages/entities';
import { ProductionCompany } from 'src/production_company/entities';
import { MovieCrew } from 'src/movie_crew/entities';
import { MovieCompany } from 'src/movie_company/entities';
import { ProductionCountry } from 'src/production_country/entities';
import { OkResponse } from 'libs/models/responses';
import { Person } from 'src/person/entities';

@CommandHandler(CreateMovieCommand)
export class CreateMovieCommandHandler
  implements ICommandHandler<CreateMovieCommand>
{
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private readonly movieRepository: Repository<Movie>,
    @Inject('MOVIEGENRE_REPOSITORY')
    private readonly movieGenresRepository: Repository<MovieGenres>,
    @Inject('MOVIECAST_REPOSITORY')
    private readonly movieCastRepository: Repository<MovieCast>,
    @Inject('MOVIEKEYWORDS_REPOSITORY')
    private readonly movieKeywordsRepository: Repository<MovieKeywords>,
    @Inject('MOVIELANGUAGES_REPOSITORY')
    private readonly movieLanguagesRepository: Repository<MovieLanguages>,
    @Inject('MOVIECREW_REPOSITORY')
    private readonly movieCrewRepository: Repository<MovieCrew>,
    @Inject('MOVIECOMPANY_REPOSITORY')
    private readonly movieCompanyRepository: Repository<MovieCompany>,
    @Inject('PRODUCTIONCOUNTRY_REPOSITORY')
    private readonly productionCountryRepository: Repository<ProductionCountry>,
    @Inject('PERSON_REPOSITORY')
    private readonly personRepository: Repository<Person>,
  ) {}

  async execute(command: CreateMovieCommand): Promise<any> {
    const {
      title,
      budget,
      homepage,
      overview,
      popularity,
      release_date,
      runtime,
      movie_status,
      tagline,
      vote_average,
      vote_count,
      image,
      backdrop,
      thumbnail,
      poster,
      seriesId,
      seriesOrder,
      isSeries,
      video,
      trailer,
      isAdult,
    } = command.dto;

    const newMovie = this.movieRepository.create({
      title,
      budget,
      homepage,
      overview,
      popularity,
      release_date,
      runtime,
      movie_status,
      tagline,
      vote_average,
      vote_count,
      image,
      backdrop,
      thumbnail,
      poster,
      seriesId,
      seriesOrder,
      isSeries,
      video,
      trailer,
      isAdult,
    });

    newMovie.save();

    return new OkResponse(newMovie);
  }
}
