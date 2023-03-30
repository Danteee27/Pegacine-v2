import 'reflect-metadata';

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department/entities';
import { DepartmentModule } from './department/department.module';
import { GenderModule } from './gender/gender.module';
import { GenreModule } from './genre/genre.module';
import { KeywordModule } from './keyword/keyword.module';
import { LanguageModule } from './language/language.module';
import { LanguageRoleModule } from './language_role/language_role.module';
import { MovieModule } from './movie/movie.module';
import { MovieCastModule } from './movie_cast/movie_cast.module';
import { MovieGenresModule } from './movie_genres/movie_genres.module';
import { MovieKeywordsModule } from './movie_keywords/movie_keywords.module';
import { MovieLanguagesModule } from './movie_languages/movie_languages.module';
import { PersonModule } from './person/person.module';
import { ProductionCompanyModule } from './production_company/production_company.module';
import { ProductionCountryModule } from './production_country/production_country.module';
import { MovieCrewModule } from './movie_crew/movie_crew.module';
import { MovieCompanyModule } from './movie_company/movie_company.module';
import { UserEntityModule } from './user/user.module';
// import { UserModule } from './user/user.module';

@Module({
  imports: [
    CountryModule,
    DepartmentModule,
    GenderModule,
    GenreModule,
    KeywordModule,
    LanguageModule,
    LanguageRoleModule,
    MovieModule,
    MovieCastModule,
    MovieGenresModule,
    MovieKeywordsModule,
    MovieLanguagesModule,
    PersonModule,
    ProductionCompanyModule,
    ProductionCountryModule,
    MovieCrewModule,
    MovieCompanyModule,
    UserEntityModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
