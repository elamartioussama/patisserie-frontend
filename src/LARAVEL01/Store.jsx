import { legacy_createStore } from 'redux';
import { productsReducer } from './Reducer';

const store = legacy_createStore(productsReducer);

export default store;
