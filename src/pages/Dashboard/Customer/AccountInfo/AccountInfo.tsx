import React from 'react'
import {useSelector} from "react-redux";

import api from "apis/api";
import {RootStateType} from "store/index";
import fullLink from "../../../../utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";


interface CustomerProfileType {
    avatar: string
    createdAt: string
    email: string
    first_name: string
    id: number
    last_name: string
    role: string
    username: string
}

const AccountInfo = (props) => {

    const {auth: {auth}} = useSelector((state: RootStateType) => state)

    let [customerProfile, setCustomerProfile] = React.useState<CustomerProfileType | null>(null)


    React.useEffect(() => {
        if (auth) {
            api.get(`/api/auth/customer-profile/${auth._id}`).then(doc => {
                if (doc.data) {
                    let u = doc.data
                    setCustomerProfile(u)
                    // const {_id, created_at, avatar, ...otherField} = u
                    // let uus: any = []
                    // for(let key in otherField){
                    //   uus.push({
                    //     field: key, icon: "fa-user", value: otherField[key] ? otherField[key] : null
                    //   })
                    // }
                    // setUsers(uus)
                }
            })
        }
    }, [])


    const renderUserInfo = () => {
        const user = [
            {field: "email", icon: "fa-user", value: "rasel@gmail.com"},
            {field: "phone", icon: "fa-user", value: "01342234"},
            {field: "password", icon: "fa-key", value: "01342234"},
        ]


        return (
            <div>
                {/*{users.map((u: any)=>{*/}
                {/*  return u.value &&  <li className="item">*/}
                {/*    <div className="d-flex">*/}
                {/*      <h4 className="label">*/}
                {/*        {u.field.toUpperCase()}:*/}
                {/*      </h4>*/}
                {/*      {u.field === "password" ? (*/}
                {/*        <input*/}
                {/*          disabled={true}*/}
                {/*          className="border-less-input"*/}
                {/*          value={u.value}*/}
                {/*          type="passwor" />*/}
                {/*      ) : (*/}
                {/*        <h4>{u.value}</h4>*/}
                {/*      ) }*/}
                {/*    </div>*/}
                {/*    <div><i className="fa fa-pen"/></div>*/}
                {/*  </li>*/}
                {/*})}*/}
            </div>
        )
    }

//
//   function choosePhoto(){
//     if(inputRef.current) {
//       let i = inputRef.current as HTMLInputElement
//       i.click()
//     }
//   }
//
//   function handleChangePhoto(e){
//     blobToBase64(e.target.files[0], (dataUrl: string)=>{
//       setDataUrl(dataUrl)
//     })
//   }
//   function uploadProfilePhoto(e){
//     alert("call database")
//   }
//
//
//   function renderSetPasswordModal(){
//       return (
//         <Popup className="set-password-form" inProp={true}>
//           <Password placeholder="New Password" />
//           <Password placeholder="Confirm Password" />
//           <Button>Set Password</Button>
//         </Popup>
//       )
//     }
//
//
//   return (
//       <div className="container-full px-5 p-relative">
//         { isShowSetPassForm && renderSetPasswordModal() }
//         <Button to={`/customer/${params.name}`} type="link">Back to Dashboard</Button>
//         <h1 className="t-center">MY ACCOUNT</h1>
//         <div className="customer-avatar">
//           {fetchProfile.avatar ? (
//             <img src={fullLink(fetchProfile.avatar)} />
//           ) : (
//             <i className="fa fa-user-circle" />
//           )}
//         </div>
//
//         <input onChange={handleChangePhoto} hidden={true} type="file" ref={inputRef} />
//
//         { dataUrl ? (
//           <div className="center">
//             <div className="preview-avatar">
//               <img src={dataUrl} />
//             </div>
//             <Button
//               onClick={uploadProfilePhoto}
//               className="btn-center">
//               Upload Photo
//             </Button>
//           </div>
//         ) : (
//           <Button
//           onClick={choosePhoto}
//           className="btn-center">Add Profile Photo</Button>
//         )
//       }
//
//         <ul>
//           <h5>user information</h5>
//           {renderUserInfo()}
//            <li className="item">
//              <div className="d-flex">
//                 <h4 className="label mr-5">Member in Since: </h4>
//                 <h4>{new Date(fetchProfile.created_at).toDateString()}</h4>
//               </div>
//            </li>
//              <Divider />
//           {!fetchProfile.password && <div className="row d-flex align-center">
//             <h4 className="mr-5">set password to next time log in</h4>
//               <Button onClick={()=>setShowPassForm(!isShowSetPassForm)}>Set Password</Button>
//             </div>
//           }
//         </ul>
//
//         <div>
//           <Button type="primary">Delete Your Account</Button>
//         </div>
//
//
//       </div>
//     )

    return (
        <div className="">
            <WithSidebarButton>
                <h1 className="page-title">Profile Information</h1>
            </WithSidebarButton>

            <div className="card p-4">


                {customerProfile && (
                    <div className="">
                        <div className="flex">
                            <div className="w-24">
                                <img className="w-full rounded-full" src={fullLink(customerProfile.avatar)} alt=""/>
                                <button className="text-sm hover:text-primary-400">Change Avatar</button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">First name: </label>
                            <h4>{customerProfile.first_name}</h4>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">Last name: </label>
                            <h4>{customerProfile.last_name}</h4>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">Email: </label>
                            <h4>{customerProfile.email}</h4>
                        </div>

                        <div className="border border-gray-900/10 my-4"/>

                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[150px]">Customer since: </label>
                            <h4>{new Date(customerProfile.createdAt).toDateString()}</h4>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}


export default AccountInfo
