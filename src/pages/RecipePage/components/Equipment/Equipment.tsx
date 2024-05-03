import * as React from 'react';

import { memo } from 'react';
import Text from 'components/Text/Text';
import styles from '../../RecipePage.module.scss';
import equipment_svg from '../svg/equipment.svg';
import separator_1 from '../svg/separator_1.svg';

type EquipmentProps = {
	equipment: string[];
};

const Equipment: React.FC<EquipmentProps> = ({ equipment }) => {
	return (
		<div className={`${styles.recipe_page_content__equipment}`}>
			<div
				className={`px-3 ${styles.recipe_page_content__ingredients_equipment__separator}`}
			>
				<img src={separator_1} />
				<div style={{ width: 1, height: '100%', backgroundColor: '#B5460F' }} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Text
					size='s4'
					text_align='start'
					weight='bold'
					color='primary'
				>
					Equipment
				</Text>
				<div
					className={`${styles.recipe_page_content__equipment__content} my-4`}
				>
					{equipment?.map((equipment_item: string, index: number) => (
						<div key={index}>
							{equipment_item && (
								<div
									style={{
										display: 'flex',
										gap: '0.5rem',
										margin: '0.5rem 0',
									}}
								>
									<img
										src={equipment_svg}
										style={{ width: 24 }}
									/>
									<Text
										size='s5'
										text_align='start'
										weight='medium'
										color='primary'
									>
										{equipment_item}
									</Text>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(Equipment);
