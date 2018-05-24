import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import aplicacao from './view/store/aplicacao/reducer';
import home from './view/store/home/reducer';
import insumos from './view/store/insumos/reducer';
import login from './view/store/login/reducer';
import medicao from './view/store/medicao/reducer';
import settings from './view/store/settings/reducer';

const Reducers = combineReducers({
    aplicacao,
    home,
    insumos,
    login,
    medicao,
    settings
});

const Store = createStore(Reducers, applyMiddleware(thunkMiddleware));

const Mapper = function (props, actions, component) {
    return connect(props, actions)(component)
}

export {
    Mapper,
    Store,
    Provider,
    aplicacao,
    home,
    insumos,
    login,
    medicao,
    settings
}


