import { useEffect, useState } from "react"
import "./style.css"
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import Add from "./Add"
import Edit from "./Edit"
const Categories = ({ categories, setCategories, setFiltered, products }) => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [categoryTitle, setCategoryTitle] = useState("Tümü")

    useEffect(() => {
        if (categoryTitle === "Tümü") {
            setFiltered(products)
        } else {
            setFiltered(products.filter(item => item.category === categoryTitle))
        }
    }, [products, setFiltered, categoryTitle])

    return (
        <ul className='flex gap-4 text-lg md:flex-col'>
            {
                categories.map((item) => (
                    <li
                        className={`category-item ${item.title === categoryTitle && "!bg-pink-900"}  border rounded-lg`}
                        key={item._id}
                        onClick={() => setCategoryTitle(item.title)}
                    >
                        <span>{item.title}</span>
                    </li>
                ))
            }
            <li
                className='category-item !bg-orange-700 hover:opacity-90 border rounded-lg'
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined className="md:text-2xl" />
            </li>
            <li
                className='category-item !bg-[#BDC3C7] hover:opacity-90  border rounded-lg'
                onClick={() => setIsEditModalOpen(true)}
            >
                <EditOutlined className="md:text-2xl" />
            </li>
            <Add
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                setCategories={setCategories}
                categories={categories}
            />
            <Edit
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                categories={categories}
                setCategories={setCategories}
            />
        </ul>
    )
}

export default Categories