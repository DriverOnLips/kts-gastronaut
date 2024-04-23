/* eslint-disable react/react-in-jsx-scope */
// import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import back_button from 'assets/svg/back_button.svg';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import { RecipeType } from 'types/RecipeType';
import { Api } from 'utils/api';
import { useRecipeContext } from '../../App';
import Equipment from './components/Equipment/Equipment';
import Ingredients from './components/Ingredients/Ingredients';
import StatsItem from './components/StatsItem/StatsItem';
import separator_1 from './components/svg/separator_1.svg';
import separator_2 from './components/svg/separator_2.svg';
import styles from './RecipePage.module.scss';

const RecipePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { recipe, setRecipe } = useRecipeContext();
	const api = useMemo(() => new Api(), []);

	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const loadRecipe = useCallback(async () => {
		if (!id || isNaN(+id)) {
			navigate('/not_found');
			return;
		}

		const response = await api.getRecipeInfo(id);
		const recipeToSet: RecipeType = {
			...response,
			preparationMinutes: Math.max(0, response.preparationMinutes),
			cookingMinutes: Math.max(0, response.cookingMinutes),
			readyInMinutes: Math.max(0, response.readyInMinutes),
			servings: Math.max(0, response.servings),
			aggregateLikes: Math.max(0, response.aggregateLikes),
			ingredients: response.extendedIngredients?.map(
				(item: { original: string }) => item.original,
			),
			equipment: response.analyzedInstructions?.[0]?.steps?.map(
				(item: any) => item.equipment?.[0]?.localizedName,
			),
			steps: response.analyzedInstructions?.[0]?.steps?.map(
				(item: { step: string }) => item.step,
			),
		};

		setRecipe(recipeToSet);
		setIsLoaded(true);
	}, [api, id, navigate, setRecipe]);

	useEffect(() => {
		loadRecipe();
	}, [loadRecipe]);

	return (
		<div className={styles.recipe_page}>
			{isLoaded && recipe?.id ? (
				<div className={styles.recipe_page_content}>
					<div className={styles.recipe_page_content__top}>
						<img
							src={back_button}
							className={styles['recipe_page_content__top-img']}
							onClick={() => navigate('/')}
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

						<div
							className={
								styles.recipe_page_content__ingredients_equipment__separator
							}
						>
							<img src={separator_1} />
							<img
								src={separator_2}
								style={{ width: 1 }}
							/>
						</div>

						<Equipment equipment={recipe.equipment} />
					</div>

					<div className={styles.recipe_page_content__steps}>
						<Text
							size='s4'
							text_align='start'
							weight='bold'
							color='primary'
						>
							Directions
						</Text>
						<div className={`${styles.recipe_page_content__steps} my-4`}>
							{recipe?.steps?.map((step: string, index: number) => (
								<div key={index}>
									<Text
										size='s5'
										text_align='start'
										weight='bold'
										color='primary'
									>
										step {index + 1}
									</Text>
									<Text
										size='s5'
										text_align='start'
										weight='medium'
										color='primary'
									>
										{step}
									</Text>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<>
					<Loader />
				</>
			)}
		</div>
	);
};

export default RecipePage;
