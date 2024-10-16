import { Controller, Get, Param } from '@nestjs/common';
import { MenusService } from './menus.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseGetMenuItemDto } from './dto/response-get-menu-item.dto';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiOperation({ summary: 'Get all menu items for restaurant.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetMenuItemDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':restaurantId')
  findAllForRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.menusService.findAllForRestaurant(Number(restaurantId));
  }
}
