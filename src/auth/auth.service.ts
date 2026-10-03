import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleProfile, UsersService } from '../users/users.service.js';

type GoogleUser = GoogleProfile & {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser) {
    const { accessToken: _accessToken, ...googleProfile } = googleUser;
    let user = await this.usersService.findByGoogleId(googleProfile.googleId);

    if (user) {
      user = await this.usersService.updateGoogleProfile(user, googleProfile);
    } else {
      user = await this.usersService.findByEmail(googleProfile.email);
      user = user
        ? await this.usersService.linkGoogleAccount(user, googleProfile)
        : await this.usersService.create(googleProfile);
    }

    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { user, jwt };
  }
}
