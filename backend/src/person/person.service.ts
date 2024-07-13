import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Person, PersonDocument } from './person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async create(person: any): Promise<Person> {
    const createdPerson = new this.personModel(person);
    return createdPerson.save();
  }

  async getImages(travelId: string): Promise<Person[]> {
    const travelObjectId = new Types.ObjectId(travelId);
    return this.personModel.find({ travelId: travelObjectId }).exec();
  }
}
