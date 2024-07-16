import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Travel, TravelDocument } from '../travel/schemas/travel.schema';

@Injectable()
export class GptService {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Travel.name)
    private readonly travelModel: Model<TravelDocument>
  ) {
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
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1.0,
        n: 1,
      });

      const generatedText = response.choices[0].message.content.trim();
      console.log(generatedText);
      return generatedText;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  async generateAndSaveGptResponse(
    travelId: string,
    prompt: string
  ): Promise<void> {
    try {
      const generatedText = await this.generateText(prompt);

      // Parse the generated text as JSON if it is in JSON format
      let gptResponse;
      try {
        gptResponse = JSON.parse(generatedText);
      } catch (error) {
        throw new BadRequestException('Generated text is not valid JSON');
      }

      // Update the existing Travel document with the generated GPT response
      const travel = await this.travelModel.findById(travelId);
      if (!travel) {
        throw new BadRequestException('Travel not found');
      }

      travel.gptResponse = gptResponse;
      await travel.save();
    } catch (error) {
      console.error('Failed to generate and save GPT response:', error);
      throw error;
    }
  }
}
