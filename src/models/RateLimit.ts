import mongoose, { Schema, Document } from 'mongoose';

export interface IRateLimit extends Document {
  ip: string;
  count: number;
  createdAt: Date;
}

const RateLimitSchema = new Schema<IRateLimit>({
  ip: { type: String, required: true, unique: true, index: true },
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export default mongoose.models.RateLimit ||
  mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);