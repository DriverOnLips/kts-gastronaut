export type getRecipesParams = {
	count: number;
	offset: number | null;
};

export interface IRecipeListStore {
	getRecipes(params: getRecipesParams): Promise<void>;
}
