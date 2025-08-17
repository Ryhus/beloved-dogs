'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { BreedDetails } from '@/components';

export default function DetailPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const breedId = searchParams.get('details');

  if (!breedId) return null;

  const handleClose = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('details');
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="detail-panel">
      <button onClick={handleClose} className="close-btn">
        &times;
      </button>
      <BreedDetails />
    </div>
  );
}
