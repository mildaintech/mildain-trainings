import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthRateLimit extends Document {
  key: string;
  count: number;
  expiresAt: Date;
}

const AuthRateLimitSchema = new Schema<IAuthRateLimit>({
  key: { type: String, required: true, unique: true, index: true },
  count: { type: Number, default: 1 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.AuthRateLimit ||
  mongoose.model<IAuthRateLimit>('AuthRateLimit', AuthRateLimitSchema);