import * as React from 'react';
import { useCallback, CSSProperties, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import styles from '../../RecipeList.module.scss';

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
		({ scrollTop }) => {
			const totalHeight =
				(recipeList.length * setItemHeight()) / getColumnCount();
			const isAtEnd = scrollTop + 1200 >= totalHeight; // 1200 - это высота контейнера
			setIsAtEnd(isAtEnd);
		},
		[recipeList.length, setIsAtEnd],
	);

	const onCardButtonClickHandler = useCallback(() => {}, []);
	const onCardItemClickHandler = useCallback(
		() => (id: number) => {
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

	const setItemHeight = () => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 350) {
			return 550;
		} else if (screenWidth < 500) {
			return 600;
		} else if (screenWidth < 650) {
			return 700;
		} else if (screenWidth < 900) {
			return 600;
		} else if (screenWidth < 1200) {
			return 700;
		} else if (screenWidth < 1400) {
			return 600;
		} else if (screenWidth < 1700) {
			return 650;
		} else {
			return 700;
		}
	};

	return (
		<Grid
			className={`${styles.recipe_list__container}`}
			columnCount={getColumnCount()}
			columnWidth={() => {
				const columnCount = getColumnCount();
				return window.innerWidth / columnCount - 14;
			}}
			height={1200} // Высота списка
			rowCount={Math.ceil(recipeList.length / getColumnCount())}
			rowHeight={setItemHeight} // Высота элемента
			width={window.innerWidth - 15} // Ширина списка
			style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
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
