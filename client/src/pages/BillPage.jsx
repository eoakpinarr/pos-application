import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header/Header'
import { Button, Input, Space, Spin, Table } from "antd";
import PrintBill from '../components/Bills/PrintBill';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons'

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState();
  const [customer, setCustomer] = useState();

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

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch( process.env.REACT_APP_SERVER_URL + "/api/bills/get-all-bills")
        const data = await res.json()
        setBillItems(data)
      } catch (error) {
        console.log(error);
      }
    }
    getBills()
  }, [])

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps('customerName')
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps('customerPhoneNumber')
    },
    {
      title: 'Oluşturulma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>
      },
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
      ...getColumnSearchProps('paymentMode')
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'İşlemler',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true)
              setCustomer(record)
            }}
          >
            Yazdır
          </Button>
          
        )
      }
    },
  ];



  return (
    <>
      <Header />
      <h1 className='text-4xl font-bold text-center mb-4'>Faturalar</h1>
      {
        billItems ? (
          <div className="px-6">
            <Table
              dataSource={billItems}
              columns={columns}
              bordered
              pagination={false}
              scroll={{
                x: 1200,
                y: 400
              }}
              rowKey="_id"
            />

          </div>) : <Spin
          size="large"
          className="absolute h-screen w-screen flex top-1/2 justify-center"
        />
      }

      <PrintBill
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customer={customer}
      />
    </>
  );
};

export default BillPage