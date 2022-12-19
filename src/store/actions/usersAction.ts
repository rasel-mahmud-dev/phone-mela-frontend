
import api from "apis/api";
import {ActionTypes} from "actions/actionTypes";
import errorMessage from "../../response/errorResponse";



export const fetchCustomers = (dispatch) => {
    return new Promise<any[]>(async (resolve, reject) => {
        try {
            const response = await api.get<any[]>(`/api/auth/customers`)
            if (response.status === 200 && response.data) {

                dispatch({
                    type: ActionTypes.FETCH_CUSTOMERS,
                    payload: response.data
                })
                resolve(response.data)

            } else {
                resolve([])
            }
        } catch (ex) {
            reject(errorMessage(ex))
        }
    })
}



export const blockCustomer = (dispatch, customerId: string, isBlock: boolean) => {
    return new Promise<any[]>(async (resolve, reject) => {
        try {
            const response = await api.post<any[]>(`/api/auth/change-customer-status`, {
                isBlock: isBlock,
                customerId: customerId
            })
            if (response.status === 201 && response.data) {
                dispatch({
                    type: ActionTypes.UPDATE_CUSTOMER,
                    payload: {
                        isBlock: isBlock,
                        _id: customerId
                    }
                })
                resolve(response.data)

            }
        } catch (ex) {
            reject(errorMessage(ex))
        }
    })
}

