import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
//세 줄 추가요
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Travel, TravelDocument } from '../travel/schemas/travel.schema';

@Injectable()
export class GptService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService, @InjectModel(Travel.name) private readonly travelModel: Model<TravelDocument>,) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('API Key is not defined. Please check .env file.');
    }

    this.openai = new OpenAI({ apiKey });
  }

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500, //글자수 결정하는 곳
        temperature: 0.7,
        top_p: 1.0,
        n: 1,
        //stop: '\n',
      });

      console.log(response.choices[0].message.content);

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  //이 부분 추가: gptResponse에 추가하려고. 아 근데 text로 받아온 거 그냥 저장하는 거 아닌가? JSON 형식으로 받아오고 싶은 건데 ..
  //return response.choices[0].message.content.trim();가 어케 주나 봐야지!
  async generateAndSaveGptResponse(prompt: string): Promise<void> {
    try {
      const generatedText = await this.generateText(prompt);
      
      // Save the generated text to the gptResponse field of a Travel document
      const travel = new this.travelModel({ gptResponse: { text: generatedText } });
      await travel.save();
    } catch (error) {
      console.error('Failed to generate and save GPT response:', error);
      throw error;
    }
  }
}
