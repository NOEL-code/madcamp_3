import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GptService],
  controllers: [GptController],
  exports: [GptService],
})
export class GptModule {}
