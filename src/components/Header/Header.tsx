'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SwitchThemeBttn } from './SwitchThemeBttn/SwitchThemeBttn';
import LangSwitcher from './LangSwitcher/LangSwitcher';

import './HeaderStyles.scss';

function Header() {
  const t = useTranslations('home');

  return (
    <header className="site-header">
      <div className="logo">
        <Link href="/">{t('tittle')}</Link>
      </div>

      <nav className="nav-links">
        <LangSwitcher />
        <SwitchThemeBttn />
        <Link href="/">{t('home')}</Link>
        <Link href="/about">{t('about')}</Link>
      </nav>
    </header>
  );
}

export default Header;
