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
    <section className="relative pt-16 md:pt-24 pb-14 md:pb-20 bg-gradient-to-b from-[#f7faf8] to-white overflow-hidden border-t border-gray-100">

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 mb-12 md:mb-16 text-center">
        <span className="inline-flex items-center gap-3 text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#0AA34F] mb-4">
          <span className="w-8 h-[2px] bg-[#0AA34F] rounded-full" />
          Partners &amp; Clients
          <span className="w-8 h-[2px] bg-[#0AA34F] rounded-full" />
        </span>
        <h2 className="text-[32px] md:text-[42px] lg:text-[50px] font-extrabold text-[#0b1220] tracking-tight leading-tight">
          Our Trusted{' '}
          <span className="bg-gradient-to-r from-[#0AA34F] to-[#16c96b] bg-clip-text text-transparent">
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

      <div className="relative flex overflow-x-hidden w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-48 before:bg-gradient-to-r before:from-[#f9fbfa] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-48 after:bg-gradient-to-l after:from-[#f9fbfa] after:to-transparent">
        <div className="scrolling-track items-center py-4">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-none w-48 md:w-56 lg:w-64 flex justify-center items-center px-4"
            >
              <div className="w-full h-24 md:h-28 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_14px_30px_-12px_rgba(10,163,79,0.3)] hover:border-[#0AA34F]/30 hover:-translate-y-1 transition-all duration-300 px-6">
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