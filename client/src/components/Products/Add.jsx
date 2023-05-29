import { Button, Form, Input, Modal, Select, message } from 'antd'

const Add = ({ isAddModalOpen, setIsAddModalOpen, products, setProducts, categories }) => {

    const [form] = Form.useForm()

    const onFinished = (values) => {
        try {
            fetch( process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            message.success("Ürün Başarılı Bir Şekilde Eklendi.")
            form.resetFields();
            setProducts([...products, {
                ...values,
                _id: Math.random(),
                price: Number(values.price)
            }])
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error);
            message.error("Bir şeyler yanlış gitti.")

        }
    }

    return (
        <Modal
            title="Yeni Ürün Ekle"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinished} form={form}>
                <Form.Item
                    name="title"
                    rules={[{
                        required: true,
                        message: "Ürün Adı Alanı Boş Geçilemez !"
                    }]}
                    label="Ürün Adı"
                >
                    <Input placeholder='Ürün Adı Giriniz' />
                </Form.Item>
                <Form.Item
                    name="img"
                    rules={[{
                        required: true,
                        message: "Ürün Görseli Alanı Boş Geçilemez !"
                    }]}
                    label="Ürün Görseli"
                >
                    <Input placeholder='Ürün Görseli Giriniz' />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{
                        required: true,
                        message: "Ürün Fiyatı Alanı Boş Geçilemez !"
                    }]}
                    label="Ürün Fiyatı"
                >
                    <Input placeholder='Ürün Fiyatı Giriniz' />
                </Form.Item>
                <Form.Item
                    name="category"
                    rules={[{
                        required: true,
                        message: "Kategori Alanı Boş Geçilemez !"
                    }]}
                    label="Kategori Seç"
                >
                    <Select
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        value={categories._id}
                        filterOption={(input, option) => (option?.title ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                        }
                        options={categories}
                    />
                </Form.Item>
                <Form.Item className="flex justify-end mb-0">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add