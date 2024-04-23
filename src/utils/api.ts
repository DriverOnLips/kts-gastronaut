import axios from 'axios';
import { RecipeFromList, RecipeType } from 'types';

export class Api {
	private static instance: Api;
	private domain: string = 'https://api.spoonacular.com/';
	private config: { name: string; url: string }[] = [
		{ name: 'getRecipes', url: `${this.domain}recipes/complexSearch?` },
		{ name: 'getRecipeInfo', url: `${this.domain}recipes/` },
	];
	// private token: string = 'd1042c6f8c84432bbd5b508bca52c270';
	private token: string = 'c1ed0064ec724ead8177ab8848ea4dc8';
	// private token: string = 'd1042c6f8c84432bbd5b508bca52c270';
	// private token: string = 'b4be191811054ad3bbb2438df1158ca7';
	// private token: string = '2f57ba40700b492a98d46c16cb731636';
	// private token: string = '96b03ded692d45b391ec26a66cf00564';
	// private token: string = '3a40e1bfe3084f53b0d475f56d06468b';
	// private token: string = '5884e4538ade47a3bee00a8bed3eb378';
	// private token: string = 'b628c4fc31ce4a519836f0bfa06853a4';
	// private token: string = 'af79edba6a414c9f92d551e45dcd08b1';
	// private token: string = 'e31e1cb391a9463893f57a751d12c66a';

	// private token: string = '5612ded2c55f4a42aafe5dd7fdec9f3f';

	constructor() {
		if (Api.instance) {
			return Api.instance;
		}

		Api.instance = this;

		this.domain = 'https://api.spoonacular.com/';
	}

	getRecipes = async (
		count = 10,
		offset?: number,
	): Promise<RecipeFromList[] | Error> => {
		const configItem = this.config.find((item) => item.name === 'getRecipes');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecipes');
		}

		const params = {
			apiKey: this.token,
			number: count,
			...(offset && { offset }),
		};

		try {
			const res = await axios.get(`${configItem.url}addRecipeNutrition=true`, {
				params: params,
			});
			return res?.data.results;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Error(errorMessage);
		}
	};

	getRecipeInfo = async (id: string): Promise<RecipeType | Error> => {
		const configItem = this.config.find(
			(item) => item.name === 'getRecipeInfo',
		);

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecipeInfo');
		}

		const params = {
			apiKey: this.token,
		};

		return axios
			.get(`${configItem.url}${id}/information?`, {
				params: params,
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return error?.response?.data;
			});
	};
}
