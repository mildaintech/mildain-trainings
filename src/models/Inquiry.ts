import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);