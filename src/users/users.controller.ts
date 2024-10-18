import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { AccessTokenGuard } from '../guards/access-token.guard';
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
    description: 'Created Succesfully',
    type: ResponseGetUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseCreateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  createUser(@Body() dto: CreateUserDto): IUser {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Update partially user.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseUpdateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  updateUserPartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdatePartialUserDto,
  ): IUser {
    return this.usersService.updatePartially(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Update user.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseUpdateUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): IUser {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove user.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseRemoveUserDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.remove(id);
  }
}
