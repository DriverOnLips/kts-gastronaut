import * as React from 'react';
import { useCallback, CSSProperties, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import styles from '../../RecipeList.module.scss';

interface ScrollEvent {
	scrollTop: number;
}

interface GridItemProps {
	columnIndex: number;
	rowIndex: number;
	style: CSSProperties;
}

type ListProps = {
	recipeList: RecipeFromListModel[];
	setIsAtEnd(value: boolean): void;
};

const List: React.FC<ListProps> = ({ recipeList, setIsAtEnd }) => {
	const navigate = useNavigate();

	const handleScroll = useCallback(
		({ scrollTop }: ScrollEvent) => {
			const totalHeight =
				(recipeList.length * setItemHeight()) / getColumnCount();
			const isAtEnd = scrollTop + 1200 >= totalHeight; // 1200 - это высота контейнера
			setIsAtEnd(isAtEnd);
		},
		[recipeList.length, setIsAtEnd],
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
		const screenHeight = window.innerHeight;
		const screenWidth = window.innerWidth;

		if (screenHeight < 350) {
			return 550;
		} else if (screenHeight < 1500) {
			return screenHeight - 450;
		} else {
			if (screenWidth < 200) {
				return 100;
			} else if (screenWidth < 950) {
				return screenHeight - 340;
			} else if (screenWidth < 1300) {
				return screenHeight - 380;
			} else if (screenWidth < 1550) {
				return screenHeight - 420;
			} else if (screenWidth < 1750) {
				return screenHeight - 450;
			} else if (screenWidth < 2000) {
				return screenHeight - 480;
			} else if (screenWidth < 2200) {
				return screenHeight - 520;
			} else {
				return screenHeight - 570;
			}
		}
	};

	return (
		<Grid
			className={`${styles.recipe_list__container}`}
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
