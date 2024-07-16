import { Types } from 'mongoose';

export class CreatePersonDto {
  travelId?: Types.ObjectId;
  name: string;
  profileImage: string;
}
