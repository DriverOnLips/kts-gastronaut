/* eslint-disable react/react-in-jsx-scope */
import { observer } from 'mobx-react-lite';
import { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import intro from 'assets/img/intro.png';
import search from 'assets/svg/search.svg';
import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Loader from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Pages from 'components/Pagination/Pagination';
import { useLocalStore } from 'hooks/useLocalStore';
import RecipeListStore from 'stores/RecipeListStore/RecipeListStore';
import { useQueryParamsStore } from 'stores/RootStore/hooks/useQueryParamsStore';
import List from './components/List/List';
import styles from './RecipeList.module.scss';
import React from 'react';

const RecipeList = () => {
	useQueryParamsStore();

	const intoroRef = useRef<HTMLImageElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const [listIncrease, setListIncrease] = useState<boolean>(false);
	const [lastScrollPosition, setLastScrollPosition] = useState(0);

	const navigate = useNavigate();

	const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

	const recipeListStore = useLocalStore(() => new RecipeListStore());
	const {
		inputStore,
		dropdownStore,
		recipeList,
		offset,
		isSuccess,
		incrementOffset,
		getRecipes,
		getNewRecipes,
	} = recipeListStore;

	const onButtonClick = useCallback(() => {
		const params = new URLSearchParams(window.location.search);

		getRecipes({
			count: 100,
			offset,
			query: params.get('query') || null,
			type: params.get('type') || null,
		});
	}, [getRecipes]);

	const onInputChange = useCallback(
		(value: string) => {
			inputStore.setValue(value);

			const newSearchParams = new URLSearchParams(window.location.search);
			newSearchParams.set('query', value);
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		},
		[inputStore, navigate],
	);

	const onMultiDropdownClick = useCallback(
		(value: string) => {
			const newSearchParams = new URLSearchParams(window.location.search);
			value !== 'Choose a category'
				? newSearchParams.set('type', value)
				: newSearchParams.set('type', '');
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		},
		[navigate],
	);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		getRecipes({
			count: 100,
			offset,
			query: params.get('query') || null,
			type: params.get('type') || null,
		});
	}, [getRecipes]);

	// Used for addition data to list

	useEffect(() => {
		if (isAtEnd) {
			setIsAtEnd(false);
			incrementOffset();

			const newSearchParams = new URLSearchParams(window.location.search);
			newSearchParams.set('offset', String(offset + 100));
			navigate(`?${newSearchParams.toString()}`, { replace: true });

			const params = new URLSearchParams(window.location.search);

			getNewRecipes({
				count: 100,
				offset: offset + 100,
				query: params.get('query') || null,
				type: params.get('type') || null,
			});
		}
	}, [isAtEnd, navigate, incrementOffset, getNewRecipes]);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			const targetNode = event.target;

			if (listRef.current?.contains(targetNode)) {
				return;
			}

			if (event.deltaY > 0) {
				intoroRef.current?.classList.add(styles['hide-image']);
				setListIncrease(true);
			} else {
				intoroRef.current?.classList.remove(styles['hide-image']);
				setListIncrease(false);
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (listRef.current?.contains(event.target)) {
				return;
			}

			const touch = event.touches[0];
			const currentScrollPosition = touch.clientY;

			setLastScrollPosition((prevPosition: number) => {
				if (currentScrollPosition > prevPosition) {
					intoroRef.current?.classList.remove(styles['hide-image']);
					setListIncrease(false);
				} else if (currentScrollPosition < prevPosition) {
					intoroRef.current?.classList.add(styles['hide-image']);
					setListIncrease(true);
				}

				return currentScrollPosition;
			});
		};

		window.addEventListener('wheel', handleWheel);
		window.addEventListener('touchmove', handleTouchMove);

		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchmove', handleTouchMove);
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<div className={styles.recipe_list}>
			<>
				<img
					ref={intoroRef}
					src={intro}
					className={styles.recipe_list__intro}
				/>
				<div className={styles.recipe_list__input_search}>
					<div className={styles['recipe_list__input_search__input-div']}>
						<Input
							value={inputStore.value}
							onChange={onInputChange}
							placeholder='Enter dishes'
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
				{isSuccess ? (
					<>
						<div ref={listRef}>
							<List
								recipeList={recipeList}
								setIsAtEnd={setIsAtEnd}
								increase={listIncrease}
							/>
						</div>

						<Pages
							page={1}
							pages={5}
						/>
					</>
				) : (
					<Loader />
				)}
			</>
		</div>
	);
};

export default observer(RecipeList);
