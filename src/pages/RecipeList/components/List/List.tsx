/* eslint-disable react/react-in-jsx-scope */
import cn from 'classnames';
import { useCallback, CSSProperties, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import styles from '../../RecipeList.module.scss';
import { useRecipeListContext } from '../../contexts/RecipeListContext';

interface ScrollEvent {
	scrollTop: number;
}

interface GridItemProps {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
}

const List = () => {
	const { recipeList, setIsAtEnd, increase, setIncrease, introRef } =
		useRecipeListContext();

	const navigate = useNavigate();

	const [lastScrollTop, setLastScrollTop] = useState<number>(0);

	const handleScroll = useCallback(
		({ scrollTop }: ScrollEvent) => {
			if (scrollTop !== 0 && scrollTop < 300) {
				if (scrollTop > lastScrollTop) {
					introRef?.current?.classList.add(styles['hide-image']);
					setIncrease(true);
				} else {
					introRef?.current?.classList.remove(styles['hide-image']);
					setIncrease(false);
				}
				setLastScrollTop(scrollTop);
			}

			const totalHeight =
				(recipeList.length * setItemHeight()) / getColumnCount();
			const isAtEnd = scrollTop + 1200 >= totalHeight; // 1200 - это высота контейнера
			setIsAtEnd(isAtEnd);
		},
		[recipeList.length, setIsAtEnd, lastScrollTop],
	);

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

	const setGridHeight = () => {
		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);
		const remInPixels = rootFontSize * 5;
		const screenHeight = window.innerHeight;

		return increase
			? screenHeight - 215 - remInPixels
			: screenHeight - 420 - remInPixels;
	};

	return (
		<Grid
			className={cn(styles.recipe_list__container, 'virtualized_list')}
			columnCount={getColumnCount()}
			columnWidth={() => {
				const columnCount = getColumnCount();
				return window.innerWidth / columnCount - 20;
			}}
			height={setGridHeight()} // Высота списка
			rowCount={Math.ceil(recipeList.length / getColumnCount())}
			rowHeight={setItemHeight} // Высота элемента
			width={window.innerWidth - 4} // Ширина списка
			// style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
			onScroll={handleScroll}
		>
			{({ columnIndex, rowIndex, style }: GridItemProps) => {
				const index = rowIndex * getColumnCount() + columnIndex;
				const item = recipeList[index];
				if (!item) return null;

				return (
					<div
						style={style}
						className={styles.recipe_list__container_item}
					>
						<Card
							key={item.id}
							actionSlot={<Button>Save</Button>}
							captionSlot={item?.readyInMinutes + ' minutes'}
							contentSlot={item.calories + ' kcal'}
							image={item.image}
							title={item.title}
							subtitle={item.ingredients}
							onButtonClick={onCardButtonClickHandler}
							onItemClick={onCardItemClickHandler(item.id)}
						/>
					</div>
				);
			}}
		</Grid>
	);
};

export default memo(List);
