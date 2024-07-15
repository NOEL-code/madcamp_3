import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFiles,
  UseInterceptors,
  Param,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTravelDto, CreatePersonDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { multerOptions } from '../../upload.config';
import { PersonService } from '../person/person.service';
import { Types } from 'mongoose';
import * as AWS from 'aws-sdk';

@Controller('api/travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private readonly personService: PersonService
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @UploadedFiles() files: any[]
  ) {
    const { location, people, ...otherDto } = createTravelDto;

    // Ensure location and people are correctly structured
    const parsedLocation = location; // No need to parse if already an object
    const parsedPeople = people as CreatePersonDto[]; // Ensure this is an array of CreatePersonDto

    // Create Travel object
    const createdTravel = await this.travelService.create({
      ...otherDto,
      location: parsedLocation,
      people: [],
    });

    // Create Person objects and add to Travel
    const personPromises = parsedPeople.map(async (person, index) => {
      const file = files[index];
      if (!file || !file.location) {
        console.error('File location is missing for file:', file);
        throw new Error('File location is missing');
      }
      person.profileImage = file.location;
      person.travelId = createdTravel._id; // Add travelId
      const createdPerson = await this.personService.create(person);
      return createdPerson;
    });

    const persons = await Promise.all(personPromises);

    // Add persons to the travel document and save
    createdTravel.people = persons.map((person) => ({
      _id: person._id,
      name: person.name,
      profileImage: person.profileImage,
      travelId: person.travelId,
      travelImage: person.travelImage,
    }));
    await createdTravel.save();

    return createdTravel;
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
