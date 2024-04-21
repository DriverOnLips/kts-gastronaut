import * as React from 'react';

import Text from 'components/Text/Text';
import styles from '../../RecipePage.module.scss';
import ingredient_svg from '../svg/ingredient.svg';

type IngredientsProps = {
	ingredients: string[];
};

const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {
	return (
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
				{ingredients?.map((ingredient: string, index: number) => (
					<div key={index}>
						{ingredient && (
							<>
								<img src={ingredient_svg} />
								<Text
									size='s5'
									text_align='start'
									weight='medium'
									color='primary'
								>
									{ingredient}
								</Text>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Ingredients;