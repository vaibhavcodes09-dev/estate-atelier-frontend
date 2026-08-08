import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto flex min-h-[75vh] flex-col items-center justify-center px-4 py-20 text-center">
      <span className="font-extrabold text-9xl text-indigo-600/20 tracking-tighter">404</span>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-500 max-w-md font-medium">
        The page or property listing you are looking for does not exist, has been removed, or moved to a new address on SquareUp.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-2xl text-xs font-bold transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Properties
        </Link>
      </div>
    </div>
  );
}
