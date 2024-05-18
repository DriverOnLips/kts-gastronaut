import AuthorizationStore from './AuthorizatonStore/AuthorizationStore';
import QueryParamsStore from './QueryParamsStore/QueryParamsStore';

export default class RootStore {
	readonly query = new QueryParamsStore();
	readonly authorization = new AuthorizationStore();
}
