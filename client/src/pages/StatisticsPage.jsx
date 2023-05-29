import { useEffect, useState } from 'react';
import { Pie } from "@ant-design/plots";
import Header from '../components/Header/Header'
import StatisticCard from '../components/Statistics/StatisticCard';
import { Spin } from 'antd';
const StaticticsPage = () => {

    const [data, setData] = useState();
    const [products, setProducts] = useState()
    const user = JSON.parse(localStorage.getItem("posUser"))


    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch(
            process.env.REACT_APP_SERVER_URL + "/api/bills/get-all-bills"
        )
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log("fetch data failed", error);
            });
    };

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

    const totalAmount = () => {
        const amount = data?.reduce((total, item) => item.totalAmount + total, 0)
        return `${amount.toFixed(2)}₺`
    }

    const config2 = {
        appendPadding: 10,
        data,
        angleField: 'subTotal',
        colorField: 'customerName',
        radius: 1,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [
            {
                type: 'pie-legend-active',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <>
            <Header />
            <div className='px-6 md:pb-0 pb-20'>
                <h1 className='text-4xl font-bold text-center mb-4'>
                    İstatistiklerim</h1>
                {
                    data && products ? (
                        <div className='statistic-section'>
                            <h2 className='text-lg'>
                                Hoş Geldiniz{" "}
                                <span className='text-green-700 font-bold text-xl '>
                                    {user.username}
                                </span>
                            </h2>
                            <div className='statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4'>
                                <StatisticCard
                                    title={"Toplam Müşteri"}
                                    amount={data?.length}
                                    img={"images/user.png"}
                                />
                                <StatisticCard
                                    title={"Toplam Kazanç"}
                                    amount={totalAmount()}
                                    img={"images/money.png"}
                                />
                                <StatisticCard
                                    title={"Toplam Satış"}
                                    amount={data?.length}
                                    img={"images/sale.png"}
                                />
                                <StatisticCard
                                    title={"Toplam Ürün"}
                                    amount={products?.length}
                                    img={"images/product.png"}
                                />
                            </div>

                            <div className='lg:h-full h-72 flex w-full '>
                                <Pie {...config2} className='w-full mt-10' />
                            </div>
                        </div>
                    ) : <Spin
                        size="large"
                        className="absolute h-screen w-screen 
                        flex top-1/2 justify-center"
                    />
                }

            </div>
        </>
    );
};

export default StaticticsPage