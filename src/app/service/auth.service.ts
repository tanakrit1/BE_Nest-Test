import { Injectable } from "@nestjs/common";
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
    hashPassword(password: string): string {
    const hash = crypto
      .createHmac('sha256', process.env.APP_PASSWORD_KEY)
      .update(password)
      .digest('hex');
    return hash;
  }
}