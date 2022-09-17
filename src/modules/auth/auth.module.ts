import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './services/auth.service';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UserModule, PassportModule.register({session: true})],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService]
})
export class AuthModule {}
