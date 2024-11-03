import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto } from './dto';
import { Request } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            logout: jest.fn(),
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signUp with the correct data', async () => {
      const signUpUserDto: SignUpUserDto = {
        firstName: 'user',
        lastName: 'clay',
        age: 45,
        password: 'password123',
      };
      const result = {
        accessToken: 'mockToken',
        refreshToken: 'mockRefreshToken',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await controller.signup(signUpUserDto)).toEqual(result);
      expect(authService.signUp).toHaveBeenCalledWith(signUpUserDto);
    });
  });

  describe('signin', () => {
    it('should call authService.signIn with the correct data', async () => {
      const signInUserDto: SignInUserDto = {
        firstName: 'user',
        password: 'password123',
      };
      const result = {
        accessToken: 'mockToken',
        refreshToken: 'mockRefreshToken',
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await controller.signin(signInUserDto)).toEqual(result);
      expect(authService.signIn).toHaveBeenCalledWith(signInUserDto);
    });
  });

  describe('logout', () => {
    it('should call authService.logout with the user ID', async () => {
      const req = { user: { sub: 'user123' } } as unknown as Request;
      jest.spyOn(authService, 'logout').mockImplementation();

      await controller.logout(req);
      expect(authService.logout).toHaveBeenCalledWith('user123');
    });
  });

  describe('refreshTokens', () => {
    it('should call authService.refreshTokens with the correct data', async () => {
      const req = {
        user: { sub: 'user123', refreshToken: 'mockRefreshToken' },
      } as unknown as Request;
      const result = {
        accessToken: 'newMockToken',
        refreshToken: 'mockRefreshToken',
      };
      jest.spyOn(authService, 'refreshTokens').mockResolvedValue(result);

      expect(await controller.refreshTokens(req)).toEqual(result);
      expect(authService.refreshTokens).toHaveBeenCalledWith(
        'user123',
        'mockRefreshToken',
      );
    });
  });
});
