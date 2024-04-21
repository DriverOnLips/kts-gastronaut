import * as React from 'react';

import Text from 'components/Text/Text';
import styles from '../../RecipePage.module.scss';
import equipment_svg from '../svg/equipment.svg';

type EquipmentProps = {
	equipment: string[];
};

const Equipment: React.FC<EquipmentProps> = ({ equipment }) => {
	return (
		<div className={`${styles.recipe_page_content__equipment}`}>
			<Text
				size='s4'
				text_align='start'
				weight='bold'
				color='primary'
			>
				Equipment
			</Text>
			<div className={`${styles.recipe_page_content__equipment__content} my-4`}>
				{equipment?.map((equipment_item: string, index: number) => (
					<div key={index}>
						{equipment_item && (
							<>
								<img src={equipment_svg} />
								<Text
									size='s5'
									text_align='start'
									weight='medium'
									color='primary'
								>
									{equipment_item}
								</Text>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Equipment;
