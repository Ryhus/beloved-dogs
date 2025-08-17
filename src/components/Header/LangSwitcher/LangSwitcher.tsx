'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import './LangSwitcher.scss';

const LANGUAGES = ['en', 'ru', 'de'];

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = pathname.split('/')[1] || 'en';

  const handleChange = (locale: string) => {
    if (locale === currentLocale) return;
    const query = searchParams.toString();
    router.push(
      `/${locale}${pathname.substring(3)}${query ? `?${query}` : ''}`
    );
  };

  return (
    <div className="language-switcher">
      <select
        value={currentLocale}
        onChange={(e) => handleChange(e.target.value)}
        className="language-dropdown"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
