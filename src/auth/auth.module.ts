import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'somesecret',
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
