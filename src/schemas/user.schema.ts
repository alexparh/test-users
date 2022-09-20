import { Schema, model } from 'mongoose';
import { UserRoleEnum } from '../enums/roles';
import * as bcrypt from 'bcrypt';

interface User {
  _id: string;
  name: string;
  password: string;
  role: UserRoleEnum;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {},
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  done();
});

const UserSchema = model<User>('User', userSchema);
export { User, UserSchema };
