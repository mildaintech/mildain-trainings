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
  displayOrder: {
    type: Number,
    default: 999
  },
  careerSupportPdf: {
    type: String
  },
  roles: [{
    roleName: { type: String },
    salaryInr: { type: String },
    salaryUsd: { type: String }
  }],
  headerTitle: {
    type: String,
    default: ''
  },
  headerSubtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  bannerImage: {
    type: String,
    default: ''
  },
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  focusKeyword: {
    type: String,
    default: ''
  },
  ogImage: {
    type: String,
    default: ''
  },
  ogImageAlt: {
    type: String,
    default: ''
  },
  ogImageTitle: {
    type: String,
    default: ''
  },
  schemaData: {
    type: String,
    default: ''
  }
}, { timestamps: true });

if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model('Category', categorySchema);