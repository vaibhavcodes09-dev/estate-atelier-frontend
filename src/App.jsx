import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

// App — root component. Wraps the route tree in BrowserRouter
// so client-side navigation works across all pages.
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
