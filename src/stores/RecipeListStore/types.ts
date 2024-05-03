export type getRecipesParams = {
	count: number;
	offset: number | null;
	query: string | null;
	type: string | null;
};

export interface IRecipeListStore {
	getRecipes(params: getRecipesParams): Promise<void>;
}
