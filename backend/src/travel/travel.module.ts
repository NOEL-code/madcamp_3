import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Travel, TravelSchema } from './Schemas/travel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
