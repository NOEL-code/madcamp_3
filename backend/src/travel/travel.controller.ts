import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Param,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { multerOptions } from '../../upload.config';
import { PersonService } from '../person/person.service';
import { Types } from 'mongoose';

@Controller('api/travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private readonly personService: PersonService
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('people', 10, multerOptions))
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @UploadedFiles() files: any[]
  ) {
    try {
      const createdTravel = await this.travelService.create(
        createTravelDto,
        files
      );
      return createdTravel;
    } catch (error) {
      console.error('Error creating travel:', error);
      throw new InternalServerErrorException('Error creating travel');
    }
  }

  @Get(':travelId')
  async getTravel(@Param('travelId') travelId: Types.ObjectId) {
    return await this.travelService.getTravel(travelId);
  }

  @Delete(':travelId')
  async deleteTravel(@Param('travelId') travelId: Types.ObjectId) {
    return await this.travelService.deleteTravel(travelId);
  }

  @Get()
  async getTravels() {
    return await this.travelService.getTravels();
  }
}
