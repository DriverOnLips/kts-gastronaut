import axios from 'axios';
import { toast } from 'sonner';
import { RecipeFromListResponse } from 'types/RecipeFromList/RecipeFromList';
import { RecipeTypeApi } from 'types/RecipeType/RecipeType';
// import { recipeListMock } from 'utils/mocks/recipeListMock';

export class Api {
	private static instance: Api;
	private domain: string = 'https://api.spoonacular.com/';
	private config: { name: string; url: string }[] = [
		{ name: 'getRecipes', url: `${this.domain}recipes/complexSearch?` },
		{ name: 'getRecipeInfo', url: `${this.domain}recipes/` },
	];

	private tokens: { [key: string]: boolean } = {
		// d1042c6f8c84432bbd5b508bca52c270: true,
		// '96b03ded692d45b391ec26a66cf00564': true,
		// c1ed0064ec724ead8177ab8848ea4dc8: true,
		// b4be191811054ad3bbb2438df1158ca7: true,
		// '3a40e1bfe3084f53b0d475f56d06468b': true,
		// '2f57ba40700b492a98d46c16cb731636': true,
		// b628c4fc31ce4a519836f0bfa06853a4: true,
		af79edba6a414c9f92d551e45dcd08b1: true,

		e31e1cb391a9463893f57a751d12c66a: true,
		'5612ded2c55f4a42aafe5dd7fdec9f3f': true,
		'25fe1d1f78d44884a4dc6257d93f71c3': true,

		// '98b660fd6fca46038e2189b0fe7ae07e': true, // my token
		// '93048fe8089642c2a16619633c8875da': true,
	};
	private tokenKeys!: string[];

	constructor() {
		if (Api.instance) {
			return Api.instance;
		}

		Api.instance = this;

		this.domain = 'https://api.spoonacular.com/';
		this.tokenKeys = this.shuffleTokens(Object.keys(this.tokens));
	}

	private shuffleTokens(tokens: string[]): string[] {
		for (let i = tokens.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[tokens[i], tokens[j]] = [tokens[j], tokens[i]];
		}
		return tokens;
	}

	private async requestWithToken(url: string, params: any): Promise<any> {
		for (const token of this.tokenKeys) {
			if (this.tokens[token]) {
				params.apiKey = token;
				try {
					const res = await axios.get(url, { params });
					return res?.data;
				} catch (error: any) {
					if (error.response && error.response.status === 402) {
						// return recipeListMock;
						this.tokens[token] = false;
					} else {
						throw error;
					}
				}
			}
		}
		toast.message('Tokens have run out', {
			description: 'We are waiting for you tomorrow',
			className: 'notification',
			duration: 3000,
		});
		throw new Error('All tokens are invalid.');
	}

	getRecipes = async (
		count = 10,
		page: number | null,
		query: string | null,
		type: string | null,
	): Promise<RecipeFromListResponse | Error> => {
		const configItem = this.config.find((item) => item.name === 'getRecipes');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecipes');
		}

		const params = {
			number: count,
			...(page && { offset: (page - 1) * 100 }),
			...(!!query && { query }),
			...(!!type && { type }),
		};

		try {
			return await this.requestWithToken(
				`${configItem.url}addRecipeNutrition=true`,
				params,
			);
		} catch (error: any) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Error(errorMessage);
		}
	};

	getRecipeInfo = async (id: string): Promise<RecipeTypeApi | Error> => {
		const configItem = this.config.find(
			(item) => item.name === 'getRecipeInfo',
		);

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecipeInfo');
		}

		const params = {};

		try {
			return await this.requestWithToken(
				`${configItem.url}${id}/information?`,
				params,
			);
		} catch (error: any) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Error(errorMessage);
		}
	};
}
