import { createContext, useContext } from 'react';

type RootContextType = {
	rootRef: HTMLElement | null;
};

const RootContext = createContext<RootContextType>({
	rootRef: null,
});

export const useRootContext = () => useContext(RootContext);
export const RootProvider = RootContext.Provider;
