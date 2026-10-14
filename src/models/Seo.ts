import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
    unique: true
  },
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  focusKeyword: {
    type: String
  },
  ogImage: {
    type: String
  },
  ogImageAlt: {
    type: String
  },
  ogImageTitle: {
    type: String
  },
  schemaData: {
    type: String
  }
}, { timestamps: true });

export default mongoose.models.Seo || mongoose.model('Seo', seoSchema);