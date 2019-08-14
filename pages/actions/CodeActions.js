import RNBeep from 'react-native-a-beep';
import * as ActionTypes from '../config/ActionTypes';
import * as global from '../config/global';
import {AsyncStorage} from 'react-native';
import {
    saveData,
    getStorageData,
    removeData
} from '../storage/storage';


const addQRCodeData = (dispatch, data) => {
    dispatch({
        type: ActionTypes.ADD_QRCODE_SUCCESS,
        payload: JSON.parse(data)
    })
}

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const coloredItemChanged = (dispatch, index) => {
    dispatch({
        type: ActionTypes.MARK_COLORED_ITEM,
        payload: index
    })
}

const itemValidateStateChanged = (dispatch, index) => {
    dispatch({
        type: ActionTypes.ITEM_VALIDATED_STATE,
        payload: index
    })
}

export const addQRCode = (keyvalue, token) => {
    return (dispatch, getState) => {
        dispatch({type: ActionTypes.ADD_QRCODE});

        const body = JSON.stringify({
		 'scan': keyvalue
        });
        const {qrCodeData} = getState().code;
        let contentList = new Object();
	let match = false;
    
	//if(qrCodeData.length != 0) {
	if(Object.entries(qrCodeData).length != 0 ){

	    	qrCodeData.list.map((item, i) => {
			if(item.hash!='' && (keyvalue.includes(item.hash) == true || item.hash===keyvalue)){

					console.log("==========: ", item);
					if(item.validated==false){
						match = true;
						// handle validate set to true
						itemValidateStateChanged(dispatch, i);
					}
					fetch(global.qrcodeAPIUrl+'?validate=true', {
            					method: 'POST',
	    					withCredentials: true,
            					credentials: 'include',
            					headers: {
            						'Accept': 'application/json',
            						'Content-Type': 'application/json',
							'Authorization': 'Bearer '+token
            					},
            					body: body
        				});

			}

		});
                    	

		if(match==true){
                    	RNBeep.beep();
		}
		else{
                    	RNBeep.beep(false);
		}
                dispatch({type: ActionTypes.ADD_QRCODE_FAIL});
	}
	else{    
        	fetch(global.qrcodeAPIUrl, 
        	{
            		method: 'POST',
	    		withCredentials: true,
            		credentials: 'include',
            		headers: {
            			'Accept': 'application/json',
            			'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
            		},
            		body: body
        	}
        	)
            	.then(response => {
                	if (isJson(response._bodyInit)){
                    		return response.json()
                	} else {
                    		return response.text()
                	}
            	})
            	.then(json => {
                    	addQRCodeData(dispatch, json);
                    	// RNBeep.beep();
            	})
            	.catch((error) => {
                	console.log("++++ Error: ", error);
                	dispatch({type: ActionTypes.ADD_QRCODE_FAIL});
            	});
	}
    }
}

export const cleanQRCodeData = () => {
    return dispatch => {
        dispatch({type: ActionTypes.CLEAN_QRCODE});
    }
}

export const cleanColoredQRCodeData = () => {
    return dispatch => {
        dispatch({type: ActionTypes.CLEAN_COLORED_QRCODE});
    }
}

export const cleanValidatedQRCodeData = () => {
    return dispatch => {
        dispatch({type: ActionTypes.CLEAN_VALIDATED_QRCODE});
    }
}

const stationIdChanged = (dispatch, id) => {
    dispatch({
        type: ActionTypes.SHOW_START_QRCODE,
        payload: id
    })
}

const filteredByID = (dispatch) => {
    dispatch({
        type: ActionTypes.FILTERED_BY_ID,
        payload: true
    })
}

export const filteredChanged = () => {
	return dispatch => {
		dispatch({
			type: ActionTypes.FILTERED_BY_ID,
			payload: false
		})
	}
}

export const showStartQRCodeData = (navigation, id) => {
    return dispatch => {
		filteredByID(dispatch);
		stationIdChanged(dispatch, id);
		navigation.navigate('List');
    }
}
