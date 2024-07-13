import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelDto } from './dto/create-travel.dto';
import { Travel, TravelDocument } from './Schemas/travel.schema';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    const createdTravel = new this.travelModel(createTravelDto);
    return createdTravel.save();
  }

  async update(
    travelId: Types.ObjectId,
    updateData: Partial<Travel>,
  ): Promise<Travel> {
    return this.travelModel
      .findByIdAndUpdate(travelId, updateData, { new: true })
      .exec();
  }
}
