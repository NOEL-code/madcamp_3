import * as multer from 'multer';

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        location: string; // S3에서 반환하는 URL
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        bucket: string;
        key: string;
        acl: string;
        contentType: string;
        contentDisposition: string;
        storageClass: string;
        serverSideEncryption: string;
        metadata: any;
      }
    }
  }
}

export {};
