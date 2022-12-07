export interface Cart {
    _id: string
    cover?: string
    title: string
    customer_id: string
    quantity: number
    createdAt: Date
    price: number
    product_id: string
}