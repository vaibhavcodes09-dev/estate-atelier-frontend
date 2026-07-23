import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// PasswordField — reusable password input with show/hide toggle.
// Designed to match the existing `.input-field` design system class.
export default function PasswordField({ id, label, placeholder, autoComplete, ...registerProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="input-field pr-12"
          {...registerProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 transition hover:text-ink-700"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
