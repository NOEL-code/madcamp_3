import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTravelDto {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNotEmpty()
  @IsNumber()
  totalPeople: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  budget: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  people: string[];
}

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  profileImage: string;

  travelId?: Types.ObjectId; // travelId 추가
}
