/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loader from 'components/Loader/Loader';
import Text from 'components/Text/Text';
import rootStore from 'stores/RootStore/instance';
import { RecipeFromListModel } from 'types/RecipeFromList/RecipeFromList';
import InfinityList from './components/InfinityList/InfinityList';
import styles from './SavedRecipes.module.scss';

const SavedRecipes = () => {
	const navigate = useNavigate();
	const { isLoggedIn, user } = rootStore.authorization;
	const [savedRecipes, setSavedRecipes] = useState<RecipeFromListModel[]>([]);
	const [delayComplete, setDelayComplete] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDelayComplete(true);
		}, 0);

		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (!delayComplete) return;

		if (!isLoggedIn || !user) {
			toast.message('Authorization required', {
				description: 'To save recipes you need to log in to your account',
				className: 'notification',
				duration: 3000,
			});
			navigate('/login');

			return;
		}

		const userItems = JSON.parse(localStorage.getItem(user.username) || '[]');
		setSavedRecipes(userItems);
	}, [isLoggedIn, user, navigate, delayComplete]);

	return (
		<div className={styles.saved_recipes}>
			<Text
				className={styles.saved_recipes__title}
				size='s3'
				weight='bold'
				text_align='center'
			>
				Saved recipes
			</Text>
			{delayComplete ? (
				savedRecipes.length > 0 ? (
					<InfinityList recipeList={savedRecipes} />
				) : (
					<Text
						className={styles.saved_recipes__title}
						size='s5'
						text_align='center'
					>
						No saved recipes
					</Text>
				)
			) : (
				<Loader />
			)}
		</div>
	);
};

export default SavedRecipes;
