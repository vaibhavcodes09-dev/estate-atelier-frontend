import { lazy, Suspense } from "react";

import Hero from "../components/home/Hero";
const RecommendedProperties = lazy(
  () => import("../components/home/RecommendedProperties"),
);
const WhyChooseUs = lazy(() => import("../components/home/WhyChooseUs"));
const PopularLocations = lazy(
  () => import("../components/home/PopularLocations"),
);
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const CallToAction = lazy(() => import("../components/home/CallToAction"));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading properties...</div>}>
        <RecommendedProperties />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<div>Loading locations...</div>}>
        <PopularLocations />
      </Suspense>

      <Suspense fallback={<div>Loading testimonials...</div>}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <CallToAction />
      </Suspense>
    </>
  );
}
