import { Suspense } from 'react';

import { SearchForm, Loader, BreedSection } from '@/components';
import DetailPanel from '@/components/DetailPanel/DetailPanel';

import './HomeStyles.scss';

interface HomeProps {
  searchParams: Promise<{
    details?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { details } = await searchParams;

  const hasDetails = Boolean(details);

  return (
    <div className={`home-page-container ${hasDetails ? 'split-view' : ''}`}>
      <div className="master">
        <h1 className="search-hint">
          Looking for your favorite dog breed? 🐶
          <br />
          Try searching for <em>Beagle</em> or <em>Labrador!</em>
        </h1>
        <SearchForm />
        <Suspense fallback={<Loader />}>
          <BreedSection />
        </Suspense>
      </div>
      {hasDetails && <DetailPanel />}
    </div>
  );
}
