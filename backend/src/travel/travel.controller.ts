import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { multerOptions } from '../../upload.config';
import { Types } from 'mongoose';

@Controller('api/travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('profileImage', 10, multerOptions)) // 'profileImage'로 수정
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @UploadedFiles() files: any[]
  ) {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
      }

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
}
