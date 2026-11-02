'use client';

const logos = [
  "/images/home/partner/amazon.png",
  "/images/home/partner/comptia.png",
  "/images/home/partner/ec-council.png",
  "/images/home/partner/google.png",
  "/images/home/partner/isaca.png",
  "/images/home/partner/isc2.png",
  "/images/home/partner/microsoft.png",
  "/images/home/partner/pecb.png",
  "/images/home/partner/pmxs.png",
  "/images/home/partner/isc-2.png",
];

export default function OurClients() {
  return (
    <section className="relative pt-12 md:pt-18 pb-14 md:pb-20 bg-background overflow-hidden border-t border-border">

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 mb-6 md:mb-10 text-center">
        <span className="inline-flex items-center gap-3 text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-primary mb-4">
          <span className="w-8 h-[2px] bg-primary rounded-full" />
          Partners &amp; Clients
          <span className="w-8 h-[2px] bg-primary rounded-full" />
        </span>
        <h2 className="mb-0">
          Our Trusted{' '}
          <span className="text-primary">
            Clients
          </span>
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
        @media (prefers-reduced-motion: reduce) {
          .scrolling-track { animation: none; }
        }
      `}</style>

      <div className="relative flex overflow-x-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-48 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-48 after:bg-gradient-to-l after:from-background after:to-transparent">
        <div className="scrolling-track items-center py-4">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-none w-48 md:w-56 lg:w-64 flex justify-center items-center px-4"
            >
              <div className="w-full h-24 md:h-28 flex items-center justify-center bg-card rounded-2xl border border-border shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_14px_30px_-12px_rgba(46,97,87,0.3)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 px-6">
                <img
                  src={logo}
                  alt={`Client Logo ${(index % logos.length) + 1}`}
                  className="max-h-12 md:max-h-14 lg:max-h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}