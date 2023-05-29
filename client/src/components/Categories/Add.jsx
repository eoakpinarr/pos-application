import { Button, Form, Input, Modal, message } from 'antd'

const Add = ({ isAddModalOpen, setIsAddModalOpen, setCategories, categories }) => {

    const [form] = Form.useForm()

    const onFinished = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL +"/api/categories/add-category", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            message.success("Kategori Başarılı Bir Şekilde Eklendi.")
            form.resetFields();
            setCategories([...categories, {
                _id: Math.random(),
                title: values.title
            }])
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            title="Yeni Kategori Ekle"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinished} form={form}>
                <Form.Item
                    name="title"
                    rules={[{
                        required: true,
                        message: "Kategori Alanı Boş Geçilemez !"
                    }]}
                    label="Kategori Ekle"
                >
                    <Input />
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