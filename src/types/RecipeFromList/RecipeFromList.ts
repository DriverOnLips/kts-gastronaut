type IngredientFromRecipe = {
	name: string;
};

type NutrientFromRecipe = {
	amount: number;
};

type NutritionFromRecipe = {
	nutrients: NutrientFromRecipe[];
	ingredients: IngredientFromRecipe[];
};

export type RecipeFromListApi = {
	id: number;
	title: string;
	image: string;
	readyInMinutes: number;
	nutrition: NutritionFromRecipe;
};

export type RecipeFromListModel = {
	id: number;
	title: string;
	image: string;
	readyInMinutes: number;
	calories: number;
	ingredients: string;
};

export const normalizeRecipeFromList = (
	from: RecipeFromListApi,
): RecipeFromListModel => ({
	...from,
	readyInMinutes: Math.max(0, from.readyInMinutes),
	calories: Math.round(from.nutrition.nutrients?.[0]?.amount),
	ingredients: from.nutrition.ingredients
		.map((ingredient: IngredientFromRecipe) => ingredient.name)
		.join(' + '),
});
