import LeadForm from '@/components/forms/LeadForm';

// Contact page — placeholder. Reuses the existing LeadForm component
// for the contact section. A contact info sidebar will be added later.
export default function Contact() {
  return (
    <div className="container-px py-32">
      <h1 className="text-4xl font-bold text-ink-900">Contact Us</h1>
      <p className="mt-3 text-lg text-ink-500">
        Get in touch with our team.
      </p>
      <div className="mt-12">
        <LeadForm />
      </div>
    </div>
  );
}
