import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllUsers(): string {
    return 'Get all users';
  }
}
