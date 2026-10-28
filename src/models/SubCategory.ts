import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, default: "" },
  logoImage: { type: String, default: "" },
  curriculumTitle: { type: String, default: "" },
  curriculumDescription: { type: String, default: "" },
  curriculumModules: [{ title: { type: String }, contentHtml: { type: String } }],
  curriculumPdf: { type: String, default: "" },
  toolsHeading: { type: String, default: "" },
  toolsList: [{ logo: { type: String }, logoAlt: { type: String }, logoTitle: { type: String } }],
  careerSupportTitle: { type: String, default: "" },
  careerSupportDescription: { type: String, default: "" },
  careerSupportBrochurePdf: { type: String, default: "" },
  careerSupportBgImage: { type: String, default: "" },
  careerSupportItems: [{ title: { type: String }, image: { type: String }, imageAlt: { type: String }, imageTitle: { type: String } }],
  advisorHeading: { type: String, default: "" },
  advisors: [{ name: { type: String }, role: { type: String }, description: { type: String }, image: { type: String }, imageAlt: { type: String }, imageTitle: { type: String } }],
  successVideoUrl: { type: String, default: "" },
  successVideoImage: { type: String, default: "" },
  successVideoImageAlt: { type: String, default: "" },
  successVideoImageTitle: { type: String, default: "" },
  reviews: [{ name: { type: String }, role: { type: String }, quote: { type: String }, text: { type: String }, image: { type: String }, imageAlt: { type: String }, imageTitle: { type: String }, logo: { type: String }, logoAlt: { type: String }, logoTitle: { type: String } }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

if (mongoose.models.SubCategory) {
  delete mongoose.models.SubCategory;
}

export default mongoose.model('SubCategory', subCategorySchema);