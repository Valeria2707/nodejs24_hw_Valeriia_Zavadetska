import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IAbstractDatabaseService } from '../database-abstraction/types/database-abstraction-service.interface';
import { MongooseModelsMapEnum } from '../database-abstraction/types/enums/mngodb-model-map.enum';
import { v4 as uuidv4 } from 'uuid';
import { CreateMenuDto } from './dto/update-menu.dto';
import { UpdateMenuDto } from './dto/сreate-menu.dto';
import { MenuEntity } from 'src/database-abstraction/entities/menu.entity';
import { MenuItem } from './interfaces/menu-item.interface';

@Injectable()
export class MenusService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly databaseService: IAbstractDatabaseService<MenuEntity>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    const newMenuItem = new MenuEntity();
    newMenuItem._id = uuidv4();
    newMenuItem.name = createMenuDto.name;
    newMenuItem.description = createMenuDto.description;
    newMenuItem.price = createMenuDto.price;

    await this.databaseService.insertOne(
      MongooseModelsMapEnum.MENU,
      newMenuItem,
    );

    return newMenuItem;
  }

  async findAll(filterDto?: {
    search?: string;
    [key: string]: any;
  }): Promise<MenuItem[]> {
    const { search, ...filter } = filterDto || {};
    return this.databaseService.findAll(
      MongooseModelsMapEnum.MENU,
      filter,
      search,
    );
  }

  async findOne(id: string): Promise<MenuEntity> {
    const menuItem = await this.databaseService.findOne(
      MongooseModelsMapEnum.MENU,
      { _id: id },
    );

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    const menuItem = await this.databaseService.findOne(
      MongooseModelsMapEnum.MENU,
      { _id: id },
    );

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    const updatedMenuItem = await this.databaseService.updateOne(
      MongooseModelsMapEnum.MENU,
      { _id: id },
      updateMenuDto,
    );

    return updatedMenuItem;
  }

  async delete(id: string): Promise<{ message: string }> {
    const menuItem = await this.databaseService.findOne(
      MongooseModelsMapEnum.MENU,
      { _id: id },
    );

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    await this.databaseService.deleteOne(MongooseModelsMapEnum.MENU, {
      _id: id,
    });

    return {
      message: `Menu item with ID ${id} has been deleted successfully`,
    };
  }
}
