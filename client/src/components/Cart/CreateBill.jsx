import { Button, Card, Form, Input, Modal, Select, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL +"/api/bills/add-bill", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    subTotal: cart.total,
                    tax: ((cart.total * cart.tax) / 100).toFixed(2),
                    totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems: cart.cartItems,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            if (res.status === 200) {
                message.success("Fatura başarıyla oluşturuldu.");
                dispatch(reset());
                navigate("/bills");
            }
        } catch (error) {
            message.danger("Bir şeyler yanlış gitti.");
            console.log(error);
        }
    };
    return (
        <div>
            <Modal
                title="Fatura Oluştur"
                open={isModalOpen}
                footer={false}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        name={'customerName'}
                        label='Müşteri Adı'
                        rules={[{
                            required: true,
                            message: 'Müşteri Adı Boş Geçilemez'
                        }]}>
                        <Input placeholder='Bir Müşteri Adı Yazınız' />
                    </Form.Item>
                    <Form.Item
                        name={'customerPhoneNumber'}
                        label='Tel No'
                        rules={[{
                            required: true,
                            message: 'Telefon Numarası Boş Geçilemez'
                        }]}
                    >
                        <Input placeholder='Bir Telefon Numarası Yazınız' maxLength={11} type='phone-number' />
                    </Form.Item>
                    <Form.Item
                        name={'paymentMode'}
                        label='Ödeme Yöntemi'
                        rules={[{
                            required: true,
                            message: 'Ödeme Yöntemi Boş Geçilemez'
                        }]}
                    >
                        <Select placeholder='Ödeme Yöntemi Seçiniz'>
                            <Select.Option value="Nakit" />
                            <Select.Option value="Kredi Kartı" />
                        </Select>
                    </Form.Item>

                    <Card>
                        <div className="flex justify-between">
                            <span>Ara Toplam</span>
                            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                        </div>
                        <div className="flex justify-between my-2">
                            <span >KDV Toplam %8</span>
                            <span className="text-red-600">{(cart.total * cart.tax) / 100 > 0
                                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                : 0}₺</span>
                        </div>
                        <div className="flex justify-between">
                            <b>Genel Toplam</b>
                            <b>{cart.total + (cart.total * cart.tax) / 100 > 0
                                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                : 0}₺</b>
                        </div>
                        <div className='flex justify-end'>
                            <Button
                                className="mt-4"
                                type="primary"
                                onClick={() => setIsModalOpen(true)}
                                htmlType='submit'
                                disabled={cart.cartItems.length === 0}
                            >
                                Sipariş Oluştur
                            </Button>
                        </div>

                    </Card>

                </Form>
            </Modal>
        </div>
    )
}

export default CreateBill