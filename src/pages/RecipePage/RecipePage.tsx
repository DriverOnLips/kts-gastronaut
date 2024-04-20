import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './RecipePage.module.scss';

import { useRecipeContext } from '../../App';
import { Api } from 'utils/api';
import { RecipeType } from 'types/RecipeType';
import Text from 'components/Text/Text';
import Loader from 'components/Loader/Loader';
import back_button from 'assets/svg/back_button.svg';
import separator_1 from './components/svg/separator_1.svg';
import separator_2 from './components/svg/separator_2.svg';
import ingredient_svg from './components/svg/ingredient.svg';
import equipment_svg from './components/svg/equipment.svg';

const RecipePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { recipe, setRecipe } = useRecipeContext();
	const api = new Api();

	useEffect(() => {
		if (!id || isNaN(+id)) {
			navigate('/not_found');

			return;
		}

		const loadRecipe = async () => {
			const response = await api.getRecipeInfo(+id);
			const recipeToSet: RecipeType = {
				id: response.id,
				title: response.title,
				image: response.image,
				preparationMinutes: response.preparationMinutes,
				cookingMinutes: response.cookingMinutes,
				readyInMinutes: response.readyInMinutes,
				servings: response.servings,
				aggregateLikes: response.aggregateLikes,
				summary: response.summary,
				ingredients: response.extendedIngredients?.map(
					(item: any) => item.original,
				),
				equipment: response.analyzedInstructions?.[0]?.steps?.map(
					(item: any) => item.equipment?.[0]?.localizedName,
				),
				steps: response.analyzedInstructions?.[0]?.steps?.map(
					(item: any) => item.step,
				),
			};

			setRecipe(recipeToSet);
			setIsLoaded(true); //
		};

		loadRecipe();

		// return () => setRecipe(null);
	}, []);

	// useEffect(() => {
	// 	if (recipe?.id) {
	// 		setIsLoaded(true);
	// 	}
	// }, [recipe]);

	return (
		<div className={`${styles.recipe_page}`}>
			{isLoaded ? (
				<div className={`${styles.recipe_page_content}`}>
					<div className={`${styles.recipe_page_content__top}`}>
						<img
							src={back_button}
							className={`${styles.recipe_page_content__top_img}`}
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
							className={`${styles.recipe_page_content__stats_img}`}
						/>
						<div className={`${styles.recipe_page_content__stats_div}`}>
							<div
								className={`${styles.recipe_page_content__stats_div__preparation}`}
							>
								<Text
									size='s5'
									text_align='center'
									weight='medium'
									color='primary'
								>
									Preparation
								</Text>
								<Text
									size='s5'
									text_align='center'
									weight='bold'
									color='main'
								>
									{recipe.preparationMinutes} minutes
								</Text>
							</div>
							<div
								className={`${styles.recipe_page_content__stats_div__cooking}`}
							>
								<Text
									size='s5'
									text_align='center'
									weight='medium'
									color='primary'
								>
									Cooking
								</Text>
								<Text
									size='s5'
									text_align='center'
									weight='bold'
									color='main'
								>
									{recipe.cookingMinutes} minutes
								</Text>
							</div>
							<div
								className={`${styles.recipe_page_content__stats_div__total}`}
							>
								<Text
									size='s5'
									text_align='center'
									weight='medium'
									color='primary'
								>
									Total
								</Text>
								<Text
									size='s5'
									text_align='center'
									weight='bold'
									color='main'
								>
									{recipe.readyInMinutes} minutes
								</Text>
							</div>
							<div
								className={`${styles.recipe_page_content__stats_div__ratings}`}
							>
								<Text
									size='s5'
									text_align='center'
									weight='medium'
									color='primary'
								>
									Ratings
								</Text>
								<Text
									size='s5'
									text_align='center'
									weight='bold'
									color='main'
								>
									{recipe.aggregateLikes} likes
								</Text>
							</div>
							<div
								className={`${styles.recipe_page_content__stats_div__servings}`}
							>
								<Text
									size='s5'
									text_align='center'
									weight='medium'
									color='primary'
								>
									Servings
								</Text>
								<Text
									size='s5'
									text_align='center'
									weight='bold'
									color='main'
								>
									{recipe.servings} servings
								</Text>
							</div>
						</div>
					</div>

					<div className={`${styles.recipe_page_content__summary} mb-2`}>
						<div
							dangerouslySetInnerHTML={{ __html: recipe?.summary }}
							className={`${styles.recipe_page_content__summary_div}`}
						></div>
					</div>

					<div
						className={`${styles.recipe_page_content__ingredients_equipment}`}
					>
						<div className={`${styles.recipe_page_content__ingredients}`}>
							<Text
								size='s4'
								text_align='start'
								weight='bold'
								color='primary'
							>
								Ingredients
							</Text>
							<div
								className={`${styles.recipe_page_content__ingredients__content} my-4`}
							>
								{recipe?.ingredients?.map((ingredient: string) => (
									<div>
										<img src={ingredient_svg} />
										<Text
											size='s5'
											text_align='start'
											weight='medium'
											color='primary'
										>
											{ingredient}
										</Text>
									</div>
								))}
							</div>
						</div>
						<div
							className={`${styles.recipe_page_content__ingredients_equipment__separator}`}
						>
							<img src={separator_1} />
							<img
								src={separator_2}
								style={{ width: 1 }}
							/>
						</div>

						<div className={`${styles.recipe_page_content__equipment}`}>
							<Text
								size='s4'
								text_align='start'
								weight='bold'
								color='primary'
							>
								Equipment
							</Text>
							<div
								className={`${styles.recipe_page_content__equipment__content} my-4`}
							>
								{recipe?.equipment?.map((equipment_item: string) => (
									<div>
										<img src={equipment_svg} />
										<Text
											size='s5'
											text_align='start'
											weight='medium'
											color='primary'
										>
											{equipment_item}
										</Text>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className={`${styles.recipe_page_content__steps}`}>
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
								<div>
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
