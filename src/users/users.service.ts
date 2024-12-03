import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdatePartialUserDto, UpdateUserDto } from './dto';
import { IAbstractDatabaseService } from 'src/database-abstraction/types/database-abstraction-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { PostgresEntityMapEnum } from 'src/database-abstraction/types/enums/postgres-entity-map.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly databaseService: IAbstractDatabaseService<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const userId = uuidv4();
    const newUser = { _id: userId, ...createUserDto };

    await this.databaseService.insertOne(PostgresEntityMapEnum.USER, newUser);
    return newUser as IUser;
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.databaseService.findOne(
      PostgresEntityMapEnum.USER,
      {
        _id: id,
      },
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user as IUser;
  }

  async findAll(filterDto?: {
    search?: string;
    [key: string]: any;
  }): Promise<IUser[]> {
    const { search, ...filter } = filterDto || {};
    return this.databaseService.findAll(
      PostgresEntityMapEnum.USER,
      filter,
      search,
    );
  }

  async updatePartially(
    id: string,
    updateUserDto: UpdatePartialUserDto,
  ): Promise<IUser> {
    if (updateUserDto.hasOwnProperty('id')) {
      throw new BadRequestException('Updating the "id" field is not allowed');
    }

    const updatedUser = await this.databaseService.updateOne(
      PostgresEntityMapEnum.USER,
      { _id: id },
      updateUserDto,
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser as IUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    if (updateUserDto.hasOwnProperty('id')) {
      throw new BadRequestException('Updating the "id" field is not allowed');
    }

    const updatedUser = await this.databaseService.updateOne(
      PostgresEntityMapEnum.USER,
      { _id: id },
      updateUserDto,
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser as IUser;
  }

  async remove(id: string): Promise<string> {
    const user = await this.databaseService.findOne(
      PostgresEntityMapEnum.USER,
      {
        _id: id,
      },
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.databaseService.deleteOne(PostgresEntityMapEnum.USER, {
      _id: id,
    });
    return `User with id ${id} removed successfully`;
  }

  async findOneAndUpdate(
    id: string,
    updateBody: UpdatePartialUserDto,
  ): Promise<IUser> {
    return this.updatePartially(id, updateBody);
  }
}
