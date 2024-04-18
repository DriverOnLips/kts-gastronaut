import styles from './DishItem.module.scss';

import { DishFromList } from '../../../../types/DishFromList';
import { useNavigate } from 'react-router-dom';
import Text from '../../../../components/Text/Text';

const DishItem: React.FC<DishFromList> = ({
	id,
	title,
	image,
	readyInMinutes,
	ingredients,
	calories,
}) => {
	const navigate = useNavigate();

	return (
		<div className={styles.dish_item}>
			<div
				className={styles.dish_item__content}
				onClick={() => navigate(`/dish/${id}`)}
			>
				<img
					className={styles.dish_item__img}
					src={image}
					alt={title}
				/>
				<div className={styles.dish_item__info}>
					<Text
						className='dish_item__info__name'
						size='s4'
						text_align='center'
						weight='bold'
					>
						{title}
					</Text>
					<Text
						className='dish_item__info__dish_types my-3'
						size='s5'
						text_align='start'
						weight='light'
					>
						{readyInMinutes}
					</Text>
					<Text
						className='my-3'
						size='s5'
						text_align='start'
						weight='light'
					>
						{ingredients}
					</Text>
					<Text
						className='dish_item__info__dish_types my-3'
						size='s5'
						text_align='start'
						weight='light'
					>
						{calories}
					</Text>
				</div>
			</div>
		</div>
	);
};

export default DishItem;
