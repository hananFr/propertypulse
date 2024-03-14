import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email is already exsist'],
    required: [true, 'Email is required']
  },
  username: {
    type: String,
    required: [true, 'Email is reqquired']
  },
  image: {
    type: String
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    }
  ]
}, {
  timestamps: true
});

const User = models.User || model('User', UserSchema);

export default User;