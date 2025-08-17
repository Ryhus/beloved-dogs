'use client';
import { useTranslations } from 'next-intl';
import { useSelectionStore } from '@/stores/selectionStore';
import { saveAs } from 'file-saver';

import './FlyoutStyles.scss';

function Flyout() {
  const { selectedList, clearSelection } = useSelectionStore();
  const t = useTranslations('home');
  const breedList = selectedList();

  if (breedList.length === 0) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/download-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ breeds: breedList }),
      });

      if (!response.ok) {
        console.error('Failed to generate CSV');
        return;
      }

      const blob = await response.blob();
      saveAs(blob, `${breedList.length}_items.csv`);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div className="flyout">
      <span>{breedList.length}</span>
      <button onClick={clearSelection}>{t('unselect')}</button>
      <button onClick={handleDownload}>{t('download')}</button>
    </div>
  );
}

export default Flyout;
