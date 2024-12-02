import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateReservationDto,
  ResponseCancelReservationDto,
  ResponseCreateReservationDto,
  ResponseGetReservationDto,
} from './dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOperation({ summary: 'Get all reservations.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseGetReservationDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.reservationsService.findAllForUser(userId);
  }

  @ApiOperation({ summary: 'Create reservation' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseCreateReservationDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @ApiOperation({ summary: 'Cancel resevation.' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: ResponseCancelReservationDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.reservationsService.cancelReservation(id);
  }

  @ApiOperation({ summary: 'Get all reservations.' })
  @ApiCreatedResponse({
    description: 'All reservations retrieved successfully',
    type: ResponseGetReservationDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get()
  findAll() {
    console.log('Request to fetch all reservations');
    const result = this.reservationsService.findAll();
    console.log('Response from service (findAll):', result);
    return result;
  }
}
