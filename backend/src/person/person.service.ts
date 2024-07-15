import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePersonDto } from '../travel/dto/create-person.dto';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonDocument> {
    const createdPerson = new this.personModel(createPersonDto);
    return createdPerson.save();
  }

  async getImages(travelId: string): Promise<Person[]> {
    const travelObjectId = new Types.ObjectId(travelId);
    return this.personModel.find({ travelId: travelObjectId }).exec();
  }

  async updatePersonTravelImages(
    personId: Types.ObjectId,
    imageUrl: string
  ): Promise<Person> {
    return this.personModel
      .findByIdAndUpdate(
        personId,
        { $push: { travelImage: imageUrl } },
        { new: true }
      )
      .exec();
  }
}
