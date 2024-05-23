import * as React from 'react';
import search from 'assets/svg/search.svg';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import InputStore from 'stores/InputStore/InputStore';
import MultiDropdownStore from 'stores/MultiDropdownStore/MultiDropdownStore';
import styles from './Filters.module.scss';

interface FiltersProps {
	inputStore: InputStore;
	onInputChange: (value: string) => void;
	onButtonClick: () => void;
	dropdownStore: MultiDropdownStore;
	onMultiDropdownClick: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
	inputStore,
	onInputChange,
	onButtonClick,
	dropdownStore,
	onMultiDropdownClick,
}) => {
	return (
		<>
			<div className={styles.input_search}>
				<div className={styles['input_search__input-div']}>
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
							alt='Search'
						/>
					</Button>
				</div>
			</div>
			<div className={styles.categories}>
				<MultiDropdown
					className={styles['categoties-div']}
					dropdownStore={dropdownStore}
					onMultiDropdownClick={onMultiDropdownClick}
				/>
			</div>
		</>
	);
};

export default Filters;
