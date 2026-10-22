import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: "India" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: "Contact Us Page" }
  },
  { timestamps: true }
);

export default mongoose.models.ContactInquiry || mongoose.model("ContactInquiry", contactInquirySchema);