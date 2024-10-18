import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto, ResponseCreateReviewDto } from './dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Create review.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseCreateReviewDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Get all restaurant reviews.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseCreateReviewDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':restaurantId')
  findAllForRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.reviewsService.findAllForRestaurant(Number(restaurantId));
  }
}
