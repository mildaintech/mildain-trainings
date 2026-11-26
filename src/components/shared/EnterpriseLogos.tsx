'use client';

import React from 'react';

const enterprises = [
  { id: 1, name: "Wipro", logo: "/images/hiring-companies/wipro.png", scale: 1.5 },
  { id: 2, name: "KPMG", logo: "/images/hiring-companies/kpmg.png", scale: 1.5 },
  { id: 3, name: "Navisite", logo: "/images/hiring-companies/navisite.png", scale: 1.5 },
  { id: 4, name: "Myntra", logo: "/images/hiring-companies/myntra.png", scale: 1.5 },
  { id: 5, name: "Home Credit", logo: "/images/hiring-companies/home-credit.png", scale: 1.5 },
  { id: 6, name: "Mahindra", logo: "/images/hiring-companies/mahindra.png", scale: 1.5 },
  { id: 7, name: "Unisys", logo: "/images/hiring-companies/unisys.png", scale: 1.5 },
  { id: 8, name: "Capgemini", logo: "/images/hiring-companies/capgemini.png", scale: 1.5 },
  { id: 9, name: "Amazon", logo: "/images/hiring-companies/key-benefit-amazon.png", scale: 1.5 },
  { id: 10, name: "Deloitte", logo: "/images/hiring-companies/key-benefit-deloitte.png", scale: 1.5 },
  { id: 11, name: "Infosys", logo: "/images/hiring-companies/key-benefit-infosys.png", scale: 1.5 },
  { id: 12, name: "JP Morgan", logo: "/images/hiring-companies/key-benefit-jp morgan.png", scale: 1.5 },
  { id: 13, name: "PwC", logo: "/images/hiring-companies/key-benefit-pwc.png", scale: 1.5 },
  { id: 14, name: "SpaceX", logo: "/images/hiring-companies/key-benefit-spacex.png", scale: 1.5 },
];

export default function EnterpriseLogos() {
  return (
    <section className="w-full bg-background py-12 lg:py-16">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes enterprise-marquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .animate-enterprise-marquee {
              display: flex;
              width: max-content;
              animation: enterprise-marquee 22s linear infinite;
            }
            .animate-enterprise-marquee:hover,
            .animate-enterprise-marquee:active {
              animation-play-state: paused;
            }
          `,
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <h2 className="text-center mb-10 lg:mb-12">
          Associated with 500+ Hiring partners
        </h2>

        <div className="lg:hidden overflow-hidden py-4 w-full">
          <div className="animate-enterprise-marquee">
            {[...enterprises, ...enterprises].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-center shrink-0 w-[135px] sm:w-[155px] h-[90px] mr-6 sm:mr-8"
              >
                <img
                  src={item.logo}
                  alt={`${item.name} Logo`}
                  loading="lazy"
                  style={{
                    transform: `scale(${item.scale})`,
                  }}
                  className="block w-full max-w-[105px] sm:max-w-[125px] h-[55px] object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-7 lg:gap-x-5 lg:gap-y-10">
          {enterprises.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center h-[95px] min-w-0"
            >
              <img
                src={item.logo}
                alt={`${item.name} Logo`}
                loading="lazy"
                style={{
                  transform: `scale(${item.scale})`,
                }}
                className="block w-full max-w-[115px] h-[65px] object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}