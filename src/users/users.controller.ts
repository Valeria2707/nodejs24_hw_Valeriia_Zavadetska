import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  ResponseCreateUserDto,
  ResponseGetUserDto,
  ResponseRemoveUserDto,
  ResponseUpdateUserDto,
  UpdatePartialUserDto,
  UpdateUserDto,
} from './dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user by id.' })
  @ApiCreatedResponse({
    description: 'User retrieved successfully',
    type: ResponseGetUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return await this.usersService.findOne(id);
  }

  @Get()
  async getUsers(
    @Query() filterDto: { search?: string; [key: string]: any },
  ): Promise<IUser[]> {
    return this.usersService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Create user.' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: ResponseCreateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<IUser> {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Update partially user.' })
  @ApiCreatedResponse({
    description: 'User updated successfully',
    type: ResponseUpdateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  async updateUserPartially(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePartialUserDto,
  ): Promise<IUser> {
    return await this.usersService.updatePartially(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Update user.' })
  @ApiCreatedResponse({
    description: 'User updated successfully',
    type: ResponseUpdateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove user.' })
  @ApiCreatedResponse({
    description: 'User removed successfully',
    type: ResponseRemoveUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.usersService.remove(id);
  }
}
