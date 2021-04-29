import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from './../interface/admin.interface';

export const AdminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    dateOfBirth: { type: Date, default: null },
    status: {
      suspended: { type: Boolean, default: false },
      emailVerifiedAt: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  },
);

AdminSchema.pre<Admin>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;

  if (!admin.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) return next(err);
      admin.password = hash;
      next();
    });
  });
});
