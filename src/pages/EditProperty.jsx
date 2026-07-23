import { useParams } from 'react-router-dom';

// EditProperty page — placeholder. Will contain a pre-filled form
// to edit an existing property listing in a future implementation.
export default function EditProperty() {
  const { id } = useParams();
  return (
    <div className="container-px py-32">
      <h1 className="text-4xl font-bold text-ink-900">Edit Property</h1>
      <p className="mt-3 text-lg text-ink-500">
        Edit form for property ID: <span className="font-semibold text-ink-700">{id}</span>
      </p>
    </div>
  );
}
