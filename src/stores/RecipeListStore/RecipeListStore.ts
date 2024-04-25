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

type PrivateFields = '_recipeList' | '_meta' | '_api';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
	private _recipeList: CollectionModel<number, RecipeFromListModel> =
		getInitialCollectionModel();
	private _meta: Meta = Meta.initial;
	private _api = new Api();

	constructor() {
		makeObservable<RecipeListStore, PrivateFields>(this, {
			_recipeList: observable.ref,
			_meta: observable,
			_api: observable,
			recipeList: computed,
			meta: computed,
			getRecipes: action,
		});
	}

	get recipeList(): RecipeFromListModel[] {
		return linearizeCollection(this._recipeList);
	}

	get meta(): Meta {
		return this._meta;
	}

	async getRecipes(params: getRecipesParams): Promise<void> {
		this._meta = Meta.loading;
		this._recipeList = getInitialCollectionModel();

		const response = await this._api.getRecipes(params.count, params.offset);

		runInAction(() => {
			if (!(response instanceof Error)) {
				try {
					const recipeList: RecipeFromListModel[] = [];
					for (const item of response) {
						recipeList.push(normalizeRecipeFromList(item));
					}

					this._meta = Meta.success;
					this._recipeList = normalizeCollection(
						recipeList,
						(recipeItem) => recipeItem.id,
					);
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
		this._qpReaction();
	}

	private readonly _qpReaction: IReactionDisposer = reaction(
		() => rootStore.query.getParam('search'),
		(search) => {
			log(`search value changed:${search}`);
		},
	);
}
