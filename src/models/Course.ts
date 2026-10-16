import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    inrPrice: { type: Number, required: true },
    usdPrice: { type: Number, required: true },
    provider: { type: String },
    duration: { type: String },
    cohortStarts: { type: String },
    badge: { type: String },
    bannerImage: { type: String },
    logoImage: { type: String },
    heroTitle: { type: String },
    heroSubtitle: { type: String },
    heroSubtitleLines: [{ type: String }],
    heroBannerImage: { type: String },
    heroBannerAlt: { type: String },
    heroBannerTitle: { type: String },
    heroProviderLogo: { type: String },
    heroProviderLogoAlt: { type: String },
    heroProviderLogoTitle: { type: String },
    heroProviderLogoUrl: { type: String },
    heroButtons: [{
      label: { type: String },
      url: { type: String },
      style: { type: String, enum: ['primary', 'outline'] }
    }],
    quoteText: { type: String },
    quoteLinkText: { type: String },
    quoteLinkUrl: { type: String },
    cpeCredits: { type: Number },
    trustpilotRating: { type: Number },
    learnerCount: { type: Number },
    overviewHeading: { type: String },
    overviewDescription: { type: String },
    overviewKeyPoints: [{ type: String }],
    overviewSkillsCovered: [{ type: String }],
    overviewImage: { type: String },
    overviewImageAlt: { type: String },
    overviewImageTitle: { type: String },
    curriculumTitle: { type: String },
    curriculumDescription: { type: String },
    curriculumPdf: { type: String },
    curriculumModules: [{
      title: { type: String },
      contentHtml: { type: String },
      excelFile: { type: String }
    }],
    trainingOptionsHeading: { type: String },
    trainingOptionsSubHeading: { type: String },
    trainingCard1Image: { type: String },
    trainingCard1ImageAlt: { type: String },
    trainingCard1ImageTitle: { type: String },
    trainingCard1Title: { type: String },
    trainingCard1Description: { type: String },
    examHeading: { type: String },
    examSubHeading: { type: String },
    examFormat: { type: String },
    examDuration: { type: String },
    examQuestions: { type: String },
    examQuestionTypes: { type: String },
    examLanguages: { type: String },
    examCertificateImage: { type: String },
    examCertificateImageAlt: { type: String },
    examCertificateImageTitle: { type: String },
    examPassingScore: { type: String },
    examTotalScore: { type: String },
    examScoreDescription: { type: String },
    examGuaranteeTitle: { type: String },
    examGuaranteeSubtitle: { type: String },
    examGuaranteeFooter: { type: String },
    benefitsHeading: { type: String },
    benefitsDescription: { type: String },
    benefitsTabs: [{
      tabName: { type: String },
      salaryMinINR: { type: String },
      salaryAvgINR: { type: String },
      salaryMaxINR: { type: String },
      salaryMinUSD: { type: String },
      salaryAvgUSD: { type: String },
      salaryMaxUSD: { type: String },
      companies: [{
        name: { type: String },
        logo: { type: String },
        logoAlt: { type: String },
        logoTitle: { type: String }
      }],
      demandValue: { type: String },
      demandText: { type: String }
    }],

    toolsHeading: { type: String },
    toolsList: [{
      logo: { type: String },
      logoAlt: { type: String },
      logoTitle: { type: String }
    }],

    advisorHeading: { type: String },
    advisors: [{
      name: { type: String },
      description: { type: String },
      image: { type: String },
      imageAlt: { type: String },
      imageTitle: { type: String }
    }],
    careerSupportTitle: { type: String },
    careerSupportDescription: { type: String },
    careerSupportBrochurePdf: { type: String },
    careerSupportItems: [{
      title: { type: String },
      image: { type: String },
      imageAlt: { type: String },
      imageTitle: { type: String }
    }],
    successVideoImage: { type: String },
    successVideoImageAlt: { type: String },
    successVideoImageTitle: { type: String },
    successVideoUrl: { type: String },
    reviews: [{
      name: { type: String },
      role: { type: String },
      quote: { type: String },
      text: { type: String },
      image: { type: String },
      imageAlt: { type: String },
      imageTitle: { type: String },
      logo: { type: String },
      logoAlt: { type: String },
      logoTitle: { type: String }
    }],
    pathSalariesDescription: { type: String },
    selectedCategory: { type: String },
    
    roles: [{
      roleName: { type: String },
      salaryInr: { type: String },
      salaryUsd: { type: String }
    }],

    selectedPathRoles: [{
      roleName: { type: String },
      salaryInr: { type: String },
      salaryUsd: { type: String }
    }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    focusKeyword: { type: String },
    schemaData: { type: String },
    ogImage: { type: String },
    ogImageAlt: { type: String },
    ogImageTitle: { type: String },

    faqHeading: { type: String },
    faqs: [{
      question: { type: String },
      description: { type: String },
      bulletPoints: [{
        text: { type: String },
        linkText: { type: String },
        linkUrl: { type: String }
      }]
    }]
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);