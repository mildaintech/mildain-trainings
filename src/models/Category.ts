import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  careerSupportPdf: {
    type: String
  },
  roles: [{
    roleName: { type: String },
    salaryInr: { type: String },
    salaryUsd: { type: String }
  }]
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);