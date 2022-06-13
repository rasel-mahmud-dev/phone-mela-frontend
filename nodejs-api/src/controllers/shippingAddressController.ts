import mongoose from "mongoose";

import {Request, Response} from  "express"
import {ShippingAddressType} from "../models/ShippingAddress";

const ShippingAddress = mongoose.model("ShippingAddress")


export const getShippingAddress = async (req: Request, res: Response)=> {
  try{
    let docs = await ShippingAddress.find({customer_id: req.session.user_id})
    res.status(200).send(docs)
  } catch (ex){
  
  }

}

export const addShippingAddress  = async (req: Request, res: Response)=> {
  const {
    address,
    apartment_suit,
    city,
    email,
    country,
    customer_id,
    firstName,
    lastName,
    phone,
    post_code,
    state
  } = req.body
  
  try{
    
    let o: ShippingAddressType  = {
      address: address,
      apartment_suit: apartment_suit,
      city: city,
      email: email,
      country: country,
      createdAt: new Date(),
      customer_id: customer_id,
      firstName: firstName,
      isDefault: true,
      lastName: lastName,
      phone: phone,
      post_code: post_code,
      state: state
    }
    
    let newAddress = new ShippingAddress(o)
    let doc = await newAddress.save()
    res.send(doc)
    
  } catch (ex){
  
  }

}