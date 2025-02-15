import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    text: String,
    receiver: String,
    sender: String
  });
export const Message = mongoose.model('User', MessageSchema);
