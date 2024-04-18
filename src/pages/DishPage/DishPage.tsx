import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDishContext } from '../../App';
import { Api } from '../../utils/api';
import { DishType } from '../../types/DishType';
import Text from '../../components/Text/Text';

const DishPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { dish, setDish } = useDishContext();
	const api = new Api();

	useEffect(() => {
		if (!id || isNaN(+id)) {
			navigate('/404');

			return;
		}

		const loadDish = async () => {
			const response = await api.getRecipeInfo(+id);
			const dishToSet: DishType = {
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
					(item: any) => item.original
				),
				equipment: response.analyzedInstructions?.[0]?.steps?.map(
					(item: any) => item.equipment?.[0]?.localizedName
				),
				steps: response.analyzedInstructions?.[0]?.steps?.map(
					(item: any) => item.step
				),
			};

			setDish(dishToSet);
			setIsLoaded(true);
		};

		loadDish();
	}, []);

	return (
		<>
			{isLoaded ? (
				<>
					<Text
						className=''
						size='s3'
						text_align='center'
						weight='bold'
					>
						{dish.title}
					</Text>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default DishPage;
