import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    name: {
      type: String,
      ref: 'Property.name'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number required']
  },
  body: {
    type: String
  },

  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Message = models.Message || model('Message', MessageSchema);

export default Message;