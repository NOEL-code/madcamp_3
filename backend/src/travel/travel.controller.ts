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

@Controller('api/travel')
export class TravelController {
  constructor(
    private readonly travelService: TravelService,
    private readonly personService: PersonService
  ) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  async createTravel(
    @Body() createTravelDto: any,
    @UploadedFiles() files: any[]
  ) {
    try {
      const { location, people, ...otherDto } = createTravelDto;

      // Ensure location and people are correctly structured
      const parsedLocation =
        typeof location === 'string' ? JSON.parse(location) : location;
      const parsedPeople =
        typeof people === 'string'
          ? JSON.parse(people)
          : (people as CreatePersonDto[]);

      // Create Travel object
      const createdTravel = await this.travelService.create({
        ...otherDto,
        location: parsedLocation,
        people: [],
      });

      // Create Person objects and add to Travel
      const personPromises = parsedPeople.map(async (person, index) => {
        const file = files.find((f) => f.fieldname === `images`);
        if (!file || !file.location) {
          console.error('File location is missing for file:', file);
          throw new Error('File location is missing');
        }
        person.profileImage = file.location; // Use location instead of path
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

      console.log(createdTravel);
      return createdTravel;
    } catch (error) {
      console.error('Error creating travel:', error);
      throw error;
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
