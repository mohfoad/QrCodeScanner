import RNBeep from 'react-native-a-beep';
import {AsyncStorage} from 'react-native';
import * as ActionTypes from '../config/ActionTypes';
import * as global from '../config/global';
import {
    saveData,
    getStorageData,
    removeData
} from '../storage/storage';

const isEmailValid = (email) => {
    if (email === '') {
        return false;
    }
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !pattern.test(String(email).toLowerCase())
}

const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const signIn = (email, password, navigation) => {
    return dispatch => {
        const checking = isEmailValid(email);
        if (checking) {
            alert('Please enter valid email.');
            dispatch({ type: ActionTypes.LOGIN_FAIL });
        } else if (password === '') {
            alert('Please enter valid password.');
            dispatch({ type: ActionTypes.LOGIN_FAIL });
        } else {
            dispatch({type: ActionTypes.LOGIN});
            const url = global.loginAPIUrl;
            const body = JSON.stringify({
                email,
                password
            });
            
            fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                },
                body: body
              })
                .then(res => {
                    if (isJson(res._bodyInit)){
                        return res.json()
                    } else {
                        return res.text()
                    }
                })
                .then(json => {
                    const result = JSON.parse(json);
                    console.log("++--: ", result);
                    
                    if (result.login === 'ok') {
                        saveData('@ArdaTurSystem_AuthToken', result.token);
                        navigation.navigate('Home');
                    }
                    else {
                        alert("Wrong email or password!")
                    }
                    dispatch({ type: ActionTypes.LOGIN_SUCCESS });
                })
                .catch(error => {
                    console.error(error);
                    dispatch({ type: ActionTypes.LOGIN_FAIL });
                });
        }
    };
}

export const logout = (navigation) => {
    return dispatch => {
        dispatch({type: ActionTypes.LOGIN});
        removeData('@ArdaTurSystem_AuthToken').then((result) => {
            console.log("Remove Data Success: ", typeof(result));
            navigation.navigate('Auth');
            dispatch({ type: ActionTypes.LOGIN_SUCCESS });
        });
    }
}
