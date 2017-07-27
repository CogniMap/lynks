import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers';

export function configureStore(initialState?: RootState): Store<RootState> {
	const create = (window as any).devToolsExtension
		? (window as any).devToolsExtension()(createStore)
		: createStore;

	const store = create(rootReducer, initialState) as Store<RootState>;

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextReducer = require('./reducers');
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
