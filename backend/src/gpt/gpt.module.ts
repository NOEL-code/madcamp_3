import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { TravelModule } from '../travel/travel.module';

@Module({
  imports: [HttpModule, ConfigModule, forwardRef(() => TravelModule)],
  providers: [GptService],
  controllers: [GptController],
  exports: [GptService],
})
export class GptModule {}
