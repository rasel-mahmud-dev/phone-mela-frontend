import { ActionTypes } from "src/store/actions/actionTypes";

import {AuthReducerActionType} from "store/types/authType";


export enum Roles {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER"
}

export interface AuthStateType {
    authLoaded: boolean
    auth: {
        first_name?: string,
        last_name?: string,
        email: string
        _id: string
        username: string
        role:  Roles
        avatar?: string
    }
}


const initialAuthState: AuthStateType = {
    auth: null,
    authLoaded: false
}





const authReducer = (state=initialAuthState, action: AuthReducerActionType): AuthStateType =>{
  switch(action.type){

    case ActionTypes.LOGIN :
      return {
          authLoaded: true,
          auth: action.payload
      }
    
    case ActionTypes.LOGOUT :
      return {
          authLoaded: true,
          auth: null
      }
    
    default:
      return state
  }
}

export default authReducer