import { Document } from 'mongoose';
export interface User extends Document {
	name : string;
	email: string;
	phoneNumber: string;
	password: string;
}
