import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('images/:travelId')
  async getImages(@Param('travelId') travelId: string) {
    return this.personService.getImages(travelId);
  }
}
