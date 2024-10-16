import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFavoriteDto,
  RemoveFavoriteDto,
  ResponseAddFavoriteDto,
  ResponseGetFavoriteDto,
  ResponseRemoveFavoriteDto,
} from './dto';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Add a restaurant to favorites.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseAddFavoriteDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    console.log(createFavoriteDto);
    return this.favoritesService.create(createFavoriteDto);
  }

  @ApiOperation({ summary: 'Get all user favorites restaurant.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetFavoriteDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.favoritesService.findAllForUser(Number(userId));
  }

  @ApiOperation({ summary: 'Remove a restaurant from favorites.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseRemoveFavoriteDto,
    isArray: false,
  })
  @Delete()
  remove(@Query() removeFavoriteDto: RemoveFavoriteDto) {
    return this.favoritesService.remove(removeFavoriteDto);
  }
}
