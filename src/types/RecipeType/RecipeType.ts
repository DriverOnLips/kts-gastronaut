type EquipmentFromRecipeType = {
	localizedName: string;
};

type StepFromRecipeType = {
	step: string;
	equipment: EquipmentFromRecipeType[];
};

type InstructionFromRecipeType = {
	steps: StepFromRecipeType[];
};

type IngredientFromRecipeType = {
	original: string;
};

export type RecipeTypeApi = {
	id: number;
	title: string;
	image: string;
	preparationMinutes: number;
	cookingMinutes: number;
	readyInMinutes: number;
	servings: number;
	aggregateLikes: number;
	summary: string;
	extendedIngredients: IngredientFromRecipeType[];
	analyzedInstructions: InstructionFromRecipeType[];
};

export type RecipeTypeModel = {
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

export const normalizeRecipeType = (from: RecipeTypeApi): RecipeTypeModel => ({
	...from,
	preparationMinutes: Math.max(0, from.preparationMinutes),
	cookingMinutes: Math.max(0, from.cookingMinutes),
	readyInMinutes: Math.max(0, from.readyInMinutes),
	servings: Math.max(0, from.servings),
	aggregateLikes: Math.max(0, from.aggregateLikes),
	ingredients: from.extendedIngredients.map(
		(ingredient: IngredientFromRecipeType) => ingredient.original,
	),
	equipment: from.analyzedInstructions?.[0]?.steps?.map(
		(item: StepFromRecipeType) => item.equipment?.[0]?.localizedName,
	),
	steps: from.analyzedInstructions[0].steps?.map(
		(step: StepFromRecipeType) => step.step,
	),
});
