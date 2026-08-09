import React from 'react';
import { Link } from 'react-router-dom';
import logoLight from '@/assets/squareup-logo.svg';
import logoDark from '@/assets/squareup-logo-dark.svg';

/**
 * Single source of truth for SquareUp Properties logo.
 * Renders ONLY the clean, transparent logo mark with zero duplicate text.
 */
export default function Logo({
  variant = 'light', // 'light' (for light backgrounds) or 'dark' (for dark backgrounds)
  className = 'h-10 sm:h-11 w-auto',
  asLink = true,
  to = '/',
}) {
  const logoSrc = variant === 'dark' ? logoDark : logoLight;

  const logoImg = (
    <img
      src={logoSrc}
      alt="SquareUp Properties Logo"
      className={`object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  );

  if (asLink) {
    return (
      <Link to={to} className="inline-flex items-center group shrink-0" aria-label="SquareUp Properties Home">
        {logoImg}
      </Link>
    );
  }

  return <div className="inline-flex items-center group shrink-0">{logoImg}</div>;
}
