'use client';

import { useEffect, useState } from 'react';
import DiwaliBanner from '../Promo/DiwaliBanner';
import NewYearBanner from '../Promo/NewYearBanner';
import XmasBanner from '../Promo/XmasBanner';
import DefaultBanner from '../Promo/DefaultBanner';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    fetch('/api/coupons/active')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setOffer(data);
          setTimeout(() => setShowBanner(true), 2000);
        }
      });
  }, []);

  if (!isVisible || !offer) return null;

  switch (offer.themeType) {
    case 'diwali':
      return <DiwaliBanner offer={offer} showBanner={showBanner} setIsVisible={setIsVisible} />;
    case 'newyear':
      return <NewYearBanner offer={offer} showBanner={showBanner} setIsVisible={setIsVisible} />;
    case 'xmas':
      return <XmasBanner offer={offer} showBanner={showBanner} setIsVisible={setIsVisible} />;
    default:
      return <DefaultBanner offer={offer} showBanner={showBanner} setIsVisible={setIsVisible} />;
  }
}