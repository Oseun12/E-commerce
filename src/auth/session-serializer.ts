import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    done(null, user.id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(id: any, done: Function) {
    const user = await this.usersService.findById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  }
}
