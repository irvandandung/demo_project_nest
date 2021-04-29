import { Document } from 'mongoose';

const nameAdminEntity = 'Admin';

interface Admin extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  password: string;
  readonly dateOfBirth: Date;
  readonly status: {
    suspended: boolean;
    emailVerifiedAt: Date;
    phoneNumberVerifiedAt: Date;
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export { nameAdminEntity, Admin };
