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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePartialUserDto } from './dto/update-partial-user.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../guards/access-token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): IUser {
    return this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): IUser {
    return this.usersService.create(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  updateUserPartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdatePartialUserDto,
  ): IUser {
    return this.usersService.updatePartially(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): IUser {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.remove(id);
  }
}
