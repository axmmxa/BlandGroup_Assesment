import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStart(): string {
    return 'BlandGroup Q4 by Alexander Much';
  }
}
