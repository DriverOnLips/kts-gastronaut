import {
	IReactionDisposer,
	action,
	computed,
	makeObservable,
	observable,
	reaction,
	runInAction,
} from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import InputStore from 'stores/InputStore/InputStore';
import MultiDropdownStore from 'stores/MultiDropdownStore/MultiDropdownStore';
import rootStore from 'stores/RootStore/instance';
import {
	RecipeFromListModel,
	normalizeRecipeFromList,
} from 'types/RecipeFromList/RecipeFromList';
import {
	CollectionModel,
	getInitialCollectionModel,
	linearizeCollection,
	normalizeCollection,
} from 'types/shared/collection';
import { Api } from 'utils/api';
import { log } from 'utils/log';
import { Meta } from 'utils/meta';
import { IRecipeListStore, getRecipesParams } from './types';

type PrivateFields = '_recipeList' | '_meta' | '_api' | '_offset';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
	private _recipeList: CollectionModel<number, RecipeFromListModel> =
		getInitialCollectionModel();
	private _meta: Meta = Meta.initial;
	private _api = new Api();
	private _offset;

	public inputStore = new InputStore();
	public dropdownStore = new MultiDropdownStore();

	constructor() {
		makeObservable<RecipeListStore, PrivateFields>(this, {
			_recipeList: observable.ref,
			_meta: observable,
			_api: observable,
			_offset: observable,
			inputStore: observable,
			dropdownStore: observable,
			recipeList: computed,
			meta: computed,
			offset: computed,
			incrementOffset: action.bound,
			getRecipes: action.bound,
			getNewRecipes: action.bound,
		});

		this._offset = +(rootStore.query.getParam('offset') || 0);

		const setDropdown = () => {
			const options = [
				{ value: 'main course', isSelected: false },
				{ value: 'side dish', isSelected: false },
				{ value: 'dessert', isSelected: false },
				{ value: 'appetizer', isSelected: false },
				{ value: 'salad', isSelected: false },
				{ value: 'bread', isSelected: false },
				{ value: 'breakfast', isSelected: false },
				{ value: 'soup', isSelected: false },
				{ value: 'beverage', isSelected: false },
				{ value: 'souce', isSelected: false },
				{ value: 'marinade', isSelected: false },
				{ value: 'fingerfood', isSelected: false },
				{ value: 'snack', isSelected: false },
				{ value: 'drink', isSelected: false },
			];

			const type =
				rootStore.query.getParam('type') !== undefined
					? String(rootStore.query.getParam('type'))
					: null;

			const newOptions = options.map((option) =>
				type?.includes(option.value)
					? { ...option, isSelected: !option.isSelected }
					: option,
			);

			this.dropdownStore.setOptions(newOptions);
			this.dropdownStore.setValues(newOptions);
		};

		const setInput = () => {
			const query =
				rootStore.query.getParam('query') !== undefined
					? String(rootStore.query.getParam('query'))
					: null;

			if (query) this.inputStore.setValue(query);
		};

		setDropdown();
		setInput();
	}

	get recipeList(): RecipeFromListModel[] {
		return linearizeCollection(this._recipeList);
	}

	get meta(): Meta {
		return this._meta;
	}

	get offset(): number {
		return this._offset;
	}

	incrementOffset(): void {
		this._offset += 100;
	}

	async getRecipes(params: getRecipesParams): Promise<void> {
		switch (this._meta) {
			case Meta.initial:
				this._meta = Meta.loading;
				break;
			case Meta.success:
				this._meta = Meta.loading;
				break;
			case Meta.loading:
				return;
			default:
				break;
		}

		this._recipeList = getInitialCollectionModel();

		const response = await this._api.getRecipes(
			params.count,
			params.offset,
			params.query,
			params.type,
		);

		runInAction(() => {
			if (!(response instanceof Error)) {
				try {
					const recipeToSet: RecipeFromListModel[] = [];
					for (const item of response) {
						recipeToSet.push(normalizeRecipeFromList(item));
					}

					this._recipeList = normalizeCollection(
						recipeToSet,
						(recipeItem) => recipeItem.id,
					);
					this._meta = Meta.success;
				} catch (error) {
					log(error);
					this._meta = Meta.error;
					this._recipeList = getInitialCollectionModel();
				}

				return;
			}

			log(response);
			this._meta = Meta.error;
		});
	}

	async getNewRecipes(params: getRecipesParams): Promise<void> {
		switch (this._meta) {
			case Meta.initial:
				this._meta = Meta.loading;
				break;
			case Meta.success:
				this._meta = Meta.loading;
				break;
			case Meta.loading:
				return;
			default:
				break;
		}

		const response = await this._api.getRecipes(
			params.count,
			params.offset,
			params.query,
			params.type,
		);

		runInAction(() => {
			if (!(response instanceof Error)) {
				try {
					const recipeToSet: RecipeFromListModel[] = [];
					for (const item of response) {
						recipeToSet.push(normalizeRecipeFromList(item));
					}

					this._recipeList = normalizeCollection(
						[...linearizeCollection(this._recipeList), ...recipeToSet],
						(recipeItem) => recipeItem.id,
					);
					this._meta = Meta.success;
				} catch (error) {
					log(error);
					this._meta = Meta.error;
					this._recipeList = getInitialCollectionModel();
				}

				return;
			}

			log(response);
			this._meta = Meta.error;
		});
	}

	destroy(): void {
		this.inputStore.destroy();
		// this._qpReaction();
	}

	// private readonly _qpReaction: IReactionDisposer = reaction(
	// 	() => ({
	// 		query:
	// 			rootStore.query.getParam('query') !== undefined
	// 				? String(rootStore.query.getParam('query'))
	// 				: null,
	// 		type:
	// 			rootStore.query.getParam('type') !== undefined
	// 				? String(rootStore.query.getParam('type'))
	// 				: null,
	// 	}),
	// 	({ query, type }) => {
	// 		this.getRecipes({
	// 			count: 100,
	// 			offset: 0,
	// 			query,
	// 			type,
	// 		});
	// 	},
	// );
}
