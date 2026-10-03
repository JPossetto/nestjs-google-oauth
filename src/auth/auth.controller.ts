import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

type RequestWithUser = Request & {
  user: { jwt: string };
};

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() request: RequestWithUser, @Res() response: Response) {
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    return response.redirect(`${frontendUrl}/login-success?token=${request.user.jwt}`);
  }
}
