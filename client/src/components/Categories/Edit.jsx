import { Button, Form, Input, Modal, Table, message } from 'antd'
import React from 'react'
import { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {

    const [editingRow, setEditingRow] = useState({})
    const [form] = Form.useForm()
    const onFinished = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({ ...values, categoryId: editingRow._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            message.success("Kategori Başarılı Bir Şekilde Düzenlendi.")
            form.resetFields();
            setCategories(categories.map((item) => {
                if (item._id === editingRow._id) {
                    return { ...item, title: values.title }
                }
                return item
            }))
        } catch (error) {
            console.log(error);
            message.error("Bir şeyler yanlış gitti !")

        }
    }

    const deleteCategory = (id) => {
        if (window.confirm("Emin misiniz ?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({ categoryId: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                message.success("Kategori Başarıyla Silindi.")
                setCategories(categories.filter((item) => item._id !== id))
            } catch (error) {
                console.log(error);
                message.error("Bir şeyler yanlış gitti !")
            }
        }
    }

    const columns = [
        {
            title: "Kategoriler",
            dataIndex: "title",
            render: (_, record) => {

                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    )
                } else {
                    return (
                        <p>{record.title}</p>
                    )
                }

            }
        },
        {
            title: "İşlemler",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div>
                        <Button
                            type='link'
                            onClick={() => setEditingRow(record)}
                            className='pl-0'
                        >
                            Düzenle
                        </Button>
                        <Button
                            type='link'
                            htmlType='submit'
                            className='text-gray-500'
                        >
                            Kaydet
                        </Button>
                        <Button
                            type='link'
                            danger
                            onClick={() => deleteCategory(record._id)}
                        >
                            Sil
                        </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <Modal
            open={isEditModalOpen}
            title="Kategori işlemleri (sil-düzenle)"
            footer={false}
            onCancel={() => setIsEditModalOpen()}
        >
            <Form onFinish={onFinished}>
                <Form.Item>
                    <Table
                        bordered
                        dataSource={categories}
                        columns={columns}
                        rowKey={"_id"}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Edit