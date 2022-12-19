import {ActionTypes} from "actions/actionTypes";
import {Roles} from "reducers/authReducer";


export type LoginActionPayload = {
  username: string
  firstName?: string
  _id: string
  role: Roles
  email: string
  avatar?: string
}
export type LoginActionType = {
  type: ActionTypes.LOGIN,
  payload: LoginActionPayload
}

export type LogOutActionType = {
  type: ActionTypes.LOGOUT
}

export type AuthReducerActionType = LoginActionType | LogOutActionType
