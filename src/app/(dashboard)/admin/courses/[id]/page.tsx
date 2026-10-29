"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, FileText, Layout, List, BookOpen, HelpCircle, DollarSign, Award, Wrench, Users, Briefcase, Star, TrendingUp, Globe } from "lucide-react";
import BasicInfoTab from "./components/BasicInfoTab";
import HeroSectionTab from "./components/HeroSectionTab";
import OverviewTab from "./components/OverviewTab";
import CurriculumTab from "./components/CurriculumTab";
import TrainingOptionsTab from "./components/TrainingOptionsTab";
import ExamDetailsTab from "./components/ExamDetailsTab";
import BenefitsTab from "./components/BenefitsTab";
import ToolsTab from "./components/ToolsTab";
import FaqTab from "./components/FaqTab";
import AdvisorTab from "./components/AdvisorTab";
import CareerSupportTab from "./components/CareerSupportTab";
import ReviewsTab from "./components/ReviewsTab";
import PathSalariesTab from "./components/PathSalariesTab";
import SeoTab from "./components/SeoTab";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    subcategory: "",
    inrPrice: "",
    usdPrice: "",
    provider: "",
    duration: "",
    cohortStarts: "",
    badge: "",
    bannerImage: "",
    logoImage: "",
    heroTitle: "",
    heroSubtitle: "",
    cpeCredits: "",
    learnerCount: "",
    trustpilotRating: "",
    heroBannerImage: "",
    heroBannerAlt: "",
    heroBannerTitle: "",
    heroProviderLogo: "",
    heroProviderLogoAlt: "",
    heroProviderLogoTitle: "",
    heroProviderLogoUrl: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    schemaData: "",
    quoteText: "",
    quoteLinkText: "",
    quoteLinkUrl: "",
    heroSubtitleLines: [] as string[],
    heroButtons: [] as any[],
    overviewHeading: "",
    overviewDescription: "",
    overviewKeyPoints: [] as string[],
    overviewSkillsCovered: [] as string[],
    overviewImage: "",
    overviewImageAlt: "",
    overviewImageTitle: "",
    curriculumTitle: "",
    curriculumDescription: "",
    curriculumPdf: "",
    curriculumModules: [] as any[],
    trainingOptionsHeading: "",
    trainingOptionsSubHeading: "",
    trainingCard1Image: "",
    trainingCard1ImageAlt: "",
    trainingCard1ImageTitle: "",
    trainingCard1Title: "",
    trainingCard1Description: "",
    examHeading: "",
    examSubHeading: "",
    examFormat: "",
    examDuration: "",
    examQuestions: "",
    examQuestionTypes: "",
    examLanguages: "",
    examCertificateImage: "",
    examCertificateImageAlt: "",
    examCertificateImageTitle: "",
    examPassingScore: "",
    examTotalScore: "",
    examScoreDescription: "",
    examGuaranteeTitle: "",
    examGuaranteeSubtitle: "",
    examGuaranteeFooter: "",
    benefitsHeading: "",
    benefitsDescription: "",
    benefitsTabs: [] as any[],
    toolsHeading: "",
    toolsList: [] as any[],
    advisorHeading: "",
    advisors: [] as any[],
    careerSupportTitle: "",
    careerSupportDescription: "",
    careerSupportBrochurePdf: "",
    careerSupportItems: [] as any[],
    successVideoImage: "",
    successVideoImageAlt: "",
    successVideoImageTitle: "",
    successVideoUrl: "",
    reviews: [] as any[],
    faqHeading: "",
    faqs: [] as any[],
    pathSalariesDescription: "",
    selectedCategory: "",
    roles: "",
    selectedPathRoles: [] as any[],
    ogImage: "",
    ogImageAlt: "",
    ogImageTitle: "",
  });

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/admin/courses/${courseId}`);
        const data = await res.json();
        
        if (res.ok) {
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            category: data.category || "",
            subcategory: data.subcategory || "",
            inrPrice: data.inrPrice || "",
            usdPrice: data.usdPrice || "",
            provider: data.provider || "",
            duration: data.duration || "",
            cohortStarts: data.cohortStarts || "",
            badge: data.badge || "",
            bannerImage: data.bannerImage || "",
            logoImage: data.logoImage || data.image || "",
            heroTitle: data.heroTitle || "",
            heroSubtitle: data.heroSubtitle || "",
            cpeCredits: data.cpeCredits || "",
            learnerCount: data.learnerCount || "",
            trustpilotRating: data.trustpilotRating || "",
            heroBannerImage: data.heroBannerImage || "",
            heroBannerAlt: data.heroBannerAlt || "",
            heroBannerTitle: data.heroBannerTitle || "",
            heroProviderLogo: data.heroProviderLogo || "",
            heroProviderLogoAlt: data.heroProviderLogoAlt || "",
            heroProviderLogoTitle: data.heroProviderLogoTitle || "",
            heroProviderLogoUrl: data.heroProviderLogoUrl || "",
            metaTitle: data.metaTitle || "",
            metaDescription: data.metaDescription || "",
            focusKeyword: data.focusKeyword || "",
            schemaData: data.schemaData || "",
            quoteText: data.quoteText || "",
            quoteLinkText: data.quoteLinkText || "",
            quoteLinkUrl: data.quoteLinkUrl || "",
            heroSubtitleLines: data.heroSubtitleLines || [],
            heroButtons: data.heroButtons || [],
            overviewHeading: data.overviewHeading || "",
            overviewDescription: data.overviewDescription || "",
            overviewKeyPoints: data.overviewKeyPoints || [],
            overviewSkillsCovered: data.overviewSkillsCovered || [],
            overviewImage: data.overviewImage || "",
            overviewImageAlt: data.overviewImageAlt || "",
            overviewImageTitle: data.overviewImageTitle || "",
            curriculumTitle: data.curriculumTitle || "",
            curriculumDescription: data.curriculumDescription || "",
            curriculumPdf: data.curriculumPdf || "",
            curriculumModules: data.curriculumModules || [],
            trainingOptionsHeading: data.trainingOptionsHeading || "",
            trainingOptionsSubHeading: data.trainingOptionsSubHeading || "",
            trainingCard1Image: data.trainingCard1Image || "",
            trainingCard1ImageAlt: data.trainingCard1ImageAlt || "",
            trainingCard1ImageTitle: data.trainingCard1ImageTitle || "",
            trainingCard1Title: data.trainingCard1Title || "",
            trainingCard1Description: data.trainingCard1Description || "",
            examHeading: data.examHeading || "",
            examSubHeading: data.examSubHeading || "",
            examFormat: data.examFormat || "",
            examDuration: data.examDuration || "",
            examQuestions: data.examQuestions || "",
            examQuestionTypes: data.examQuestionTypes || "",
            examLanguages: data.examLanguages || "",
            examCertificateImage: data.examCertificateImage || "",
            examCertificateImageAlt: data.examCertificateImageAlt || "",
            examCertificateImageTitle: data.examCertificateImageTitle || "",
            examPassingScore: data.examPassingScore || "",
            examTotalScore: data.examTotalScore || "",
            examScoreDescription: data.examScoreDescription || "",
            examGuaranteeTitle: data.examGuaranteeTitle || "",
            examGuaranteeSubtitle: data.examGuaranteeSubtitle || "",
            examGuaranteeFooter: data.examGuaranteeFooter || "",
            benefitsHeading: data.benefitsHeading || "",
            benefitsDescription: data.benefitsDescription || "",
            benefitsTabs: data.benefitsTabs || [],
            toolsHeading: data.toolsHeading || "",
            toolsList: data.toolsList || [],
            advisorHeading: data.advisorHeading || "",
            advisors: data.advisors || [],
            careerSupportTitle: data.careerSupportTitle || "",
            careerSupportDescription: data.careerSupportDescription || "",
            careerSupportBrochurePdf: data.careerSupportBrochurePdf || "",
            careerSupportItems: data.careerSupportItems || [],
            successVideoImage: data.successVideoImage || "",
            successVideoImageAlt: data.successVideoImageAlt || "",
            successVideoImageTitle: data.successVideoImageTitle || "",
            successVideoUrl: data.successVideoUrl || "",
            reviews: data.reviews || [],
            faqHeading: data.faqHeading || "",
            faqs: data.faqs || [],
            pathSalariesDescription: data.pathSalariesDescription || "",
            selectedCategory: data.selectedCategory || "",
            roles: data.roles || "",
            selectedPathRoles: data.selectedPathRoles || [],
            ogImage: data.ogImage || "",
            ogImageAlt: data.ogImageAlt || "",
            ogImageTitle: data.ogImageTitle || "",
          });
        }
      } catch (err) {
        setError("Failed to load course data");
      } finally {
        setFetching(false);
      }
    }
    
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData, 
          subcategory: formData.subcategory,
          inrPrice: Number(formData.inrPrice),
          usdPrice: Number(formData.usdPrice),
          cpeCredits: formData.cpeCredits ? Number(formData.cpeCredits) : undefined,
          learnerCount: formData.learnerCount ? Number(formData.learnerCount) : undefined,
          trustpilotRating: formData.trustpilotRating ? Number(formData.trustpilotRating) : undefined,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          focusKeyword: formData.focusKeyword,
          schemaData: formData.schemaData,
          heroTitle: formData.heroTitle,
          heroSubtitle: formData.heroSubtitle,
          heroSubtitleLines: formData.heroSubtitleLines,
          heroButtons: formData.heroButtons,
          quoteText: formData.quoteText,
          quoteLinkText: formData.quoteLinkText,
          quoteLinkUrl: formData.quoteLinkUrl,
          heroBannerImage: formData.heroBannerImage,
          heroBannerAlt: formData.heroBannerAlt,
          heroBannerTitle: formData.heroBannerTitle,
          heroProviderLogo: formData.heroProviderLogo,
          heroProviderLogoAlt: formData.heroProviderLogoAlt,
          heroProviderLogoTitle: formData.heroProviderLogoTitle,
          heroProviderLogoUrl: formData.heroProviderLogoUrl,
          overviewHeading: formData.overviewHeading,
          overviewDescription: formData.overviewDescription,
          overviewKeyPoints: formData.overviewKeyPoints,
          overviewSkillsCovered: formData.overviewSkillsCovered,
          overviewImage: formData.overviewImage,
          overviewImageAlt: formData.overviewImageAlt,
          overviewImageTitle: formData.overviewImageTitle,
          curriculumTitle: formData.curriculumTitle,
          curriculumDescription: formData.curriculumDescription,
          curriculumPdf: formData.curriculumPdf,
          curriculumModules: formData.curriculumModules,
          trainingOptionsHeading: formData.trainingOptionsHeading,
          trainingOptionsSubHeading: formData.trainingOptionsSubHeading,
          trainingCard1Image: formData.trainingCard1Image,
          trainingCard1ImageAlt: formData.trainingCard1ImageAlt,
          trainingCard1ImageTitle: formData.trainingCard1ImageTitle,
          trainingCard1Title: formData.trainingCard1Title,
          trainingCard1Description: formData.trainingCard1Description,
          examHeading: formData.examHeading,
          examSubHeading: formData.examSubHeading,
          examFormat: formData.examFormat,
          examDuration: formData.examDuration,
          examQuestions: formData.examQuestions,
          examQuestionTypes: formData.examQuestionTypes,
          examLanguages: formData.examLanguages,
          examCertificateImage: formData.examCertificateImage,
          examCertificateImageAlt: formData.examCertificateImageAlt,
          examCertificateImageTitle: formData.examCertificateImageTitle,
          examPassingScore: formData.examPassingScore,
          examTotalScore: formData.examTotalScore,
          examScoreDescription: formData.examScoreDescription,
          examGuaranteeTitle: formData.examGuaranteeTitle,
          examGuaranteeSubtitle: formData.examGuaranteeSubtitle,
          examGuaranteeFooter: formData.examGuaranteeFooter,
          benefitsHeading: formData.benefitsHeading,
          benefitsDescription: formData.benefitsDescription,
          benefitsTabs: formData.benefitsTabs,
          toolsHeading: formData.toolsHeading,
          toolsList: formData.toolsList,
          advisorHeading: formData.advisorHeading,
          advisors: formData.advisors,
          careerSupportTitle: formData.careerSupportTitle,
          careerSupportDescription: formData.careerSupportDescription,
          careerSupportBrochurePdf: formData.careerSupportBrochurePdf,
          careerSupportItems: formData.careerSupportItems,
          successVideoImage: formData.successVideoImage,
          successVideoImageAlt: formData.successVideoImageAlt,
          successVideoImageTitle: formData.successVideoImageTitle,
          successVideoUrl: formData.successVideoUrl,
          reviews: formData.reviews,
          faqHeading: formData.faqHeading,
          faqs: formData.faqs,
          pathSalariesDescription: formData.pathSalariesDescription,
          selectedCategory: formData.selectedCategory,
          roles: formData.roles,
          selectedPathRoles: formData.selectedPathRoles,
          ogImage: formData.ogImage,
          ogImageAlt: formData.ogImageAlt,
          ogImageTitle: formData.ogImageTitle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update course");
      }

      router.push("/admin/courses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="flex justify-center py-20 text-gray-500 font-medium">Loading course data...</div>;
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: FileText },
    { id: "seo", label: "SEO Details", icon: Globe },
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "overview", label: "Overview", icon: List },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "options", label: "Training Options", icon: DollarSign },
    { id: "exam", label: "Exam Details", icon: Award },
    { id: "benefits", label: "Benefits & Roles", icon: FileText },
    { id: "tools", label: "Tools Covered", icon: Wrench },
    { id: "advisors", label: "Course Advisors", icon: Users },
    { id: "careerSupport", label: "Career Support", icon: Briefcase },
    { id: "pathSalaries", label: "Path & Salaries", icon: TrendingUp },
    { id: "reviews", label: "Student Reviews", icon: Star },
    { id: "faqs", label: "FAQs & Reviews", icon: HelpCircle },
  ];

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/courses"
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors border border-transparent hover:border-gray-200"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Course</h1>
            <p className="text-gray-500 text-[13px] font-medium">{formData.title}</p>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-sm font-bold transition-all shadow-sm flex items-center gap-2 text-[13px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm flex items-center gap-2 text-[13px] font-medium">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="w-full md:w-64 flex flex-col gap-1.5 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold rounded-sm transition-all text-left ${
                activeTab === tab.id 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

<div className="flex-1 min-h-[500px]">
          {activeTab === "basic" && <BasicInfoTab formData={formData} setFormData={setFormData} setError={setError} />}
          {activeTab === "seo" && <SeoTab formData={formData} setFormData={setFormData} />}
          {activeTab === "hero" && <HeroSectionTab formData={formData} setFormData={setFormData} />}
          {activeTab === "overview" && <OverviewTab formData={formData} setFormData={setFormData} />}
          {activeTab === "curriculum" && <CurriculumTab formData={formData} />}
          {activeTab === "options" && <TrainingOptionsTab formData={formData} setFormData={setFormData} />}
          {activeTab === "exam" && <ExamDetailsTab formData={formData} setFormData={setFormData} />}
          {activeTab === "benefits" && <BenefitsTab formData={formData} setFormData={setFormData} />}
          {activeTab === "tools" && <ToolsTab formData={formData} />}
          {activeTab === "advisors" && <AdvisorTab formData={formData} />}
          {activeTab === "careerSupport" && <CareerSupportTab formData={formData} />}        
          {/* {activeTab === "pathSalaries" && <PathSalariesTab formData={formData} setFormData={setFormData} />} */}
          {activeTab === "pathSalaries" && <PathSalariesTab formData={formData} />}
          {/* {activeTab === "reviews" && <ReviewsTab formData={formData} setFormData={setFormData} />} */}
          {activeTab === "reviews" && <ReviewsTab formData={formData} />}
          {activeTab === "faqs" && <FaqTab formData={formData} setFormData={setFormData} />}
        </div>
      </div>
    </div>
  );
}