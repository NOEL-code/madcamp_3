import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../upload.config';
import { CreatePhotoDto } from './create-photo.dto';
import { PhotoService } from './photo.service';
import { TravelService } from '../travel/travel.service';

@Controller('api/photo')
export class PhotoController {
  constructor(
    private readonly personService: PersonService,
    private readonly photoService: PhotoService,
    private readonly travelService: TravelService
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createPhoto(
    @Body() createPhotoDto: CreatePhotoDto,
    @UploadedFile() file: any
  ) {
    const isUnderZero = await this.travelService.decrementRemainPhotoCount(
      createPhotoDto.travelId.toString()
    );

    if (!isUnderZero) {
      throw new BadRequestException('Cannot decrement remain photo count');
    }

    const imageUrl = file.location;

    try {
      const persons = await this.personService.getImages(
        createPhotoDto.travelId.toString()
      );

      for (const person of persons) {
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
      }

      // If no matching person is found, save to NoMatchPhoto
      await this.photoService.saveNoMatchPhoto(
        createPhotoDto.travelId,
        imageUrl
      );
      return {
        message: 'No matching person found, image saved as NoMatchPhoto',
      };
    } catch (error) {
      console.error('Error during image verification:', error);
      throw new InternalServerErrorException('Error during image verification');
    }
  }
}
