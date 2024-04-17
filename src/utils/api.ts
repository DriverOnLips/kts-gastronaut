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
		const token = 'c1ed0064ec724ead8177ab8848ea4dc8';
		this.token = token;
		this.config = [
			{ name: 'getRecepes', url: `${this.domain}recipes/complexSearch?` },
		];
	}

	getRecepes = async (): Promise<any> => {
		const configItem = this.config.find((item) => item.name === 'getRecepes');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getRecepes');
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
}
