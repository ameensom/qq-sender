import mongoose from 'mongoose';
const { Schema } = mongoose;

const whatsappConversationsSchema = new Schema({
  ticketNumber: { type: String },
  ticketStatus: { type: String },
  phone: { type: String },
  status: { type: String, enum: ['open', 'sent', 'closed'], default: 'open' },
  ticketCreatedAt: { type: Date },
  lastSentAt: { type: Date },
  ticketCreator: { email: { type: String }, id: { type: String } }
}, { timestamps: true });

whatsappConversationsSchema.index({ phone: 1 });

export default mongoose.model('WhatsappConversation', whatsappConversationsSchema);