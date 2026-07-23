import { useParams } from 'react-router-dom';

// PropertyDetails page — placeholder. Will show full details, gallery,
// amenities, and contact CTA for a single property in a future implementation.
export default function PropertyDetails() {
  const { id } = useParams();
  return (
    <div className="container-px py-32">
      <h1 className="text-4xl font-bold text-ink-900">Property Details</h1>
      <p className="mt-3 text-lg text-ink-500">
        Detailed view for property ID: <span className="font-semibold text-ink-700">{id}</span>
      </p>
    </div>
  );
}
