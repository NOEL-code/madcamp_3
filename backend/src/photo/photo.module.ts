import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { NoMatchPhoto, NoMatchPhotoSchema } from './noMatchPhoto.shcema';
import { PersonService } from '../person/person.service';
import { Person, PersonSchema } from '../person/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoMatchPhoto.name, schema: NoMatchPhotoSchema },
    ]),
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  providers: [PhotoService, PersonService],
  controllers: [PhotoController],
})
export class PhotoModule {}
