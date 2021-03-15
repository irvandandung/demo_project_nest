import { Document } from 'mongoose';

const authNameEntity = 'Auth';
interface Auth extends Document {
  token: string;
  email: string;
}

export { authNameEntity, Auth }