import { Button, Card, Input, Popconfirm, Space, Table, message } from "antd";
import Header from "../components/Header/Header";
import { useRef, useState } from "react";
import CreateBill from "../components/Cart/CreateBill";
import { useDispatch, useSelector } from 'react-redux'
import { increase, decrease, reset } from '../redux/cartSlice'
import { ClearOutlined, MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { deleteCart } from "../redux/cartSlice";
import Highlighter from 'react-highlight-words';

const CartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Ara`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Ara
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Sıfırla
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      key: 'img',
      width: "125px",
      render: (text) => {
        return (
          <img
            className="w-full h-20 object-contain"
            src={text}
            alt=""
          />
        )
      }
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title')
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category')
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        return (
          <span>{price.toFixed(2)}₺</span>
        )
      },
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ürün Adedi',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              type='primary'
              size='small'
              className='w-full flex justify-center items-center !rounded-full'
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className='font-bold w-6 inline-block text-center'>{record.quantity}</span>
            <Button
              type='primary'
              size='small'
              className='w-full flex justify-center items-center !rounded-full'
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Sepetten Silinsin Mi ?")) {
                    dispatch(decrease(record))
                    message.success("Ürün Sepetten Silindi.")
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record))
                }
              }}

            />
            
          </div>
        )
      },
      sorter: (a, b) => a.quantity - b.quantity,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => {
        return (
          <span className="text-center">{(price * record.quantity).toFixed(2)}₺</span>
        )
      }
    },
    {
      title: 'İşlemler',
      render: (_, record) => {
        return (
          <Popconfirm
            placement="topLeft"
            title="Silmek istediğinize emin misiniz ?"
            onConfirm={() => {
              message.success("Ürün Sepetten Silindi.")
              dispatch(deleteCart(record))
            }
            }
            okText="Evet"
            cancelText="Hayır"
          >
            <Button
              type="link"
              danger
            >
              Sil</Button>
          </Popconfirm>

        )
      }
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={
            {
              x: 1200,
              y: 400
            }
          }
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span >KDV %{cart.tax}</span>
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
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
            <Button
              type='primary'
              size='large'
              className='w-full mt-2 flex justify-center items-center'
              icon={<ClearOutlined />}
              danger
              disabled={cart.cartItems?.length === 0}
              onClick={() => {
                if (window.confirm("Emin misiniz ?")) {
                  dispatch(reset())
                  message.success("Sepet Başarıyla Temizlendi.")
                }
              }}

            >
              Temizle
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
