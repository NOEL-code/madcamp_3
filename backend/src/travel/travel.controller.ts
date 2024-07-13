import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTravelDto, CreatePersonDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { multerOptions } from '../../upload.config';
import { PersonService } from '../person/person.service';
import { Types } from 'mongoose';

@Controller('travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private readonly personService: PersonService,
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @UploadedFiles() files: any[],
  ) {
    // Travel 객체 생성
    const createdTravel = await this.travelService.create(createTravelDto);

    // Person 객체 생성 및 Travel 객체에 추가
    const personIds: Types.ObjectId[] = [];
    const people = JSON.parse(
      createTravelDto.people as any,
    ) as CreatePersonDto[];

    for (const [index, person] of people.entries()) {
      person.profileImage = files[index]?.location;
      person.travelId = createdTravel._id; // travelId를 추가
      const createdPerson = await this.personService.create(person);
      personIds.push(createdPerson._id);
    }

    createdTravel.people = personIds;
    await this.travelService.update(createdTravel._id, { people: personIds });

    return createdTravel;
  }
}
