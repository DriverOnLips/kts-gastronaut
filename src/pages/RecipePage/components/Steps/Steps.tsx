import * as React from 'react';
import Text from 'components/Text/Text';
import styles from '../../RecipePage.module.scss';

type StepsProps = {
	steps: string[];
};

const Steps: React.FC<StepsProps> = ({ steps }) => {
	return (
		<div className={styles.recipe_page_content__steps}>
			<Text
				size='s4'
				text_align='start'
				weight='bold'
				color='primary'
			>
				Directions
			</Text>
			<div className={`${styles['recipe_page_content__steps-div']} my-4`}>
				{steps?.map((step: string, index: number) => (
					<>
						{steps && (
							<div
								key={index}
								className={styles.recipe_page_content__steps_item}
							>
								<Text
									size='s5'
									text_align='start'
									weight='bold'
									color='primary'
								>
									Step {index + 1}
								</Text>
								<Text
									size='s5'
									text_align='start'
									weight='medium'
									color='primary'
								>
									{step}
								</Text>
							</div>
						)}
					</>
				))}
			</div>
		</div>
	);
};

export default Steps;
