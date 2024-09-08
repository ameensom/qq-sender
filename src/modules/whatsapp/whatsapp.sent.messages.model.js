import mongoose from 'mongoose';
const { Schema } = mongoose;

const whatsappSentMessagesSchema = new Schema({

  messaging_product: { type: String },
  contacts: [{
    input: { type: String },
    wa_id: { type: String }
  }],
  messages: [{
    id: { type: String }
  }],
  status: { type: String, enum: ['pending', 'sent', 'read', 'delivered', 'undelivered', 'failed'], default: 'pending' },
  userId: { type: String, default: '' },
  awaitingVINResponse: { type: Boolean, default: false },
  directOrderCustomId: { type: String, default: '' }
}, { timestamps: true });


export default mongoose.model('WhatsappSentMessage', whatsappSentMessagesSchema);