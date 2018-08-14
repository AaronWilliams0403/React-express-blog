import { combineReducers } from 'redux';
import admin from './admin';

const initialState = {
    isFetching: true,
    msg: {
        type: 1, //0:fail, 1: success
        content: ''
    },
    userInfo: {}
};

export const actionTypes = {
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
    SET_MESSAGE: "SET_MESSAGE",
    USER_LOGIN: "USER_LOGIN",
    RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
    USER_AUTH: "USER_AUTH"
};

export const actions = {
    get_login: function(username, password){
        return {
            type: actionTypes.USER_LOGIN,
            username,
            password
        }
    },
    clear_msg: function(){
        return{
            type: actionTypes.SET_MESSAGE,
            msgType: 1,
            msgContent: ''
        }
    },
    user_auth: function(){
        return{
            type: actionTypes.USER_AUTH
        }
    }
};

export function reducer(state=initialState,action) {
    switch(action.type){
        case actionTypes.FETCH_START:
            return{
                ...state, isFetching: true
            };
        case actionTypes.FETCH_END:
            return{
                ...state, isFetching: false
            }
        case actionTypes.SET_MESSAGE:
            return{
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            }
        case actionTypes.RESPONSE_USER_INFO:
            return{
                ...state, userInfo: action.data
            }
        default:
            return state;
    }
};
export default combineReducers({
    globalState: reducer,
    admin
})