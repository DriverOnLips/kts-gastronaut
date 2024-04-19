import { useEffect } from 'react';

import styles from './RecipeList.module.scss';

import { RecipeFromList } from 'types/RecipeFromList';
import { Api } from 'utils/api';
import { useRecipeContext } from '../../App';
import RecipeItem from './components/RecipeItem/RecipeItem';

const RecipeList = () => {
	const { recipeList, setRecipeList } = useRecipeContext();
	const api = new Api();

	useEffect(() => {
		const loadRecepes = async () => {
			const response = await api.getRecipes();

			const recipesToSet: RecipeFromList[] = response?.results?.map(
				(item: any) => {
					return {
						id: item.id,
						title: item.title,
						image: item.image,
						readyInMinutes: item.readyInMinutes,
						calories: item.nutrition.nutrients?.[0]?.amount,
						ingredients: item.nutrition.ingredients
							.map((item: any) => item.name)
							.join(', '),
					};
				},
			);

			setRecipeList(recipesToSet);
		};

		loadRecepes();
	}, []);

	return (
		<div className={styles.recipe_list}>
			{recipeList?.map((item: RecipeFromList) => (
				<RecipeItem
					key={item.id}
					{...item}
				/>
			))}
		</div>
	);
};

export default RecipeList;
