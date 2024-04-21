import React, { useEffect, useRef, useState } from 'react';

import intro from 'assets/img/intro.png';
import Loader from 'components/Loader/Loader';
import { RecipeFromList } from 'types/RecipeFromList';
import { Api } from 'utils/api';
import { useRecipeContext } from '../../App';
import RecipeItem from './components/RecipeItem/RecipeItem';
import styles from './RecipeList.module.scss';

const RecipeList = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const offsetRef = useRef(0);

	const { recipeList, setRecipeList } = useRecipeContext();
	const api = new Api();

	const loadRecepes = async () => {
		const response = await api.getRecipes(10, offsetRef.current);

		const recipesToSet = response?.results?.map((item: any) => ({
			id: item.id,
			title: item.title,
			image: item.image,
			readyInMinutes: item.readyInMinutes,
			calories: Math.round(item.nutrition.nutrients?.[0]?.amount),
			ingredients: item.nutrition.ingredients
				.map((item: any) => item.name)
				.join(' + '),
		}));

		setRecipeList((prevRecipes) => [...prevRecipes, ...recipesToSet]);
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
