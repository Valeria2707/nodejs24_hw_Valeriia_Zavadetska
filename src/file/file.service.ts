import { Injectable } from '@nestjs/common';
import { MAX_FILE_SIZE } from './constants/file.constants';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {
    if (file.size <= MAX_FILE_SIZE) {
      return { message: 'File uploaded successfully', file };
    } else {
      const uploadDir = join(process.cwd(), 'uploads');

      const destinationFilePath = join(uploadDir, file.filename);

      const readableStream = new Stream.Readable({
        read() {
          this.push(file.buffer);
          this.push(null);
        },
      });

      const writableStream = createWriteStream(destinationFilePath);

      return new Promise((resolve, reject) => {
        readableStream.pipe(writableStream);

        writableStream.on('finish', () => {
          console.log('File upload completed.');
          resolve({
            message: 'File uploaded successfully as a stream',
            file,
          });
        });

        writableStream.on('error', (err) => {
          console.error('Error writing file:', err);
          reject({ message: 'Error uploading file' });
        });
      });
    }
  }
}
