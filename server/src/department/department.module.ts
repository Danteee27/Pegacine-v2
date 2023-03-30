import { AuthModule } from './../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DepartmentController } from './department.controller';
import { DepartmentProviders } from './department.providers';
import { DepartmentService } from './department.service';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DepartmentController],
  providers: [...DepartmentProviders, DepartmentService],
})
export class DepartmentModule {}
