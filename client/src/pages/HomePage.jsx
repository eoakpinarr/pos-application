import { useEffect, useState } from "react";
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import { Spin } from "antd";

const HomePage = () => {

    const [categories, setCategories] = useState()
    const [products, setProducts] = useState()
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")


    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all-category")
                const data = await res.json()
                data && setCategories(data.map((item) => {
                    return { ...item, value: item.title }
                }));
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all-product")
                const data = await res.json()
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    return (
        <>
            <Header setSearch={setSearch} />
            {
                products && categories ? (
                    <div className="home px-6 flex md:flex-row justify-between gap-10 flex-col pb-24 md:pb-0 h-screen">
                        <div className="categories min-h-[150px] max-h-[calc(100vh_-_112px)] md:pb-10 overflow-scroll">
                            <Categories
                                categories={categories}
                                setCategories={setCategories}
                                setFiltered={setFiltered}
                                products={products}
                            />
                        </div>
                        <div className="products flex-[8] min-h-screen max-h-[calc(100vh_-_112px)] overflow-scroll">
                            <Products
                                categories={categories}
                                filtered={filtered}
                                products={products}
                                setProducts={setProducts}
                                search={search}
                            />
                        </div>
                        <div className="cart-wrapper min-w-[300px] md:visible invisible md:-mt-[24px] border border-b-2">
                            <CartTotals />
                        </div>
                    </div>
                ) : <Spin
                    size="large"
                    className="absolute h-screen w-screen 
                    flex top-1/2 justify-center"
                />
            }

        </>
    )
}

export default HomePage