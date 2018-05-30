import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import home from './view/store/home/reducer';
import login from './view/store/login/reducer';
import settings from './view/store/settings/reducer';

const Reducers = combineReducers({

    home,
    login,
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
    home,
    login,
    settings
}


