import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './RecipePage.module.scss';

import { useRecipeContext } from '../../App';
import { Api } from 'utils/api';
import { RecipeType } from 'types/RecipeType';
import Text from 'components/Text/Text';
import Loader from 'components/Loader/Loader';

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
			setIsLoaded(true);
		};

		loadRecipe();
	}, []);

	return (
		<div className={`${styles.recipe_page}`}>
			{isLoaded ? (
				<>
					<Text
						size='s3'
						text_align='center'
						weight='bold'
					>
						{recipe.title}
					</Text>
				</>
			) : (
				<>
					<Loader />
				</>
			)}
		</div>
	);
};

export default RecipePage;
