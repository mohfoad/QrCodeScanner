import * as ActionTypes from '../config/ActionTypes';

const initialState = {
    email: '',
    password: '',
    auth_token: '',
    loading: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN: 
            return {
                ...state,
                loading: true
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                auth_token: action.payload,
                loading: false
            };
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false
            };
        default: 
            return state;
    }
}

export default authReducer;