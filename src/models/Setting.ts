import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  exchangeRate: {
    type: Number,
    required: true,
    default: 90
  }
}, { timestamps: true });

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
export default Setting;