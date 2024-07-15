import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePhotoDto {
  @IsNotEmpty()
  travelId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  albumPhotoUrl: string;
}
