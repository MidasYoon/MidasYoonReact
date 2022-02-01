import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as modules from './modules';

const configure = createStore(combineReducers(modules), composeWithDevTools());

export default configure;