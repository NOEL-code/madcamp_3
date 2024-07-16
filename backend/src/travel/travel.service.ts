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

  async create(
    createTravelDto: CreateTravelDto,
    files: any[]
  ): Promise<TravelDocument> {
    const { people, ...otherDto } = createTravelDto;
    const createdTravel = new this.travelModel(otherDto);
    await createdTravel.save();

    const personPromises = people.map(async (person, index) => {
      const file = files.find(
        (f) => f.fieldname === `people[${index}][profileImage]`
      );
      if (!file || !file.location) {
        throw new Error(`Profile image for person ${index} is missing`);
      }
      person.profileImage = file.location;
      person.travelId = new Types.ObjectId(createdTravel._id.toString()); // Ensure travelId is an ObjectId
      return new this.personModel(person).save();
    });

    const persons = await Promise.all(personPromises);
    createdTravel.people = persons.map((person) => person._id);
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
        "title": "Relaxation and Nature Immersion",
        "morning": "Visit the famous Copacabana Beach for a peaceful walk along the shore.",
        "afternoon": "Explore the lush Tijuca National Park and take a refreshing dip in a waterfall.",
        "evening": "Enjoy a relaxing sunset yoga session on Ipanema Beach."
      },
      {
        "day": 2,
        "title" : "Cultural Exploration and Spiritual Renewal",
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

  async updatePersonTravelImages(
    personId: Types.ObjectId,
    imageUrl: string
  ): Promise<PersonDocument> {
    const travelImage = { url: imageUrl, createdAt: new Date() };
    return this.personModel
      .findByIdAndUpdate(
        personId,
        { $push: { travelImage: travelImage } },
        { new: true }
      )
      .exec();
  }
}
