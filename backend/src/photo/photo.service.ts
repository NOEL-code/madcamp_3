import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NoMatchPhoto, NoMatchPhotoDocument } from './noMatchPhoto.schema';
import axios from 'axios';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(NoMatchPhoto.name)
    private noMatchPhotoModel: Model<NoMatchPhotoDocument>
  ) {}

  async verifyImage(
    profileImage: string,
    travelImage: string
  ): Promise<boolean> {
    try {
      console.log('인증 시작');
      const response = await axios.post('http://192.249.29.5:5005/verify', {
        img1_path: profileImage,
        img2_path: travelImage,
      });
      console.log('DeepFace response:', response.data);
      return response.data.verified;
    } catch (error) {
      console.error(
        'Error verifying image:',
        error.response ? error.response.data : error.message
      );
      return false;
    }
  }

  async saveNoMatchPhoto(
    travelId: Types.ObjectId,
    travelImage: string
  ): Promise<NoMatchPhoto> {
    const noMatchPhoto = new this.noMatchPhotoModel({ travelId, travelImage });
    return noMatchPhoto.save(); // createdAt will be automatically set by Mongoose
  }

  async findNoMatchPhotosByTravelId(travelId: string): Promise<NoMatchPhoto[]> {
    return this.noMatchPhotoModel.find({ travelId }).exec();
  }
}
