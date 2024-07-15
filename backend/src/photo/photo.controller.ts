import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../upload.config'; // Ensure correct path
import { CreatePhotoDto } from './create-photo.dto';
import { PhotoService } from './photo.service';
import { Types } from 'mongoose';

@Controller('api/photo')
export class PhotoController {
  constructor(
    private readonly personService: PersonService,
    private readonly photoService: PhotoService
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createPhoto(
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile() file: any
  ) {
    const imageUrl = file.location;
    const persons = await this.personService.getImages(
      createPhotoDto.travelId.toString()
    );

    for (const person of persons) {
      try {
        const isVerified = await this.photoService.verifyImage(
          person.profileImage,
          imageUrl
        );

        if (isVerified) {
          await this.personService.updatePersonTravelImages(
            person._id,
            imageUrl
          );
          return { personId: person._id };
        }
      } catch (error) {
        console.error('Error during image verification:', error);
        throw error;
      }
    }

    // If no matching person is found, save to NoMatchPhoto
    await this.photoService.saveNoMatchPhoto(createPhotoDto.travelId, imageUrl);
    return { message: 'No matching person found, image saved as NoMatchPhoto' };
  }
}
