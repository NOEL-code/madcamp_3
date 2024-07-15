import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelDto } from './dto/create-travel.dto';
import { Travel, TravelDocument } from './schemas/travel.schema';
import { DeleteResult } from 'mongodb';
import { GptService } from 'src/gpt/gpt.service';
import { Person, PersonDocument } from '../person/person.schema';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
    private readonly gptService: GptService,
    @InjectModel(Person.name) private personModel: Model<PersonDocument>
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<TravelDocument> {
    const createdTravel = new this.travelModel(createTravelDto);
    await createdTravel.save();

    const prompt = this.createGptPrompt(createdTravel);
    const gptResponse = await this.gptService.generateText(prompt);
    createdTravel.gptResponse = JSON.parse(gptResponse);

    return createdTravel.save();
  }

  private createGptPrompt(createdTravel: TravelDocument): string {
    return `I'm going to travel at ${createdTravel.month} to ${createdTravel.country} with ${createdTravel.totalPeople} people
    for ${createdTravel.duration} days with a ${createdTravel.budget} budget in a ${createdTravel.type} style of trip.
    Please provide a daily plan with a title that contains major theme and concept for each day with specific and famous places to go,
    and divide each day into morning, afternoon, and evening schedules. Please summarize the schedule of each time in one sentence.
    And give answer in JSON format.
    
    example of JSON format is 
    "dailyPlans": [
      {
        "day": 1,
        "title": "Relaxation and Nature Immersion"
        "morning": "Visit the famous Copacabana Beach for a peaceful walk along the shore.",
        "afternoon": "Explore the lush Tijuca National Park and take a refreshing dip in a waterfall.",
        "evening": "Enjoy a relaxing sunset yoga session on Ipanema Beach."
      },
      {
        "day": 2,
        "title" : "Cultural Exploration and Spiritual Renewal"
        "morning": "Explore the historic city center of Salvador, Bahia, visiting Pelourinho to admire colorful architecture.",
        "afternoon": "Visit the São Francisco Church and Convent of Salvador, known for its intricate golden interior",
        "evening": "Attend a traditional capoeira show to appreciate the rhythmic martial art and cultural significance of Brazil."
      }
    ]`;
  }

  async update(
    travelId: Types.ObjectId,
    updateData: Partial<TravelDocument>
  ): Promise<TravelDocument> {
    return this.travelModel
      .findByIdAndUpdate(travelId, updateData, { new: true })
      .exec();
  }

  async getTravel(travelId: Types.ObjectId): Promise<TravelDocument> {
    return this.travelModel.findById(travelId).exec();
  }

  async deleteTravel(travelId: Types.ObjectId): Promise<DeleteResult> {
    return this.travelModel.deleteOne({ _id: travelId }).exec();
  }

  async getTravels(): Promise<TravelDocument[]> {
    return this.travelModel.find().exec();
  }
}
