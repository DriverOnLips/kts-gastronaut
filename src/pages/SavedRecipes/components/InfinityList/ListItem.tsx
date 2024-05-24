import * as React from 'react';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import styles from '../../SavedRecipes.module.scss';

interface ItemProps {
	columnIndex: number;
	rowIndex: number;
	style: React.CSSProperties;
	isItemLoaded: (index: number) => boolean;
	items: RecipeFromListModel[];
	columnCount: number;
	onCardButtonClickHandler: (id: number) => () => void;
	onCardItemClickHandler: (id: number) => () => void;
}

const Item: React.FC<ItemProps> = ({
	columnIndex,
	rowIndex,
	style,
	isItemLoaded,
	items,
	columnCount,
	onCardButtonClickHandler,
	onCardItemClickHandler,
}) => {
	const index = rowIndex * columnCount + columnIndex;

	if (!isItemLoaded(index)) {
		return <Loader />;
	}

	const item = items[index];
	if (!item) return null;

	return (
		<div style={style}>
			<Card
				className={styles.saved_recipes__container_item}
				key={item.id}
				actionSlot={<Button>Delete</Button>}
				captionSlot={item?.readyInMinutes + ' minutes'}
				contentSlot={item.calories + ' kcal'}
				image={item.image}
				title={item.title}
				subtitle={item.ingredients}
				onButtonClick={onCardButtonClickHandler(item.id)}
				onItemClick={onCardItemClickHandler(item.id)}
			/>
		</div>
	);
};

export default Item;
