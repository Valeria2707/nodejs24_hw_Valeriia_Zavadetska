import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateMenuDto } from './dto/update-menu.dto';
import { UpdateMenuDto } from './dto/сreate-menu.dto';
import { MenuItem } from './interfaces/menu-item.interface';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiOperation({ summary: 'Get all menu items' })
  @ApiOkResponse({ description: 'Successfully retrieved all menu items.' })
  @Get()
  async getMenus(
    @Query() filterDto: { search?: string; [key: string]: any },
  ): Promise<MenuItem[]> {
    return this.menusService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Get a single menu item by ID' })
  @ApiOkResponse({ description: 'Successfully retrieved the menu item.' })
  @ApiNotFoundResponse({ description: 'Menu item not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const menuItem = await this.menusService.findOne(id);
    return menuItem;
  }

  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiCreatedResponse({ description: 'Successfully created the menu item.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @ApiOperation({ summary: 'Update an existing menu item' })
  @ApiOkResponse({ description: 'Successfully updated the menu item.' })
  @ApiNotFoundResponse({ description: 'Menu item not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiOkResponse({ description: 'Successfully deleted the menu item.' })
  @ApiNotFoundResponse({ description: 'Menu item not found.' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.menusService.delete(id);
  }
}
