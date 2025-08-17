import { NextIntlClientProvider, hasLocale } from 'next-intl';
import getRequestConfig from '@/i18n/request';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactQueryProvider } from '@/components';
import { ThemeProvider } from '@/contexts';
import { Header } from '@/components';

import { type Metadata } from 'next';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Beloved Dogs',
  description: 'Your best application for finding your beloved dogs',
};

interface RootLayoutProps {
  children: React.ReactNode;
  details: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function RootLayout({ children, details, params }: RootLayoutProps) {
  const { locale } = await params;
  const { messages } = await getRequestConfig({
    requestLocale: Promise.resolve(locale),
  });

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-theme="light">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div id="root">
            <ThemeProvider>
              <Header />
              <ReactQueryProvider>
                {children}
                {details}
              </ReactQueryProvider>
            </ThemeProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
