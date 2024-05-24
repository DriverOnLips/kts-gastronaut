import cn from 'classnames';
import * as React from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { toast } from 'sonner';
import rootStore from 'stores/RootStore/instance';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import { debounce } from 'utils/debounce';
import styles from '../../SavedRecipes.module.scss';
import Item from './ListItem.tsx';

interface ListWrapperProps {
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: RecipeFromListModel[];
	loadNextPage: () => void;
}

const ListWrapper: React.FC<ListWrapperProps> = ({
	hasNextPage,
	isNextPageLoading,
	items,
	loadNextPage,
}) => {
	const { isLoggedIn, user } = rootStore.authorization;

	const itemCount = hasNextPage ? items.length + 1 : items.length;
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
	const debouncedLoadMoreItems = debounce(loadMoreItems, 1000);
	const isItemLoaded = () => true;

	const navigate = useNavigate();

	const onCardButtonClickHandler = useCallback(
		(id: number) => () => {
			if (!isLoggedIn || !user) {
				toast.message('Authorization required', {
					description: 'To save recipes you need to log in to your account',
					className: 'notification',
					duration: 3000,
				});
				navigate('/login');

				return;
			}

			const selectedItem = items.find((item) => item.id === id);

			if (selectedItem) {
				const userItems = JSON.parse(
					localStorage.getItem(user.username) || '[]',
				);

				const updatedItems = userItems.filter(
					(item: RecipeFromListModel) => item.id !== id,
				);

				localStorage.setItem(user.username, JSON.stringify(updatedItems));
				toast.success('Recipe removed successfully', {
					className: 'notification',
					duration: 2000,
				});
			} else {
				toast.error('The recipe is not saved', {
					className: 'notification',
					duration: 2000,
				});
			}
		},
		[isLoggedIn, user, items, navigate],
	);

	const onCardItemClickHandler = useCallback(
		(id: number) => () => {
			navigate(`/recipe/${id}`);
		},
		[navigate],
	);

	const columnCount = useMemo(() => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 650) {
			return 1;
		} else if (screenWidth < 1200) {
			return 2;
		} else {
			return 3;
		}
	}, []);

	const setGridHeight = useMemo(() => {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		const remInPixels = rootFontSize * 2;
		const screenHeight = window.innerHeight;

		return screenHeight - 85 - remInPixels;
	}, []);

	const setItemHeight = useCallback(() => {
		const screenWidth = window.innerWidth;
		const breakpoints: { [key: number]: number } = {
			350: 550,
			500: 600,
			650: 700,
			900: 600,
			1200: 700,
			1400: 600,
			1700: 650,
			2000: 750,
		};

		const sortedBreakpoints = Object.keys(breakpoints)
			.map(Number)
			.sort((a, b) => a - b);
		const currentBreakpoint = sortedBreakpoints.find((bp) => screenWidth < bp);

		if (currentBreakpoint !== undefined) {
			return breakpoints[currentBreakpoint];
		}

		return 800;
	}, []);

	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={debouncedLoadMoreItems}
		>
			{({ ref }) => (
				<Grid
					className={cn('Grid-saved', styles.saved_recipes__container)}
					columnCount={columnCount}
					columnWidth={() => {
						return window.innerWidth / columnCount - 20;
					}}
					height={setGridHeight}
					rowCount={Math.ceil(items.length / columnCount)}
					rowHeight={setItemHeight}
					width={window.innerWidth - 4}
					ref={ref}
				>
					{({ columnIndex, rowIndex, style }) => (
						<Item
							columnIndex={columnIndex}
							rowIndex={rowIndex}
							style={style}
							isItemLoaded={isItemLoaded}
							items={items}
							columnCount={columnCount}
							onCardButtonClickHandler={onCardButtonClickHandler}
							onCardItemClickHandler={onCardItemClickHandler}
						/>
					)}
				</Grid>
			)}
		</InfiniteLoader>
	);
};

export default memo(ListWrapper);
