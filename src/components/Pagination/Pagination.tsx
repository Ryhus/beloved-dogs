'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

import './PagintationStyles.scss';

interface PaginationProps {
  currentPage: number;
  itemsOnCurrentPage: number;
  itemsPerPage?: number;
  disableNextBttn?: boolean;
}

function Pagination({
  currentPage,
  itemsOnCurrentPage,
  itemsPerPage = 10,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('home');
  const isFirstPage = currentPage === 0;
  const isLastPage = itemsOnCurrentPage < itemsPerPage;

  const createLink = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page + 1));
    return `${pathname}?${newParams.toString()}`;
  };

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li>
          <Link
            className={`page-link ${isFirstPage ? 'disabled' : ''}`}
            href={createLink(currentPage - 1)}
            aria-disabled={isFirstPage}
            onClick={(e) => isFirstPage && e.preventDefault()}
          >
            {t('prev')}
          </Link>
        </li>

        <li>
          <Link
            className={`page-link ${isLastPage ? 'disabled' : ''}`}
            href={createLink(currentPage + 1)}
            aria-disabled={isLastPage}
            onClick={(e) => isLastPage && e.preventDefault()}
          >
            {t('next')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
