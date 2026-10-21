import mongoose from "mongoose";

const corporateInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: "India" },
    message: { type: String },
    inquiryType: { type: String, default: "Corporate" },
    source: { type: String, default: "Corporate Page" }
  },
  { timestamps: true }
);

export default mongoose.models.CorporateInquiry || mongoose.model("CorporateInquiry", corporateInquirySchema);