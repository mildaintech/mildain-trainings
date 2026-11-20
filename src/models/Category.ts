// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   careerSupportPdf: {
//     type: String
//   },
//   roles: [{
//     roleName: { type: String },
//     salaryInr: { type: String },
//     salaryUsd: { type: String }
//   }]
// }, { timestamps: true });

// export default mongoose.models.Category || mongoose.model('Category', categorySchema);



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
  }]
}, { timestamps: true });

if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model('Category', categorySchema);