import * as React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	VariableSizeGrid as Grid,
	GridOnItemsRenderedProps,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import Item from './ListItem';

interface ExampleWrapperProps {
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	items: RecipeFromListModel[];
	loadNextPage: () => void;
}

const ExampleWrapper: React.FC<ExampleWrapperProps> = ({
	hasNextPage,
	isNextPageLoading,
	items,
	loadNextPage,
}) => {
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

	const getColumnCount = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 650) {
			return 1;
		} else if (screenWidth < 1200) {
			return 2;
		} else {
			return 3;
		}
	};

	const columnCount = getColumnCount();

	const setGridHeight = () => {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		const remInPixels = rootFontSize * 5;
		const screenHeight = window.innerHeight;
		return screenHeight - 420 - remInPixels;
	};

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
			loadMoreItems={loadMoreItems}
		>
			{({ ref }) => (
				<Grid
					className='Grid'
					columnCount={columnCount}
					columnWidth={() => {
						return window.innerWidth / columnCount - 20;
					}}
					height={setGridHeight()}
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

export default ExampleWrapper;
