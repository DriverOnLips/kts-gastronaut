import { useNavigate } from 'react-router-dom';

import styles from './RecipeItem.module.scss';

import Text from 'components/Text/Text';
import { RecipeFromList } from 'types/RecipeFromList';
import readyInMinutesSvg from 'assets/svg/readyInMinutes.svg';
import Button from 'components/Button/Button';

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
					<div className={styles.recipe_item__info__ready_div}>
						<img
							src={readyInMinutesSvg}
							className={styles.recipe_item__info__ready_svg}
						/>
						<Text
							className={`${styles.recipe_item__info__ready_text}`}
							size='s5'
							text_align='start'
							weight='medium'
							color='secondary'
						>
							{readyInMinutes} minutes
						</Text>
					</div>

					<Text
						className={`${styles.recipe_item__info__name} my-4`}
						size='s4'
						text_align='start'
						weight='bold'
						color='primary'
					>
						{title}
					</Text>

					<Text
						className={`${styles.recipe_item__info__ingredients} mb-1`}
						size='s5'
						text_align='start'
						weight='medium'
						color='secondary'
					>
						{ingredients}
					</Text>
					<Text
						className={`${styles.recipe_item__info__calories} mb-3 ml-3`}
						size='s5'
						text_align='start'
						weight='bold'
						color='main'
					>
						{calories} kcal
					</Text>
					{/* <Button
						type='default'
						text='Save'
						onClick={() => {
							console.log('click');
						}}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default RecipeItem;
