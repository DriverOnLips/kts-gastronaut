import React, { memo } from 'react';
import search from 'assets/svg/search.svg';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';

const Filters = () => {
	return (
		<>
			<div className={styles.recipe_list__input_search}>
				<div className={styles['recipe_list__input_search__input-div']}>
					<Input
						placeholder='Enter dishes'
						value={inputStore.value}
						onChange={onInputChange}
					/>
				</div>

				<div onClick={onButtonClick}>
					<Button>
						<img
							src={search}
							style={{ display: 'flex' }}
						/>
					</Button>
				</div>
			</div>
			<div className={styles.recipe_list__categories}>
				<MultiDropdown
					className={styles['recipe_list__categories-div']}
					dropdownStore={dropdownStore}
					onMultiDropdownClick={onMultiDropdownClick}
				/>
			</div>
		</>
	);
};

export default memo(Filters);
