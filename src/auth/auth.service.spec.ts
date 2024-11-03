import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockAccessToken'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const configMap = {
                JWT_ACCESS_SECRET: 'mockAccessSecret',
                JWT_ACCESS_SECRET_EXPIRE: '1h',
                JWT_REFRESH_SECRET: 'mockRefreshSecret',
                JWT_REFRESH_SECRET_EXPIRE: '7d',
              };
              return configMap[key];
            }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneWithoutExeption: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockImplementation((user) => user),
            findOneByName: jest.fn().mockResolvedValue({
              id: 1,
              firstName: 'testUser',
              password: await argon2.hash('testPassword'),
            }),
            findOneAndUpdate: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              firstName: 'testUser',
              refreshToken: await argon2.hash('mockRefreshToken'),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
