import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import ajax from '../utils/axios';
import { reducers, medusaSaga } from './modules';

const middleware = createSagaMiddleware({
  context: { ajax },
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware)));

middleware.run(medusaSaga);

export default store;
