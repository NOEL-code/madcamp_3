import { S3Client } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const multerOptions = {
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, // 버킷 이름이 환경 변수에서 올바르게 설정되었는지 확인
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
};
