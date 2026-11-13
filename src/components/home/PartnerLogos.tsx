'use client';

const logos = [
  "/images/home/partner/amazon.png",
  "/images/home/partner/comptia.png",
  "/images/home/partner/google.png",
  "/images/home/partner/isaca.png",
  "/images/home/partner/isc2.png",
  "/images/home/partner/pmi.png",
  "/images/home/partner/redhat.png",
  "/images/home/partner/isc2.png",
];

export default function PartnerLogos() {
  return (
    <section className="pt-10 md:pt-12 pb-4 md:pb-6 bg-white overflow-hidden border-t border-border">
      
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <h2 className="text-center text-xl md:text-2xl font-semibold text-foreground tracking-wide">
          Building Careers With Global Academic and Industry Leaders
        </h2>
      </div>
      
      <style>{`
        @keyframes custom-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrolling-track {
          display: flex;
          width: max-content;
          animation: custom-scroll 35s linear infinite;
        }
        .scrolling-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex overflow-x-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 md:before:w-40 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 md:after:w-40 after:bg-gradient-to-l after:from-white after:to-transparent">
        <div className="scrolling-track items-center">
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              className="flex-none w-36 md:w-44 lg:w-52 flex justify-center items-center px-2"
            >
              <img
                src={logo}
                alt={`Partner Logo ${index + 1}`}
                className="max-h-16 md:max-h-20 lg:max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}