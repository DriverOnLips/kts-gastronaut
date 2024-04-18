import React, { useContext, useEffect } from 'react';

import { DishFromList } from 'types/DishFromList';
import { Api } from 'utils/api';
import { useDishContext } from '../../App';
import DishItem from './components/DishItem/DishItem';
import styles from './DishList.module.scss';

const DishList = () => {
	const { dishList, setDishList } = useDishContext();
	const api = new Api();

	useEffect(() => {
		const loadRecepes = async () => {
			const response = await api.getRecipes();

			const dishesToSet: DishFromList[] = response?.results?.map(
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

			setDishList(dishesToSet);
		};

		loadRecepes();
	}, []);

	return (
		<div className={styles.dish_list}>
			{dishList?.map((item: DishFromList) => (
				<DishItem
					key={item.id}
					{...item}
				/>
			))}
		</div>
	);
};

export default DishList;
