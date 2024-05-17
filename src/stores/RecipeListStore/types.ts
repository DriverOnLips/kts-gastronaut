export type getRecipesParams = {
	count: number;
	page: number | null;
	query: string | null;
	type: string | null;
};

export interface IRecipeListStore {
	getRecipes(params: getRecipesParams): Promise<void>;
}
