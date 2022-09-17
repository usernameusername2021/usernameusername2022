import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.get_user(username);
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
        throw new NotAcceptableException('could not find the user');
      }
    if (user && passwordValid) {
      return {
        userName: user.name,
        userPassword: user.password
      };
    }
    return null;
  }
}