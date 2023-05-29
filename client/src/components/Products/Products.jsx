import { useState } from "react"
import ProductItem from "./ProductItem"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import Add from "./Add"
import { useNavigate } from "react-router-dom"

const Products = ({ categories, filtered, products, setProducts, search }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="products-wrapper grid grid-cols-card gap-4">
            {
                filtered.filter((product) => product.title.toLowerCase().includes(search))
                    .map((item) => (
                        <ProductItem item={item} key={item._id} />
                    ))
            }
            <div className="product-item border hover:shadow-lg flex justify-center hover:opacity-90
            items-center cursor-pointer transition-all select-none bg-orange-700 min-h-[180px]"
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined className="text-white md:text-2xl" />
            </div>
            <div className="product-item border hover:shadow-lg flex justify-center hover:opacity-90
            items-center cursor-pointer transition-all select-none bg-[#BDC3C7] min-h-[180px]"
                onClick={() => navigate("/products")}
            >
                <EditOutlined className="text-white md:text-2xl" />
            </div>
            <Add
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                products={products}
                setProducts={setProducts}
                categories={categories}
            />

        </div>
    )
}

export default Products