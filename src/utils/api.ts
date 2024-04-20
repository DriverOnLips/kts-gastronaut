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
		// const token = 'b4be191811054ad3bbb2438df1158ca7';
		// const token = '2f57ba40700b492a98d46c16cb731636';
		// const token = '96b03ded692d45b391ec26a66cf00564';
		// const token = '3a40e1bfe3084f53b0d475f56d06468b';
		const token = '5884e4538ade47a3bee00a8bed3eb378';
		// const token = 'b628c4fc31ce4a519836f0bfa06853a4';

		// const token = '5612ded2c55f4a42aafe5dd7fdec9f3f';

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
