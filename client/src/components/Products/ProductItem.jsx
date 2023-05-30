import { message } from "antd"
import { addProduct } from "../../redux/cartSlice"
import { useDispatch } from "react-redux"

const ProductItem = ({ item }) => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addProduct({ ...item, quantity: 1 }))
        message.success("Ürün Sepete Eklendi.")
    }

    return (
        <div className="product-item border hover:shadow-lg rounded-lg
        cursor-pointer transition-all select-none overflow-scroll" onClick={handleClick}>
            <div className="product-img">
                <img
                    src={item.img}
                    alt=""
                    className="h-28 w-full object-contain bg-white border-b rounded-t-lg"
                />
            </div>
            <div className="product-info flex flex-col p-3">
                <span className="font-bold">{item.title}</span>
                <span>{item.price}₺</span>
            </div>
        </div>
    )
}

export default ProductItem