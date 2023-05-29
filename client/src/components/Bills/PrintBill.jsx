import { Button, Modal } from 'antd'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    return (
        <div>
            <Modal
                title="Fatura Yazdır"
                open={isModalOpen}
                footer={false}
                onCancel={() => setIsModalOpen(false)}
                width={800}
            >
                <section className='bg-black py-20' ref={componentRef}>
                    <div className='max-w-5xl mx-auto bg-white px-6'>
                        <article className='overflow-hidden'>
                            <div className="logo">
                                <h2 className='text-4xl font-bold text-slate-700 my-6'>LOGO</h2>
                            </div>
                            <div className="bill-details">

                                <div className='grid grid-cols-2 gap-12'>

                                    <div className='text-md text-slate-500'>
                                        <p className='font-bold text-red-700'>Müşteri Ad Soyad</p>
                                        <p className='font-bold text-gray-600'>{customer?.customerName}</p>
                                        <p className='font-bold text-red-700 mt-2'> Telefon Numarası</p>
                                        <p className='font-bold text-gray-600'>{customer?.customerPhoneNumber}</p>
                                    </div>
                            
                                    <div className='text-md text-slate-500'>
                                        <div>
                                            <p className='font-bold text-slate-700'>Fatura Numarası:</p>
                                            <p>000{Math.floor(Math.random() * 100)}</p>
                                        </div>
                                        <div>
                                            <p className='font-bold text-slate-700 mt-2'>Veriliş Tarihi:</p>
                                            <span>{customer?.createdAt.substring(0, 10)}</span>
                                        </div>

                                    </div>





                                </div>
                            </div>
                            <div className='bill-table-area'>
                                <table className='min-w-full divide-y divide-slate-500 overflow-hidden'>
                                    <thead>
                                        <tr className='border-b border-slate-200'>
                                            <th scope='col' className='py-3.5 text-left 
                                            text-sm font-normal text-slate-700 md:pl-0 
                                            sm:table-cell hidden'>Ürün Görseli</th>
                                            <th scope='col' className='py-3.5 text-left 
                                            text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden'>Ürün Adı</th>
                                            <th scope='col' className='py-3.5 text-left 
                                            text-sm font-normal text-slate-700 md:pl-0 sm:hidden' colSpan={4}>Ürün Adı</th>
                                            <th scope='col' className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 
                                            sm:table-cell hidden">Ürün Fiyatı</th>
                                            <th scope='col' className='py-3.5 
                                            text-sm font-normal text-slate-700 md:pl-0 
                                            sm:table-cell hidden text-center'>Ürün Adedi</th>
                                            <th scope='col' className='py-3.5 text-end
                                            text-sm font-normal text-slate-700 md:pl-0'>Toplam Fiyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customer?.cartItems.map(item => (
                                                <tr className='border-b border-slate-200'>
                                                    <td className='py-4 sm:table-cell hidden'>
                                                        <img
                                                            src={item.img}
                                                            alt=""
                                                            className="w-12 h-12 object-contain border-b"
                                                        />
                                                    </td>
                                                    <td className="py-4 sm:table-cell hidden">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{item.title}</span>
                                                            <span className="sm:hidden inline-block text-xs">
                                                                {item.price.toFixed(2)}₺
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 sm:hidden" colSpan={4}>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{item.title}</span>
                                                            <span className="sm:hidden inline-block text-xs">
                                                                {item.price.toFixed(2)}₺ x {item.quantity}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-center sm:table-cell hidden">
                                                        <span>{item.price.toFixed(2)}₺</span>
                                                    </td>
                                                    <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                                                        <span>{item.quantity}</span>
                                                    </td>
                                                    <td className="py-4 text-end">
                                                        <span>{(item.price * item.quantity).toFixed(2)}₺</span>
                                                    </td>

                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th
                                                className="text-right pt-4 sm:table-cell hidden"
                                                colSpan="4"
                                                scope="row"
                                            >
                                                <span className="font-normal text-slate-700">
                                                    Ara Toplam
                                                </span>
                                            </th>
                                            <th
                                                className="text-left pt-4 sm:hidden"
                                                scope="row"
                                                colSpan="4"
                                            >
                                                <p className="font-normal text-slate-700">Ara Toplam</p>
                                            </th>
                                            <th className="text-right pt-4" scope="row">
                                                <span className="font-normal text-slate-700">{customer?.subTotal.toFixed(2)}₺</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                className="text-right pt-4 sm:table-cell hidden"
                                                colSpan="4"
                                                scope="row"
                                            >
                                                <span className='font-normal text-slate-700'>KDV</span>
                                            </th>
                                            <th
                                                className="text-left pt-4 sm:hidden"
                                                scope="row"
                                                colSpan="4"
                                            >
                                                <p className="font-normal text-slate-700">KDV</p>
                                            </th>
                                            <th className='text-right pt-4' scope='row'>
                                                <span className='font-normal text-red-600'>+{customer?.tax.toFixed(2)}₺</span>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                className="text-right pt-4 sm:table-cell hidden"
                                                colSpan="4"
                                                scope="row"
                                            >
                                                <span className="font-normal text-slate-700">Genel Toplam</span>
                                            </th>
                                            <th
                                                className="text-left pt-4 sm:hidden"
                                                scope="row"
                                                colSpan="4"
                                            >
                                                <p className="font-normal text-slate-700">Genel Toplam</p>
                                            </th>
                                            <th className='text-right pt-4' scope='row'>
                                                <span className='font-normal text-slate-700'>{customer?.totalAmount.toFixed(2)}₺</span>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="py-9">
                                    <div className="border-t pt-9 border-slate-200">
                                        <p className="text-sm font-light text-slate-700">
                                            Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                                            Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                                            sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                                            talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                                            ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                                            Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                                            geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                                            England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                                            Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
                <div className="flex justify-end mt-4">
                    <Button
                        type="primary"
                        size="large"
                        onClick={handlePrint}
                    >
                        Yazdır
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default PrintBill 