import React, { useCallback } from 'react';
import Button from 'components/Button/Button';
// import { scrollTo } from '../../../../utils/scrollTo';
import PageButton from './components/PageButton/PageButton';
import styles from './Pagination.module.scss';

type PaginationProps = {
	page: number;
	pages: number;
};

const Pagination: React.FC<PaginationProps> = ({ page, pages }) => {
	// const { page, pages, setPage } = useApp();

	// const handlerClick = (num: number) => {
	// 	console.log(num);
	// scrollTo('best_films-span');
	// setPage(num);
	// };

	const onPageButtonClick = useCallback(() => {
		console.log('click');
	}, []);

	return (
		<div className={styles.pagination}>
			{page > 2 && (
				<PageButton onClick={onPageButtonClick}>{page - 2}</PageButton>
			)}
			{page > 1 && (
				<PageButton onClick={onPageButtonClick}>{page - 1}</PageButton>
			)}

			<PageButton
				active={true}
				onClick={onPageButtonClick}
			>
				{page}
			</PageButton>

			{pages - page > 0 && (
				<PageButton onClick={onPageButtonClick}>{page + 1}</PageButton>
			)}
			{pages - page > 1 && (
				<PageButton onClick={onPageButtonClick}>{page + 2}</PageButton>
			)}
		</div>
	);
};

export default Pagination;
