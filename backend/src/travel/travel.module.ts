import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from './schemas/travel.schema';
import { Person, PersonSchema } from '../person/person.schema';
import { PersonService } from '../person/person.service';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [TravelController],
  providers: [TravelService, PersonService],
})
export class TravelModule {}
