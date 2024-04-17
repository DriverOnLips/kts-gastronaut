import { DishFromList } from '../../../../types/DishFromList';

const DishItem: React.FC<DishFromList> = ({ id, title, image, dishTypes }) => {
	return (
		<div>
			{id}
			{title}
		</div>
	);
};

export default DishItem;
