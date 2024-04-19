export type RecipeType = {
	id: number;
	title: string;
	image: string;
	preparationMinutes: number;
	cookingMinutes: number;
	readyInMinutes: number;
	servings: number;
	aggregateLikes: number;
	summary: string;
	ingredients: string[];
	equipment: string[];
	steps: string[];
};
