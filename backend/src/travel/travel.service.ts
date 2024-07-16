import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelDto } from './dto/create-travel.dto';
import { Travel, TravelDocument } from './schemas/travel.schema';
import { Person, PersonDocument } from '../person/person.schema';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
    @InjectModel(Person.name) private personModel: Model<PersonDocument>
  ) {}

  async create(
    createTravelDto: CreateTravelDto,
    files: any[]
  ): Promise<TravelDocument> {
    const session = await this.travelModel.db.startSession();
    session.startTransaction();
    try {
      const { people, ...otherDto } = createTravelDto;
      const createdTravel = new this.travelModel(otherDto);
      await createdTravel.save({ session });

      const personPromises = people.map(async (person, index) => {
        const file = files[index];
        if (!file || !file.location) {
          throw new InternalServerErrorException(
            `Profile image for person ${index} is missing`
          );
        }
        person.profileImage = file.location;
        person.travelId = createdTravel._id.toString(); // ObjectId를 문자열로 변환하여 할당
        return new this.personModel(person).save({ session });
      });

      const persons = await Promise.all(personPromises);
      createdTravel.people = persons.map((person) => person._id);
      await createdTravel.save({ session });

      await session.commitTransaction();
      return createdTravel;
    } catch (error) {
      await session.abortTransaction();
      console.error('Error creating travel:', error);
      throw new InternalServerErrorException('Error creating travel');
    } finally {
      session.endSession();
    }
  }

  async getTravel(travelId: Types.ObjectId): Promise<TravelDocument> {
    return this.travelModel.findById(travelId).exec();
  }

  async deleteTravel(travelId: Types.ObjectId): Promise<any> {
    return this.travelModel.deleteOne({ _id: travelId }).exec();
  }

  async getTravels(): Promise<TravelDocument[]> {
    return this.travelModel.find().exec();
  }

  async decrementRemainPhotoCount(travelId: string): Promise<boolean> {
    try {
      const result = await this.travelModel.findOneAndUpdate(
        { _id: travelId, remainPhotoCount: { $gt: 0 } }, // Ensure remainPhotoCount is greater than 0
        { $inc: { remainPhotoCount: -1 } },
        { new: true } // Return the updated document
      );

      // If result is null, the travelId doesn't exist or remainPhotoCount was 0
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error decrementing remainPhotoCount:', error);
      return false;
    }
  }
}
