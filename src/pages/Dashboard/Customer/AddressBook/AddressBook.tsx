import React, {useEffect} from 'react'
import {useParams, Link} from "react-router-dom"

import {connect, useDispatch, useSelector} from "react-redux"
import "./AddressBook.scss"
import api, {getApi} from "apis/api";
import Button from 'UI/Button/Button';
import {ShippingAddress} from "reducers/userReducer";
import {RootStateType} from "store/index";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import useScrollTop from "hooks/useScrollTop";
import AddShippingAddress from "pages/Dashboard/Customer/AddressBook/AddShippingAddress";
import {BiTrash} from "react-icons/all";
import ActionModal from "components/ActionModal/ActionModal";
import Input2 from "UI/Form/Input/Input2";
// const {SubMenu} = Menu


const AddressBook = (props) => {
    let params = useParams()
    // let history = useHistory()
    const dispatch = useDispatch()

    useScrollTop()

    const {auth: {auth}} = useSelector((state: RootStateType) => state)

    const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)
    const deleteId = React.useRef<string>()

    const inputRef = React.useRef<HTMLInputElement>()


    const [isDeleteSurePopupOpen, setIsDeleteSurePopupOpen] = React.useState("")
    const [text, setText] = React.useState("")


    const [recentShippingAddress, setRecentShippingAddress] = React.useState<ShippingAddress[]>()

    React.useEffect(() => {
        (async function () {
            if (auth._id) {
                let response = await getApi().get(`/api/shipping-addresses`)
                setRecentShippingAddress(response.data)
            }
        }())
    }, [auth._id])

    function handleDeleteAddress(id: string){
        setIsDeleteSurePopupOpen("I want to delete this anyway")
        deleteId.current = id
    }

    useEffect(()=>{

        if( inputRef.current) {
            inputRef.current?.focus()
        }
    }, [inputRef.current, isDeleteSurePopupOpen])


    function handleCancelDelete(){
        deleteId.current = ""
        setIsDeleteSurePopupOpen("")
        setText("")
    }

    function handleDelete() {
        handleCancelDelete();
        if(deleteId.current) {
            getApi().delete("/api/shipping-address/" + deleteId.current).then(({data, status}) => {
                if (status === 201) {
                    setRecentShippingAddress(recentShippingAddress.filter(sp => sp._id !== deleteId.current))
                    handleCancelDelete()
                }
            }).catch(ex => {

            })
        }
    }



    return (
        <div className="py-4">
            <WithSidebarButton>
                <h1 className="sm:text-2xl text-xl text-center font-medium pt-4">Your Shipping Addresses</h1>
            </WithSidebarButton>


            <ActionModal onClose={handleCancelDelete} isOpen={!!isDeleteSurePopupOpen}>
                <div>
                    <h4>Write this text to delete shipping address</h4>

                    <p className="text-dark-400">{isDeleteSurePopupOpen}</p>

                    <Input2 onChange={(e: any)=>setText(e.target.value)} value={text} ref={inputRef} />
                    <Button className={`btn-primary mt-4 ${text !== isDeleteSurePopupOpen && "btn-disable"}` } onClick={handleDelete}>
                    Delete
                    </Button>
                </div>
            </ActionModal>


            <Button onClick={() => setShowAddShippingForm(!isShowAddShippingForm)} className="btn-primary">Add a new
                shipping address</Button>

            {recentShippingAddress && recentShippingAddress.map((sp: any) => (
                <div className="card overflow-hidden p-4 my-4">
                    <div className="">
                        <i className="fa fa-map-marker-alt"/>
                    </div>

                    <div className="flex flex-1 items-center justify-between">

                        <div>
                            <h4>
                                <span className="inline-block font-normal text-sm w-[100px]">First Name:</span>
                                <span>{sp.firstName}</span>
                            </h4>
                            <h4>

                                <span className="inline-block font-normal text-sm w-[100px]">Last Name:</span>
                                <span>{sp.lastName}</span>
                            </h4>
                            <h4>
                                <span className="inline-block font-normal text-sm w-[100px]">Email:</span>
                                <span>{sp.email}</span>
                            </h4>
                            <h4>
                                <span className="inline-block font-normal text-sm w-[100px]">Phone:</span>
                                <span>{sp.phone}</span>
                            </h4>
                            <h4>
                                <span className="inline-block font-normal text-sm w-[100px]">Address:</span>
                                <span>West tekani Sonatola Bogra</span>
                            </h4>
                        </div>

                        <div>
                            <BiTrash className="text-lg cursor-pointer" onClick={()=>handleDeleteAddress(sp._id)} />

                        </div>

                    </div>

                </div>
            ))}

            <AddShippingAddress
                auth={auth}
                isOpen={isShowAddShippingForm}
                onClose={() => setShowAddShippingForm(false)}
                onAdd={(address: ShippingAddress) => setRecentShippingAddress([...recentShippingAddress, address])}
            />
        </div>
    )
}

export default AddressBook