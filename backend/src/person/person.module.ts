import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person, PersonSchema } from './person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService], // 다른 모듈에서 사용하기 위해 export 추가
})
export class PersonModule {}
