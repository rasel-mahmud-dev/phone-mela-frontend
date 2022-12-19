import {ActionTypes} from "src/store/actions/actionTypes";


export interface ShippingAddress {
    _id?: number,
    customer_id?: number,
    firstName?: string,
    lastName: string,
    phone: number,
    email?: string,
    idDefault: boolean
    post_code: number,
    state: string,
    city: string,
    address: string,
    apartment_suit?: string,
    country: string
}

export type UserReducerActionType = any


const initialState = {
    customers: []
}

const usersReducer = (state = initialState, action: UserReducerActionType) => {

    let updatedState = {...state}

    switch (action.type) {

        case ActionTypes.FETCH_CUSTOMERS :
            updatedState.customers = action.payload
            return updatedState;

        case ActionTypes.UPDATE_CUSTOMER :
            let {isBlock, _id} = action.payload
            let customerIndex = updatedState.customers.findIndex(customer => customer._id === _id)
            if (customerIndex !== -1) {
                updatedState.customers[customerIndex].isBlock = isBlock
            }
            return {
                ...updatedState,
                customers: [...updatedState.customers]
            };

        default:
            return state
    }
}

export default usersReducer