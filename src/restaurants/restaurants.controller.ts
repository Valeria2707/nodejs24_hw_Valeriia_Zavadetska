import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseGetRestaurantDto, SearchRestaurantDto } from './dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: 'Get filtered restaurants.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetRestaurantDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('search')
  search(@Query() searchParams: SearchRestaurantDto) {
    return this.restaurantsService.search(searchParams);
  }

  @ApiOperation({ summary: 'Get all restaurants.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetRestaurantDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @ApiOperation({ summary: 'Get restaurant by id.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetRestaurantDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(Number(id));
  }
}
