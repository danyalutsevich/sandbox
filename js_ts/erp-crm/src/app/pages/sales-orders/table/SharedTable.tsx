
import React, { useRef, useState } from 'react'
import { Button, Input, Space, Table } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType, TableProps } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { IOrders, ISales } from '../interfaces/SalesOrders.interface';
import { ordersData, salesData } from '../mockData';
import { CreateNewSale } from '../modal/createNewSaleModal';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

type DataIndex = keyof ISales;
type DataOrderIndex = keyof IOrders;

type Props = {
  className: string;
  type: 'orders' | 'sales';
  // openModalCreationProduct: () => void;
};

const SharedTable: React.FC<Props> = ({
  className, 
  type,
  //  openModalCreationProduct
  }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [selectedRowKeysOrders, setSelectedRowKeysOrders] = useState<React.Key[]>([]);
  const [selectedRowKeysSales, setSelectedRowKeysSales] = useState<React.Key[]>([]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleOrderSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataOrderIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getOrdersColumnSearchProps = (dataIndex: DataOrderIndex): TableColumnType<IOrders> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleOrderSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleOrderSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        highlightSearchText(text, searchText)
      ) : (
        text
      ),
  });

  const getSalesColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ISales> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        highlightSearchText(text, searchText)
      ) : (
        text
      ),
  });

  const highlightSearchText = (text: string, searchText: string) => {
    if (!searchText.trim()) {
      return text;
    }
  
    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ backgroundColor: '#ffc069', padding: 0 }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  // const handleGlobalSearch = (value: string) => {
  //   setSearchText(value);
  //   setSearchedColumn('');
  // };
  
  const onSelectChangeSales = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeysSales(newSelectedRowKeys);
  };

  const onSelectChangeOrders = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeysOrders(newSelectedRowKeys);
  };

  const rowSelectionSales: TableRowSelection<ISales> = {
    selectedRowKeys: selectedRowKeysSales,
    onChange: onSelectChangeSales,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeysSales(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeysSales(newSelectedRowKeys);
        },
      },
    ],
  };

  const rowSelectionOrders: TableRowSelection<IOrders> = {
    selectedRowKeys: selectedRowKeysOrders,
    onChange: onSelectChangeOrders,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeysOrders(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeysOrders(newSelectedRowKeys);
        },
      },
    ],
  };

  const ordersColumns: TableColumnsType<IOrders> = [
    {
      title: 'Order Number',
      dataIndex: 'key',
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      ...getOrdersColumnSearchProps('employee'),
    },
    {
      title: 'Storage',
      dataIndex: 'storage',
    },
    {
      title: 'Receipt number',
      dataIndex: 'receipt',
    },
    {
      title: 'Date and time',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  
  const salesColumns: TableColumnsType<ISales> = [
    {
      title: 'Number',
      dataIndex: 'key',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      onFilter: (value, record) => record.employee.includes(value as string),
      ...getSalesColumnSearchProps('employee'),
    },
    {
      title: 'Storage',
      dataIndex: 'storage',
      onFilter: (value, record) => record.storage.includes(value as string),
      ...getSalesColumnSearchProps('storage'),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      ...getSalesColumnSearchProps('client'),
    },
    {
      title: 'Summ',
      dataIndex: 'summ',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: 'status 1',
          value: 'status 1',
        },
        {
          text: 'status 2',
          value: 'status 2',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
      filterSearch: true,
    },
  ];
  // const salesAmount = salesData.length;
  const [changeableCurrentsalesData, setChangeableCurrentsalesData] =
  useState<ISales>(salesData[0]);

  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false);
  const handleOpenCreationModal = (): void => {
    navigate(`?saleId=${changeableCurrentsalesData.key}`);
    setIsOpenCreateProduct(true);
  };


  return (
    <div  className={`card ${className}`}>
      <div className='d-flex justify-content-between p-3'>
        <h2 className='card-title align-items-start flex-column px-5 pt-3'>
          <span className='card-label fw-bold fs-3 mb-1'>{type === "orders" ? intl.formatMessage({ id: "SALES_ORDERS.ORDERS" }) : intl.formatMessage({ id: "SALES_ORDERS.SALES" })}</span>
        </h2>
        <button className="btn btn-primary" onClick={handleOpenCreationModal}>
          Add new product
        </button>
      </div>

      {/* <Input.Search
        placeholder="Search all columns"
        onSearch={handleGlobalSearch}
        style={{ marginBottom: 8 }}
      /> */}
      {
        type === "orders" 
        ? 
        <Table
          rowSelection={rowSelectionOrders}
          columns={ordersColumns}
          dataSource={ordersData}
          // summary={(pageData) => {
          //   let total = 0;
          //   pageData.forEach(({ number }) => {
          //     total += number;
          //   });
          //   return (
          //     <Table.Summary.Row>
          //       <Table.Summary.Cell index={0} colSpan={4} className="text-end">Total:</Table.Summary.Cell>
          //       <Table.Summary.Cell index={4}>{total}</Table.Summary.Cell>
          //       <Table.Summary.Cell index={5} colSpan={2} />
          //     </Table.Summary.Row>
              
          //   );
          // }}
        />
        :
        <>
        <Table
          rowSelection={rowSelectionSales}
          columns={salesColumns}
          dataSource={salesData}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ summ }) => {
              total += summ;
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={6} className="text-end">Total:</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>${total.toFixed(2)}</Table.Summary.Cell>
                <Table.Summary.Cell index={5} colSpan={2} />
              </Table.Summary.Row>
            );
          }}
        />
        <CreateNewSale 
          isOpen={isOpenCreateProduct} 
          sales={salesData} 
          setChangeableCurrentSales={setChangeableCurrentsalesData} 
          creationMode
          close={()=>{
            setIsOpenCreateProduct(false)
          } }/>
          {/* <MaterialFullInfoDrawer
            isOpen={isOpenCreateProduct}
            close={() => {
              setIsOpenCreateProduct(false);
            }}
            creationMode
            materialList={changeableCurrentMaterialsList}
            setChangeableCurrentMaterialsList={setChangeableCurrentMaterialsList}
          />  */}
        </>

        
      }
      {/* <Table rowSelection={rowSelection} columns={salesColumns} dataSource={salesData} /> */}
    </div>
  ) 
}

export {SharedTable}
