import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('generate')
  async generate(@Body() body: { prompt: string }): Promise<string> {
    return this.gptService.generateText(body.prompt);
  }
}
