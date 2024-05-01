import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon/ArrowDownIcon';
import MultiDropdownStore from 'stores/MultiDropdownStore/MultiDropdownStore';
import { Option } from 'stores/MultiDropdownStore/types';
import styles from './MultiDropdown.module.scss';

export type MultiDropdownProps = {
	className?: string;
	dropdownStore: MultiDropdownStore;
	onMultiDropdownClick?(value: string): void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
	className,
	dropdownStore,
	onMultiDropdownClick,
}) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const onDocumetClick = (e: MouseEvent) => {
			if (!dropdownRef.current?.contains(e.target as Element)) {
				dropdownStore.setIsOpen(false);
				dropdownStore.setInputText('');
			}
		};

		document.addEventListener('click', onDocumetClick);

		return () => {
			document.removeEventListener('click', onDocumetClick);
		};
	}, [dropdownStore]);

	const onInputClick = useCallback(() => {
		dropdownStore.setIsOpen(true);
	}, [dropdownStore]);

	useEffect(() => {
		if (!onMultiDropdownClick) return;

		onMultiDropdownClick(dropdownStore.title);
	}, [dropdownStore.values, dropdownStore.title, onMultiDropdownClick]);

	return (
		<div
			ref={dropdownRef}
			className={cn(
				styles.dropdown,
				dropdownStore.isOpen && styles.dropdown_open,
				// disabled && styles.dropdown_disabled,
				className,
			)}
		>
			<Input
				className={styles.dropdown__input}
				value={dropdownStore.inputText}
				placeholder={dropdownStore.title}
				onChange={dropdownStore.setInputText}
				onClick={onInputClick}
				afterSlot={
					<ArrowDownIcon
						color='secondary'
						width={24}
						height={24}
					/>
				}
			/>
			{dropdownStore.isOpen && (
				<div className={styles.dropdown__options}>
					{dropdownStore.values.map((option: Option, index: number) => (
						<button
							key={index}
							className={cn(
								styles.dropdown__option,
								option.isSelected && styles.dropdown__option_selected,
							)}
							onClick={() => dropdownStore.onItemClick(option)}
						>
							<Text key={index}>{option.value}</Text>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default observer(MultiDropdown);
