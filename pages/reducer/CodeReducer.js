import * as ActionTypes from '../config/ActionTypes';

const initialState = {
    qrCodeData: {},
    loading: false,
    stationId: -1,
    filtered: false
};

const codeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_QRCODE:
        case ActionTypes.ADD_COLORED_QRCODE:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.ADD_QRCODE_SUCCESS: 
            return {
                ...state,
                qrCodeData: action.payload,
                loading: false
            };
        case ActionTypes.ITEM_VALIDATED_STATE:
            
            return {
                ...state,
                qrCodeData: {...state.qrCodeData, list: state.qrCodeData.list.map((item, index) => index == action.payload ? {...item, validated: true} : {...item, validated: false})},
                loading: false
            }
        case ActionTypes.MARK_COLORED_QRCODE:
            return {
                ...state,
                loading: false
            }
        case ActionTypes.CLEAN_QRCODE: 
            return {
                ...state,
                qrCodeData: {},
                loading: false
            };
        case ActionTypes.CLEAN_COLORED_QRCODE: 
            return {
                ...state,
                qrCodeData: state.qrCodeData.list.map((item, i) => { }),
                loading: false
            };
        case ActionTypes.CLEAN_VALIDATED_QRCODE: 
            return {
                ...state,
                qrCodeData: {...state.qrCodeData, list: state.qrCodeData.list.map((item, i) =>  item.validated ? {...item, validated: false} : {...item, validated: false} )},
                loading: false
            };
        case ActionTypes.ADD_QRCODE_FAIL:
        case ActionTypes.ADD_COLORED_QRCODE_FAIL:
            return {
                ...state,
                loading: false
            };
        case ActionTypes.SHOW_START_QRCODE:
            return {
                ...state,
                stationId: action.payload,
                loading: false
            };
        case ActionTypes.FILTERED_BY_ID:
            return {
                ...state,
                filtered: action.payload
            }
        default: 
            return state;
    }
}

export default codeReducer;
