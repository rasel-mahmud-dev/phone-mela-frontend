import React from 'react' 
import { useParams} from "react-router-dom"

import { useDispatch, useSelector} from "react-redux"

import api from "apis/api"
import "./Orders.scss"

import {RootStateType} from "store/index";
import Preload from "UI/Preload/Preload";
import Table from "UI/Table/Table";
import fullLink from "../../../../utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";


interface OrderType {
  cover: string
  created_at: string
  customer_id: number
  delivery_date: string
  description: string
  order_id: number
  payment_method: string
  price: number
  product_id: number
  quantity: number
  shipper_id: number
  shipping_id: number
  title: string
  order_status_type: string
}


const Orders = (props) => { 
  let params = useParams() 
  // let history = useHistory()
  
  const {auth: {auth}} = useSelector((state: RootStateType)=> state)
  
  const dispatch = useDispatch()

  const {loadingStates, cartState, _id} = props
  const [orders, setOrders] = React.useState<OrderType[]>([])
  
 
  
  React.useEffect( ()=>{
    
    (async function (){
      
      if(auth){
        
        api.get("/api/orders").then(response=>{
          if(response.status === 200){
            setOrders(response.data)
          }
        })
      }
    }())
    
  }, [])


    let columns = [
        {
            title: "Image",
            key: "1",
            dataIndex: "product_id",
            render: (product_id: any) => <div style={{width: "40px"}}><img style={{width: "100%"}}
                                                                           src={fullLink(product_id.cover)}/></div>
        },
        {
            title: "Order ID",
            key: "1122",
            dataIndex: "_id"
        },
        {
            title: "Product Name",
            key: "1",
            dataIndex: "product_id",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.product_id.title.toLowerCase() > b.product_id.title.toLowerCase()) {
                        return 1
                    } else if (a.product_id.title.toLowerCase() < b.product_id.title.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
            render: (product_id: any) => {
                return product_id.title
            }
        },
        {
            title: "Created At",
            key: "3",
            dataIndex: "createdAt",
            width: 150,
            render: (text: string) => new Date(text).toDateString(),
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.createdAt > b.createdAt) {
                        return 1
                    } else if (a.createdAt < b.createdAt) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
        },
        {
            title: "Price",
            key: "3",
            dataIndex: "price",
            width: 150,
            render: (price: number) => "TK. " + price,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.price > b.price) {
                        return 1
                    } else if (a.price < b.price) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
        }
    ]

  


  

  return (
      <div className="my-4">
          
          <WithSidebarButton>
              <h1 className="page-title">My Orders</h1>
          </WithSidebarButton>

          <div className="mt-5">

              <div className="card overflow-hidden mt-4">
                  <div className="overflow-x-auto">

                      <Table dataSource={orders} columns={columns} fixedHeader={true} scroll={{y: '80vh'}}/>

                  </div>
              </div>
          </div>

          <div className="row justify-space-between">
            {/*<Button onClick={handlePushBack}>Back to Shop</Button>*/}
          </div>
        
          
      </div>
    )
}

export default Orders