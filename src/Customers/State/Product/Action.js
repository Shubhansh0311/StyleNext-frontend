// import {   useNavigate } from "react-router-dom"
import { api } from "../../../config/api"


const findProductByIdRequest=()=>({type:"FIND_PRODUCT_BY_ID_REQUEST"})
const findProductByIdSuccess=(data)=>({type:"FIND_PRODUCT_BY_ID_SUCCESS",payload:data})
const findProductByIdFailure=(error)=>({type:"FIND_PRODUCT_BY_ID_FAILURE",payload:error})

const findProductRequest=()=>({type:"FIND_PRODUCT_REQUEST"})
const findProductSuccess=(data)=>({type:"FIND_PRODUCT_SUCCESS",payload:data})
const findProductFailure=(error)=>({type:"FIND_PRODUCT_FAILURE",payload:error})

export const findProduct=(reqdata)=>async(dispatch)=>{
    
dispatch(findProductRequest())
try {

    const { Category, sizes, color, minPrice, maxPrice, sort, stock, minDiscount, pageNumber,pageSize } =reqdata
    console.log("reqdata",reqdata);
   let url=""
    if (Category && Category.toLowerCase() !== "all") {
        // If Category is specific (not "all"), include it in the query
        url = `api/products?color=${color}&size=${sizes}&category=${Category}&minPrice=${minPrice}&maxprice=${maxPrice}&minDicount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
      } else {
        // If Category is "all", omit it from the query
        url = `api/products?color=${color}&size=${sizes}&minPrice=${minPrice}&maxprice=${maxPrice}&minDicount=${minDiscount}&sort=${sort}&stock=${stock}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
      }

    const {data}=await api.get(url);
    
    
    
    dispatch(findProductSuccess(data))
   

   

} catch (error) {
    dispatch(findProductFailure(error.message))
}
}

export const findProductById=(reqdata)=>async(dispatch)=>{
    const productId=reqdata
    
    
    dispatch(findProductByIdRequest())
    try {
         const {data}=await api.get(`/api/products/id/${productId}`)
       
         
         dispatch(findProductByIdSuccess(data))
    } catch (error) {
        dispatch(findProductByIdFailure(error.message))
        
    }
}