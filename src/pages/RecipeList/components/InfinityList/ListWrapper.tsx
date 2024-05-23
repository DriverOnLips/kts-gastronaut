import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	VariableSizeGrid as Grid,
	GridOnItemsRenderedProps,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import styles from '../../RecipeList.module.scss';
import Item from './ListItem';
import { useRecipeListContext } from '../../context/RecipeListContext';

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
	const { introRef } = useRecipeListContext();

	const [increase, setIncrease] = useState<boolean>(false);

	const itemCount = hasNextPage ? items.length + 1 : items.length;
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
	const isItemLoaded = (index: number) => index < items.length;

	const navigate = useNavigate();
	const onCardButtonClickHandler = useCallback(() => {}, []);
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
		const remInPixels = rootFontSize * 5;
		const screenHeight = window.innerHeight;
		return increase
			? screenHeight - 215 - remInPixels
			: screenHeight - 420 - remInPixels;
	}, [increase]);

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

	const onScroll = useCallback(({ scrollTop }: { scrollTop: number }) => {
		setIncrease(scrollTop > 100);
	}, []);

	useEffect(() => {
		if (increase) {
			introRef?.current?.classList.add(styles['hide-image']);
		} else {
			introRef?.current?.classList.remove(styles['hide-image']);
		}
	}, [increase]);

	return (
		<InfiniteLoader
			isItemLoaded={isItemLoaded}
			itemCount={itemCount}
			loadMoreItems={loadMoreItems}
		>
			{({ ref }) => (
				<Grid
					className='Grid'
					columnCount={columnCount}
					columnWidth={() => {
						return window.innerWidth / columnCount - 20;
					}}
					height={setGridHeight}
					rowCount={Math.ceil(items.length / columnCount)}
					rowHeight={setItemHeight}
					width={window.innerWidth - 4}
					onItemsRendered={({
						visibleRowStopIndex,
					}: GridOnItemsRenderedProps) => {
						if (itemCount - (visibleRowStopIndex + 1) * columnCount < 30) {
							loadMoreItems();
						}
					}}
					ref={ref}
					onScroll={onScroll}
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

export default ListWrapper;
