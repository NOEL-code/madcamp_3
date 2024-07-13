import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  profileImage: string;
}
