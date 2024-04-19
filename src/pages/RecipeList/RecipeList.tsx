import { useEffect, useState } from 'react';

import styles from './RecipeList.module.scss';

import { RecipeFromList } from 'types/RecipeFromList';
import { Api } from 'utils/api';
import { useRecipeContext } from '../../App';
import RecipeItem from './components/RecipeItem/RecipeItem';
import intro from 'assets/img/intro.png';
import Loader from 'components/Loader/Loader';

const RecipeList = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
						calories: Math.round(item.nutrition.nutrients?.[0]?.amount),
						ingredients: item.nutrition.ingredients
							.map((item: any) => item.name)
							.join(' + '),
					};
				},
			);

			setRecipeList(recipesToSet);
		};

		if (recipeList?.length < 1) {
			loadRecepes();
		}
	}, []);

	useEffect(() => {
		if (recipeList?.length > 0) {
			setIsLoaded(true);
		}
	}, [recipeList]);

	return (
		<div className={styles.recipe_list}>
			{isLoaded ? (
				<>
					<img
						src={intro}
						className={styles.recipe_list__intro}
					/>
					<div className={`${styles.recipe_list__container} my-1`}>
						{recipeList?.map((item: RecipeFromList) => (
							<RecipeItem
								key={item.id}
								{...item}
							/>
						))}
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default RecipeList;
