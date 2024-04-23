import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { RecipeFromList } from 'types/RecipeFromList';
import { Api } from 'utils/api';
import { useRecipeContext } from '../../App';
import styles from './RecipeList.module.scss';

const RecipeList = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const offsetRef = useRef(0);

	const navigate = useNavigate();

	const { recipeList, setRecipeList } = useRecipeContext();
	const api = new Api();

	const loadRecepes = async () => {
		const response = await api.getRecipes(10, offsetRef.current);

		if (response instanceof Error) {
			console.error(
				'Произошла ошибка при получении рецептов:',
				response.message,
			);
			return;
		}

		const recipesToSet: RecipeFromList[] = response?.map((item) => ({
			...item,
			calories: Math.round(item.nutrition.nutrients?.[0]?.amount),
			ingredients: item.nutrition.ingredients
				.map((ingredient: { name: string }) => ingredient.name)
				.join(' + '),
		}));

		setRecipeList((prevRecipes: RecipeFromList[]) => [
			...prevRecipes,
			...recipesToSet,
		]);
		offsetRef.current += 10;
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const scrollHeight = document.documentElement.scrollHeight;
			const clientHeight = document.documentElement.clientHeight;
			const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;

			if (scrolledToBottom) {
				loadRecepes();
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (recipeList?.length <= 0) {
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
							<Card
								key={item.id}
								actionSlot={<Button>Save</Button>}
								captionSlot={item.readyInMinutes + ' minutes'}
								contentSlot={item.calories + ' kcal'}
								image={item.image}
								title={item.title}
								subtitle={item.ingredients}
								onButtonClick={() => {}}
								onItemClick={() => navigate(`/recipe/${item.id}`)}
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
