import {useEffect} from "react";
import {ActionTypes} from "actions/actionTypes";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";

function useRestoreCheckoutData(){
    const {productState} = useSelector((state: RootStateType)=>state)

    const dispatch  = useDispatch()

    useEffect(()=>{
        if(productState.checkout?.products.length){
            // set checkout product in localstorage, so that it is not lost after reload page.
            localStorage.setItem("checkout", JSON.stringify(productState.checkout))
        } else {
            // take checkout product from localstorage
            let str =  localStorage.getItem("checkout")
            if(str) {
                try{
                    let data = JSON.parse(str)
                    dispatch({
                        type: ActionTypes.SET_CHECKOUT_PRODUCTS,
                        payload:  data
                    })
                }catch (ex){

                }

            }
        }
    }, [productState.checkout.products])

    return null
}


export default useRestoreCheckoutData