import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

@Injectable()
export class ConfigService {
  private readonly configEnv: { [key: string]: string };

  constructor(filePath: string) {
    try {
      this.configEnv = dotenv.parse(fs.readFileSync(filePath));
    } catch {
      Logger.error(`File ${filePath} not found, app will use process.env`);
    }
  }

  get(key: string): string {
    if (this.configEnv) return this.configEnv[key];
    return process.env[key];
  }

  getInt(key: string): number {
    if (this.configEnv) return parseInt(this.configEnv[key], 10);
    return parseInt(process.env[key], 10);
  }

  getBoolean(key: string): boolean {
    if (this.configEnv) return this.configEnv[key] === 'true';
    return process.env[key] === 'true';
  }
}
