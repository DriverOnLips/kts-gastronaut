import QueryParamsStore from './QueryParamsStore/QueryParamsStore';

export default class RootStore {
	readonly query = new QueryParamsStore();
}
