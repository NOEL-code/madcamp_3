import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { multerOptions } from '../../upload.config';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @UploadedFiles() files: any[], // 타입을 any[]로 설정하여 오류를 무시
  ) {
    const people = JSON.parse(createTravelDto.people as any);
    people.forEach((person, index) => {
      person.image = files[index].location;
    });
    createTravelDto.people = people;
    return this.travelService.create(createTravelDto);
  }
}
