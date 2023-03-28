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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
