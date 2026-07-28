import Hero from '@/components/home/Hero';

// Home page — assembles all existing landing-page sections.
// This is the same composition that was previously in pages/Home.jsx,
// now rendered inside MainLayout via the router.
export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
