export const generateOrganizationSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mildain Trainings",
    "url": "https://www.mildaintrainings.com",
    "logo": "https://www.mildaintrainings.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/mildaintrainings",
      "https://www.linkedin.com/company/mildaintrainings"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "customer service"
    }
  });
};

export const generateCourseProductSchema = (course: any, currentPath: string, isIndia: boolean) => {
  if (!course) return null;
  
  const amount = isIndia ? (course.inrPrice || 0) : (course.usdPrice || 0);
  const currency = isIndia ? "INR" : "USD";

  return JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": course.title,
    "image": course.bannerImage || "",
    "description": course.metaDescription || course.overviewDescription || "",
    "brand": {
      "@type": "Brand",
      "name": "Mildain Trainings"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.mildaintrainings.com${currentPath}`,
      "priceCurrency": currency,
      "price": amount.toString(),
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.trustpilotRating || "4.8",
      "ratingCount": course.learnerCount || "1250"
    }
  });
};