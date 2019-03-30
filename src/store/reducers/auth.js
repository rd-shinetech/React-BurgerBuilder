import * as actionType from '../actions/actionType';
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState,action) => {
    let localState;

    switch (action.type) {
        case actionType.AUTH_START:
            localState = updateObject(state,{error:null,loading:true});
            break;
        case actionType.AUTH_SUCCESS:
            localState = updateObject(state,{token:action.token,userId:action.userId,error:null,loading:false});
            break;
        case actionType.AUTH_FAIL:
            localState = updateObject(state,{token:null,userId:null,error:action.error,loading:false});
            break;
        case actionType.AUTH_LOGOUT:
            localState = updateObject(state,{ token: null, userId: null });
            break;
        case actionType.SET_AUTH_REDIRECT_PATH:
            localState = updateObject(state,{authRedirectPath: action.path});
            break;
        default:
            return state;
    }

    return localState;
};

export default reducer;