export interface Order {
    title: string,
    _id: string,
    createdAt: string
    customer_id: string
    delivery_date: string
    description: string
    order_status: string
    payment_method: string
    price: number
    product_id: {_id: string, title: string}
    products: []
    quantity: number
    shipper_id: string
    shipping_id: string
    updatedAt: string
}