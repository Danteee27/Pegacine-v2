import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department/entities';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [CountryModule, DepartmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
