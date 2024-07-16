import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
  Param,
  Get,
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

  @Get('/nomatch/:travelId')
  async findNoMatchPhoto(@Param('travelId') travelId: string) {
    const noMatchPhotos =
      await this.photoService.findNoMatchPhotosByTravelId(travelId);
    return noMatchPhotos;
  }

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
        console.log('횟수');
        const isVerified = await this.photoService.verifyImage(
          person.profileImage,
          imageUrl
        );

        if (isVerified) {
          console.log('여기서 오류임 ㅋ');
          console.log(person._id, imageUrl);

          await this.travelService.updatePersonTravelImages(
            person._id,
            imageUrl
          );
          return { personId: person._id };
        }
      }

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
