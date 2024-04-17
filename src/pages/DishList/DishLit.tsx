import React, { useContext, useEffect } from 'react';

import styles from './DishList.module.scss';

import { Api } from '../../utils/api';
import { useDishContext } from '../../App';
import { DishFromList } from '../../types/DishFromList';
import DishItem from './components/DishItem/DishItem';

const DishList = () => {
	const { dish, setDish } = useDishContext();
	const api = new Api();

	useEffect(() => {
		const loadRecepes = async () => {
			const response = await api.getRecepes();

			const dishToSet: DishFromList[] = response?.results?.map((item: any) => {
				return {
					id: item.id,
					title: item.title,
					image: item.image,
					dishTypes: item.dishTypes?.join(', '),
				};
			});

			setDish(dishToSet);
		};

		loadRecepes();
	}, []);

	return (
		<div className={styles.dish_list}>
			{dish?.map((item: DishFromList) => (
				<DishItem
					key={item.id}
					{...item}
				/>
			))}
		</div>
	);
};

export default DishList;
