import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Request user:', request.user); // Debug log
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return (await super.canActivate(context)) as boolean;
  }
}
