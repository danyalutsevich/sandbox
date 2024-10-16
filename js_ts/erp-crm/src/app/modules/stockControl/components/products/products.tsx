import {Table, TableColumnsType, TableProps} from "antd";
import {TableRowSelection} from "antd/lib/table/interface";
import {FC, useState} from "react";
import {useIntl} from "react-intl";
import {SharedModal} from "../../../../../_metronic/partials/custom/modal/SharedModal.tsx";

export function Products() {
    const intl = useIntl();
    // const navigate = useNavigate();
    interface DataType {
        key: React.Key;
        code: number;
        title: string;
        balance: number;
        storage: string;
        storagePlace: string;
        purchasePrice: number;
        retailPrice: number;
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.CODE" }),
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code - b.code,
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.TITLE" }),
            dataIndex: 'title',
            key: 'title',
            filters: [
                { text: 'Velor', value: 'Velor' },
                { text: 'Silk', value: 'Silk' },
                { text: 'Cotton', value: 'Cotton' },
                { text: 'Wool', value: 'Wool' },
                { text: 'Linen', value: 'Linen' },
                { text: 'Polyester', value: 'Polyester' },
                { text: 'Nylon', value: 'Nylon' },
                { text: 'Rayon', value: 'Rayon' },
                { text: 'Denim', value: 'Denim' },
                { text: 'Chiffon', value: 'Chiffon' },
                { text: 'Leather', value: 'Leather' },
                { text: 'Suede', value: 'Suede' },
                { text: 'Velvet', value: 'Velvet' },
                { text: 'Canvas', value: 'Canvas' },
                { text: 'Lace', value: 'Lace' },
                { text: 'Satin', value: 'Satin' },
                { text: 'Tweed', value: 'Tweed' },
                { text: 'Fleece', value: 'Fleece' },
                { text: 'Corduroy', value: 'Corduroy' },
                { text: 'Organza', value: 'Organza' },
            ],
            onFilter: (value, record) => record.title.indexOf(value as string) === 0,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.BALANCE" }),
            dataIndex: 'balance',
            key: 'balance',
            sorter: (a, b) => a.balance - b.balance,
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.STORAGE" }),
            dataIndex: 'storage',
            key: 'storage',
            filters: [
                { text: 'Warehouse 1', value: 'Warehouse 1' },
                { text: 'Warehouse 2', value: 'Warehouse 2' },
                { text: 'Warehouse 3', value: 'Warehouse 3' },
            ],
            onFilter: (value, record) => record.storage.indexOf(value as string) === 0,
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.STORAGE_PLACE" }),
            dataIndex: 'storagePlace',
            key: 'storagePlace',
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.PURCHASE_PRICE" }),
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
            sorter: (a, b) => a.purchasePrice - b.purchasePrice,
        },
        {
            title: intl.formatMessage({ id: "STOCK_CONTROL.PRODUCTS.TABLE.RETAIL_PRICE" }),
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            sorter: (a, b) => a.retailPrice - b.retailPrice,
        },
    ];

    const data = [
        {
            key: '1',
            code: 1,
            title: 'Velor',
            balance: 32,
            storage: 'Warehouse 1',
            storagePlace: 'A1',
            purchasePrice: 100,
            retailPrice: 120,
        },
        {
            key: '2',
            code: 2,
            title: 'Silk',
            balance: 20,
            storage: 'Warehouse 2',
            storagePlace: 'B2',
            purchasePrice: 80,
            retailPrice: 100,
        },
        {
            key: '3',
            code: 3,
            title: 'Cotton',
            balance: 45,
            storage: 'Warehouse 1',
            storagePlace: 'A2',
            purchasePrice: 60,
            retailPrice: 75,
        },
        {
            key: '4',
            code: 4,
            title: 'Wool',
            balance: 10,
            storage: 'Warehouse 3',
            storagePlace: 'C1',
            purchasePrice: 120,
            retailPrice: 150,
        },
        {
            key: '5',
            code: 5,
            title: 'Linen',
            balance: 50,
            storage: 'Warehouse 2',
            storagePlace: 'B1',
            purchasePrice: 70,
            retailPrice: 90,
        },
        {
            key: '6',
            code: 6,
            title: 'Polyester',
            balance: 60,
            storage: 'Warehouse 3',
            storagePlace: 'C2',
            purchasePrice: 40,
            retailPrice: 55,
        },
        {
            key: '7',
            code: 7,
            title: 'Nylon',
            balance: 25,
            storage: 'Warehouse 1',
            storagePlace: 'A3',
            purchasePrice: 50,
            retailPrice: 65,
        },
        {
            key: '8',
            code: 8,
            title: 'Rayon',
            balance: 15,
            storage: 'Warehouse 2',
            storagePlace: 'B3',
            purchasePrice: 90,
            retailPrice: 110,
        },
        {
            key: '9',
            code: 9,
            title: 'Denim',
            balance: 30,
            storage: 'Warehouse 3',
            storagePlace: 'C3',
            purchasePrice: 85,
            retailPrice: 105,
        },
        {
            key: '10',
            code: 10,
            title: 'Chiffon',
            balance: 18,
            storage: 'Warehouse 1',
            storagePlace: 'A4',
            purchasePrice: 95,
            retailPrice: 115,
        },
        {
            key: '11',
            code: 11,
            title: 'Leather',
            balance: 12,
            storage: 'Warehouse 2',
            storagePlace: 'B4',
            purchasePrice: 200,
            retailPrice: 250,
        },
        {
            key: '12',
            code: 12,
            title: 'Suede',
            balance: 8,
            storage: 'Warehouse 3',
            storagePlace: 'C4',
            purchasePrice: 220,
            retailPrice: 270,
        },
        {
            key: '13',
            code: 13,
            title: 'Velvet',
            balance: 22,
            storage: 'Warehouse 1',
            storagePlace: 'A5',
            purchasePrice: 140,
            retailPrice: 170,
        },
        {
            key: '14',
            code: 14,
            title: 'Canvas',
            balance: 28,
            storage: 'Warehouse 2',
            storagePlace: 'B5',
            purchasePrice: 50,
            retailPrice: 70,
        },
        {
            key: '15',
            code: 15,
            title: 'Lace',
            balance: 35,
            storage: 'Warehouse 3',
            storagePlace: 'C5',
            purchasePrice: 75,
            retailPrice: 95,
        },
        {
            key: '16',
            code: 16,
            title: 'Satin',
            balance: 40,
            storage: 'Warehouse 1',
            storagePlace: 'A6',
            purchasePrice: 110,
            retailPrice: 130,
        },
        {
            key: '17',
            code: 17,
            title: 'Tweed',
            balance: 10,
            storage: 'Warehouse 2',
            storagePlace: 'B6',
            purchasePrice: 180,
            retailPrice: 210,
        },
        {
            key: '18',
            code: 18,
            title: 'Fleece',
            balance: 50,
            storage: 'Warehouse 3',
            storagePlace: 'C6',
            purchasePrice: 90,
            retailPrice: 110,
        },
        {
            key: '19',
            code: 19,
            title: 'Corduroy',
            balance: 27,
            storage: 'Warehouse 1',
            storagePlace: 'A7',
            purchasePrice: 65,
            retailPrice: 85,
        },
        {
            key: '20',
            code: 20,
            title: 'Organza',
            balance: 14,
            storage: 'Warehouse 2',
            storagePlace: 'B7',
            purchasePrice: 100,
            retailPrice: 125,
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseAndClearLocation = () => {
        close();
        setIsOpenModal(false);
        // navigate(location.pathname);
    };

    const FullInfo: FC = () => {
        return (
            <div className="bg-body">
                <div className="mt-20">fddfg</div>
            </div>
        );
    };

  return (
      <div>
          <h1>
              {intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS"})}
          </h1>

          <div className="d-flex justify-content-between my-8">
              <button onClick={() => setIsOpenModal(!isOpenModal)} className="btn btn-primary">
                  {intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS.PREORDER"})}
              </button>

              <div className="d-flex">
                  <button className="btn btn-secondary me-2">
                      {intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS.TABLE.STORAGE"})}
                  </button>
                  <button className="btn btn-secondary me-2">
                      {intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS.PRINT"})}
                  </button>
                  <button className="btn btn-secondary">
                      {intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS.EXPORT"})}
                  </button>
              </div>

          </div>
          <Table rowSelection={rowSelection}
                 columns={columns}
                 dataSource={data}
                 onChange={onChange}
                 showSorterTooltip={{target: 'sorter-icon'}}/>

          {isOpenModal && (
              <SharedModal
                  close={handleCloseAndClearLocation}
                  size="right"
                  content={<FullInfo />}
                  headerContent={
                  <h3 className="card-label fw-bolder">{`Create a new product`}</h3>
                    }
              />
          )}
      </div>
  )
}
