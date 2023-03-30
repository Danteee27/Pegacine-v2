import { AuthGuard } from 'libs/guards/clientService.guard';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
