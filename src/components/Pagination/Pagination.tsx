import * as React from 'react';
import PageButton from './components/PageButton/PageButton';
import styles from './Pagination.module.scss';

type PaginationProps = {
	page: number;
	pages: number;
	onPageButtonClick: (page: number) => () => void;
};

const Pagination: React.FC<PaginationProps> = ({
	page,
	pages,
	onPageButtonClick,
}) => {
	return (
		<div className={styles.pagination}>
			{page > 2 && (
				<PageButton onClick={onPageButtonClick(page - 2)}>
					{page - 2}
				</PageButton>
			)}
			{page > 1 && (
				<PageButton onClick={onPageButtonClick(page - 1)}>
					{page - 1}
				</PageButton>
			)}

			<PageButton
				active={true}
				onClick={onPageButtonClick(page)}
			>
				{page}
			</PageButton>

			{pages - page > 0 && (
				<PageButton onClick={onPageButtonClick(page + 1)}>
					{page + 1}
				</PageButton>
			)}
			{pages - page > 1 && (
				<PageButton onClick={onPageButtonClick(page + 2)}>
					{page + 2}
				</PageButton>
			)}
		</div>
	);
};

export default Pagination;
