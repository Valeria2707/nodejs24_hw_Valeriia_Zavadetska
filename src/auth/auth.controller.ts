import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ResponseLogoutDto,
  ResponseRefreshTokenDto,
  ResponseSignInDto,
  ResponseSignUpDto,
  SignInUserDto,
  SignUpUserDto,
} from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up user' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseSignUpDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('sign-up')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseSignInDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('sign-in')
  async signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseLogoutDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseRefreshTokenDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
