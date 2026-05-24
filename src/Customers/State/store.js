import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer.js";
import { productReducer} from "./Product/Reducer.js";
import { cartReducer } from "./Cart/Reducer.js";
import { orderReducer } from "./order/Reducer.js";



const rootReducer=combineReducers({
    auth:authReducer,
    products:productReducer,
    cart:cartReducer,
    order:orderReducer
})


export const store =configureStore({reducer:rootReducer})