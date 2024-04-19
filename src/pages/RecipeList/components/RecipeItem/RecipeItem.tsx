import { useNavigate } from 'react-router-dom';

import Text from 'components/Text/Text';
import { RecipeFromList } from 'types/RecipeFromList';
import styles from './RecipeItem.module.scss';

const RecipeItem: React.FC<RecipeFromList> = ({
	id,
	title,
	image,
	readyInMinutes,
	ingredients,
	calories,
}) => {
	const navigate = useNavigate();

	return (
		<div className={styles.recipe_item}>
			<div
				className={styles.recipe_item__content}
				onClick={() => navigate(`/recipe/${id}`)}
			>
				<img
					className={styles.recipe_item__img}
					src={image}
					alt={title}
				/>
				<div className={styles.recipe_item__info}>
					<Text
						className='recipe_item__info__name'
						size='s4'
						text_align='center'
						weight='bold'
					>
						{title}
					</Text>
					<Text
						className='recipe_item__info__recipe_types my-3'
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
						className='recipe_item__info__recipe_types mt-3'
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

export default RecipeItem;
