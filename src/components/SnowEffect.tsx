'use client';

import React from 'react';
import Snowfall from 'react-snowfall';

export default function SnowEffect() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[100]">
      <Snowfall 
        color="#ffffff" 
        snowflakeCount={150} 
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
    </div>
  );
}