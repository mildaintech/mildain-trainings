import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountPercent: { type: Number, required: true },
  bannerTitle: { type: String, required: true },
  bannerSubtext: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  themeType: { type: String, default: 'default' }
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);