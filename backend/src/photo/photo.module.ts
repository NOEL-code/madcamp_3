import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { NoMatchPhoto, NoMatchPhotoSchema } from './noMatchPhoto.schema';
import { PersonService } from '../person/person.service';
import { Person, PersonSchema } from '../person/person.schema';
import { TravelModule } from '../travel/travel.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoMatchPhoto.name, schema: NoMatchPhotoSchema },
    ]),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    forwardRef(() => TravelModule),
  ],
  providers: [PhotoService, PersonService],
  controllers: [PhotoController],
})
export class PhotoModule {}
