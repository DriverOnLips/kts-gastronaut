import axios from 'axios';

export class Api {
	private static instance: Api;
	private config!: { name: string; url: string }[];
	private domain!: string;
	private token!: string;

	constructor() {
		if (Api.instance) {
			return Api.instance;
		}

		Api.instance = this;

		this.domain = 'https://api.spoonacular.com/';
		// const token = 'c1ed0064ec724ead8177ab8848ea4dc8';
		// const token = 'd1042c6f8c84432bbd5b508bca52c270';
		// const token = '5612ded2c55f4a42aafe5dd7fdec9f3f';
		const token = 'b4be191811054ad3bbb2438df1158ca7';
		this.token = token;
		this.config = [
			{ name: 'getRecipes', url: `${this.domain}recipes/complexSearch?` },
			{ name: 'getRecipeInfo', url: `${this.domain}recipes/` },
		];
	}

	getRecipes = async (): Promise<any> => {
		const configItem = this.config.find((item) => item.name === 'getRecipes');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecipes');
		}

		const params = {
			apiKey: this.token,
		};

		return axios
			.get(`${configItem.url}addRecipeNutrition=true`, {
				params: params,
			})
			.then((res) => {
				return res?.data;
			})
			.catch((error) => {
				return error?.response?.data;
			});
	};

	getRecipeInfo = async (id: number): Promise<any> => {
		const configItem = this.config.find(
			(item) => item.name === 'getRecipeInfo'
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
