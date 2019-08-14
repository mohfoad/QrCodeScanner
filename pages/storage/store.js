import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import codeReducer from '../reducer/CodeReducer';
import authReducer from '../reducer/AuthReducer';

const rootReducer = combineReducers({
    code: codeReducer,
    auth: authReducer
});

const configureStore = () => {
    return createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
}

export default configureStore;
