import {
	action,
	computed,
	makeObservable,
	observable,
	runInAction,
} from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import {
	IRecipePageStore,
	getRecipeInfoParams,
} from 'stores/RecipePageStore/types';
import {
	RecipeTypeModel,
	normalizeRecipeType,
} from 'types/RecipeType/RecipeType';
import { Api } from 'utils/api';
import { log } from 'utils/log';
import { Meta } from 'utils/meta';

type PrivateFields = '_recipeInfo' | '_meta' | '_api';

export default class RecipePageStore implements IRecipePageStore, ILocalStore {
	private _recipeInfo: RecipeTypeModel | null = null;
	private _meta: Meta = Meta.initial;
	private _api = new Api();

	constructor() {
		makeObservable<RecipePageStore, PrivateFields>(this, {
			_recipeInfo: observable,
			_meta: observable,
			_api: observable,
			recipeInfo: computed,
			meta: computed,
			getRecipeInfo: action,
			deleteRecipeInfo: action,
		});
	}

	get recipeInfo(): RecipeTypeModel | null {
		return this._recipeInfo;
	}

	get meta(): Meta {
		return this._meta;
	}

	async getRecipeInfo(params: getRecipeInfoParams): Promise<void> {
		this._meta = Meta.loading;
		this._recipeInfo = null;

		const response = await this._api.getRecipeInfo(params.id);

		runInAction(() => {
			if (!(response instanceof Error)) {
				try {
					this._meta = Meta.success;
					this._recipeInfo = normalizeRecipeType(response);
				} catch (error) {
					log(error);
					this._meta = Meta.error;
					this._recipeInfo = null;
				}

				return;
			}

			log(response);
			this._meta = Meta.error;
		});
	}

	deleteRecipeInfo(): void {
		this._recipeInfo = null;
	}

	destroy(): void {
		this.deleteRecipeInfo();
	}
}
