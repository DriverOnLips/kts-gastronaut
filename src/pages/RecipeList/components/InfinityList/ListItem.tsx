import * as React from 'react';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';

interface ItemProps {
	columnIndex: number;
	rowIndex: number;
	style: React.CSSProperties;
	isItemLoaded: (index: number) => boolean;
	items: RecipeFromListModel[];
	columnCount: number;
	onCardButtonClickHandler: () => void;
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
};

export default Item;
