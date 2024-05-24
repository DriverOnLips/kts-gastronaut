/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import back_button from 'assets/svg/back_button.svg';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import { useRootContext } from 'contexts/RootContext';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipePageStore from 'stores/RecipePageStore/RecipePageStore';
import { Meta } from 'utils/meta';
import Equipment from './components/Equipment/Equipment';
import Ingredients from './components/Ingredients/Ingredients';
import StatsItem from './components/StatsItem/StatsItem';
import Steps from './components/Steps/Steps';
import styles from './RecipePage.module.scss';

const RecipePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { rootRef } = useRootContext();

	const recipePageStore = useLocalStore(() => new RecipePageStore());
	const recipe = recipePageStore.recipeInfo;

	const onImgClickHandler = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	useEffect(() => {
		if (!rootRef) return;
		rootRef.style.height = '100%';

		return () => {
			rootRef.style.height = '100vh';
		};
	}, [rootRef]);

	useEffect(() => {
		if (!id || isNaN(+id)) {
			navigate('/not_found');
			return;
		}
		recipePageStore.getRecipeInfo({ id });
	}, [id, navigate, recipePageStore]);

	return (
		<div className={styles.recipe_page}>
			{recipePageStore.meta === Meta.success && recipe ? (
				<div className={styles.recipe_page_content}>
					<div className={styles.recipe_page_content__top}>
						<img
							src={back_button}
							className={styles['recipe_page_content__top-img']}
							onClick={onImgClickHandler}
						/>
						<Text
							size='s3'
							text_align='start'
							weight='bold'
						>
							{recipe.title}
						</Text>
					</div>
					<div className={`${styles.recipe_page_content__stats} my-2`}>
						<img
							src={recipe.image}
							className={styles['recipe_page_content__stats-img']}
						/>
						<div className={styles['recipe_page_content__stats-div']}>
							<StatsItem
								className={
									styles['recipe_page_content__stats-div__preparation']
								}
								title='Preparation'
								value={recipe.preparationMinutes}
								caption='minutes'
							/>

							<StatsItem
								className={styles['recipe_page_content__stats-div__cooking']}
								title='Cooking'
								value={recipe.cookingMinutes}
								caption='minutes'
							/>

							<StatsItem
								className={styles['recipe_page_content__stats-div__total']}
								title='Total'
								value={recipe.readyInMinutes}
								caption='minutes'
							/>

							<StatsItem
								className={styles['recipe_page_content__stats-div__ratings']}
								title='Ratings'
								value={recipe.aggregateLikes}
								caption='likes'
							/>

							<StatsItem
								className={styles['recipe_page_content__stats-div__servings']}
								title='Servings'
								value={recipe.servings}
								caption='servings'
							/>
						</div>
					</div>

					<div className={`${styles.recipe_page_content__summary} mb-2`}>
						<div
							dangerouslySetInnerHTML={{ __html: recipe?.summary }}
							className={styles.recipe_page_content__summary_div}
						/>
					</div>

					<div className={styles.recipe_page_content__ingredients_equipment}>
						<Ingredients ingredients={recipe.ingredients} />
						<Equipment equipment={recipe.equipment} />
					</div>

					<Steps steps={recipe?.steps} />
				</div>
			) : (
				<>
					<Loader />
				</>
			)}
		</div>
	);
};

export default observer(RecipePage);
