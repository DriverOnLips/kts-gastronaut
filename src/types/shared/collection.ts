export type CollectionModel<K extends number | string, T> = {
	order: K[];
	entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
	order: [],
	entities: {},
});

export const normalizeCollection = <K extends number | string, T>(
	elements: T[],
	getKeyForElement: (element: T) => K,
): CollectionModel<K, T> => {
	const collection: CollectionModel<K, T> = getInitialCollectionModel();

	elements.forEach((element) => {
		const id = getKeyForElement(element);
		collection.order.push(id);
		collection.entities[id] = element;
	});

	return collection;
};

export const linearizeCollection = <K extends number | string, T>(
	elements: CollectionModel<K, T>,
): T[] => elements.order.map((element) => elements.entities[element]);
