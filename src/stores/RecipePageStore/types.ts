export type getRecipeInfoParams = {
	id: string;
};

export interface IRecipePageStore {
	getRecipeInfo(params: getRecipeInfoParams): Promise<void>;
}
