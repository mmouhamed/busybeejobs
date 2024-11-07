"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import "./Language.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

// Helper function to get the value of a cookie by name
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop(); // parts.pop() might return undefined
    return cookieValue ? cookieValue.split(';').shift() : undefined;
  }

  return undefined;
};
export default function LanguageSelector() {
  const [locale, setLocale] = useState('en'); // Default locale
  const router = useRouter();

  useEffect(() => {
    // Get the current locale from the cookie
    const cookieLocale = getCookie('NEXT_LOCALE');
    if (cookieLocale) {
      setLocale(cookieLocale);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = e.target.value;
    setLocale(selectedLocale);

    // Update the locale in the cookie
    document.cookie = `NEXT_LOCALE=${selectedLocale}; path=/;`;

    // Reload the page to apply the new locale
    router.refresh(); // Refresh the page to apply the new locale
  };

  return (
    <div className="dropdown-container">
      <FontAwesomeIcon icon={faGlobe} className="icon" /> {/* FontAwesome Globe Icon */}
      <select className="dropdown" value={locale} onChange={handleChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
}

