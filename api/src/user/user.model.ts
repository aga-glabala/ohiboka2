import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

interface IUser extends mongoose.Document {
  email        : String,
  name        : String,
  password     : String,
  facebook_id : String,
  facebook_token: String,
  created: Date;

  generateHash(String);
  validPassword(String);
};

const UserSchema   = new mongoose.Schema({
  email        : String,
  name        : String,
  password     : String,
  facebook_id : String,
  facebook_token: String,
  created: { type: Date, default: Date.now }
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
