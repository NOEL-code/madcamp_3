import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTravelDto } from './dto/create-travel.dto';
import { Travel, TravelDocument } from './Schemas/travel.schema';
import { DeleteResult } from 'mongodb';
import { GptService } from 'src/gpt/gpt.service';

@Injectable()
export class TravelService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<TravelDocument>,
    private readonly gptService: GptService,
  ) {}

  async create(createTravelDto: CreateTravelDto): Promise<Travel> {
    const createdTravel = new this.travelModel(createTravelDto);
    await createdTravel.save();

    //Travel 정보 기반으로 GPT 프롬프트를 생성할 거야
    const prompt = this.createGptPrompt(createdTravel);

    //GPT 서비스 호출
    const gptResponse = await this.gptService.generateText(prompt);

    // GPT 응답을 Travel 객체에 추가
    createdTravel.gptResponse = JSON.parse(gptResponse);
    return createdTravel.save();
  }

  private createGptPrompt(createdTravel: Travel): string {
    return `I'm going to travel at ${createdTravel.month} to ${createdTravel.country} with ${createdTravel.totalPeople} people
    for ${createdTravel.duration} days with a ${createdTravel.budget} budget in a ${createdTravel.type} style of trip.
    Please provide a daily plan with a title of major theme and concept for each day with specific and famous places to go,
    and divide each day into morning, afternoon, and evening schedules. Please summarize the schedule of each time in one sentence.
    And give answer in JSON format.`;
  }

  async update(
    travelId: Types.ObjectId,
    updateData: Partial<Travel>,
  ): Promise<Travel> {
    return this.travelModel
      .findByIdAndUpdate(travelId, updateData, { new: true })
      .exec();
  }

  async getTravel(
    travelId: Types.ObjectId,
  ): Promise<Travel> {
    return this.travelModel.findById(travelId).exec();
  }

  async deleteTravel(
    travelId: Types.ObjectId,
  ): Promise<DeleteResult> {
    return this.travelModel.deleteOne({_id: travelId}).exec();
  }

  async getTravels() {
    return await this.travelModel.find().exec();
  }
}
