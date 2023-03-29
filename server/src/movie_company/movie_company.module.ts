import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MovieCompanyController } from './movie_company.controller';
import { MovieCompanyProviders } from './movie_company.providers';
import { MovieCompanyService } from './movie_company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieCompanyController],
  providers: [...MovieCompanyProviders, MovieCompanyService],
})
export class MovieCompanyModule {}
