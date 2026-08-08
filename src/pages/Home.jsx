import React, { lazy, Suspense } from 'react';
import Hero from '../components/home/Hero';

const RecommendedProperties = lazy(() => import('../components/home/RecommendedProperties'));
const WhyChooseUs = lazy(() => import('../components/home/WhyChooseUs'));
const PopularLocations = lazy(() => import('../components/home/PopularLocations'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const CallToAction = lazy(() => import('../components/home/CallToAction'));

export default function Home() {
  return (
    <>
      <Hero />
      
      <Suspense fallback={<div className="h-64 w-full bg-slate-50 animate-pulse" />}>
        <RecommendedProperties />
      </Suspense>

      <Suspense fallback={<div className="h-48 w-full bg-white animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div className="h-64 w-full bg-white animate-pulse" />}>
        <PopularLocations />
      </Suspense>

      <Suspense fallback={<div className="h-64 w-full bg-slate-50 animate-pulse" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="h-64 w-full bg-white animate-pulse" />}>
        <CallToAction />
      </Suspense>
    </>
  );
}
