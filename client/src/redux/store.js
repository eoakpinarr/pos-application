import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"

export default configureStore({
    reducer: {
        cart: cartSlice,
    }
})

//Tüm stateler buradan gelir.
//auth register ile ilgili işlem yapacaksak reducer içine auth: authSlice