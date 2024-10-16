import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdatePartialUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      firstName: 'Cal',
      lastName: 'Clay',
      age: 28,
      password: 'Qwerty',
    },
    {
      id: 2,
      firstName: 'Lee',
      lastName: 'Fuller',
      age: 36,
      password: 'HelloWorld',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  updatePartially(id: number, updateUserDto: UpdatePartialUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.hasOwnProperty('id')) {
      throw new BadRequestException('Updating the "id" field is not allowed');
    }

    const updatedUser = { ...this.users[userIndex], ...updateUserDto };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.hasOwnProperty('id')) {
      throw new BadRequestException('Updating the "id" field is not allowed');
    }

    const updatedUser = { id, ...updateUserDto };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users = this.users.filter((user) => user.id !== id);

    return `User with ID ${id} removed successfully`;
  }

  findOneWithoutExeption(firstName: string): IUser {
    return this.users.find((user) => user.firstName === firstName);
  }

  findOneByName(firstName: string) {
    const user = this.users.find((user) => user.firstName === firstName);
    if (!user) {
      throw new NotFoundException(`User with firstName ${firstName} not found`);
    }
    return user;
  }

  findOneAndUpdate(id: number, updateBody: UpdatePartialUserDto): IUser {
    const user = this.findOne(id);
    return this.updatePartially(user.id, updateBody);
  }
}
