import { FC, useEffect, useState } from "react";
import { ISales } from "../interfaces/SalesOrders.interface";
import { useSearchParams } from "react-router-dom";
// import { salesData } from "../mockData";
import { SharedModal } from "../../../../_metronic/partials/custom/modal/SharedModal";
import { useIntl } from "react-intl";
import { Dropdown, Space } from "antd";
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface ICreateNewSaleProps {
    isOpen: boolean;
    creationMode?: boolean;
    sales: ISales[];
    setChangeableCurrentSales: React.Dispatch<
      React.SetStateAction<ISales>
    >;
    close: () => void;
}

const CreateNewSale: FC<ICreateNewSaleProps> = ({
  isOpen,
  creationMode,
  sales,
  close,
  // setChangeableCurrentSales,
}) => {
  const intl = useIntl();

  const searchParams = useSearchParams();
  const [currentMocksalesData, setCurrentMocksalesData] =
  useState<ISales>();

  useEffect(()=>{
    const saleId = searchParams[0].get("key");
    if (saleId !== null) {
      const currentsalesData = sales.find(
        (list) => list.key === parseInt(saleId)
      );
      if (currentsalesData) {
        setCurrentMocksalesData(currentsalesData);
      }
    }
  })
  const items: MenuProps['items'] = sales.map(sale => ({
    key: sale.key.toString(),
    label: sale.client,
  }));
  
  const FullInfo: FC = () => {
    return (
      <div className="bg-body">
        <div className="card shadow-none rounded-0 w-100">
          <div
            className="p-6 position-relative h-100%"
            id="kt_custom_material_full_info_body"
          >
            <div
              id="kt_custom_material_full_info_scroll"
              className="position-relative scroll-y me-n5 pe-5"
              data-kt-scroll="true"
              data-kt-scroll-height="auto"
              data-kt-scroll-wrappers="#kt_custom_material_full_info_body"
              data-kt-scroll-dependencies="#kt_custom_material_full_info_header, #kt_custom_material_full_info_footer"
              data-kt-scroll-offset="5px"
            >
              <div className="mt-5">
                <span className='card-label fw-bold fs-3 mb-1 mx-3'>Client</span>
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <Dropdown className='btn btn-sm btn-light-primary' menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Drop Down Client
                        <UserOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <button className='btn btn-light-primary'>Contact with client</button>
                </div>
                <a
                  href='#'
                  className='text-primary px-3'
                >Add a new client</a>
              </div>
              <div className="mt-15">
              <span className='card-label fw-bold fs-3 mb-1 mx-3'>Goods</span>

              </div>


              {/* {creationMode === true ? (
                <div className="w-100% h-100%">
                  <GeneralInfoDetailMaterialMenu
                    creationMode
                    currentMaterial={{
                      currentMockMaterial: undefined,
                      currentMockMaterialGroup: undefined,
                      currentMockMaterialList,
                    }}
                    close={handleCloseAndClearLocation}
                    materialList={materialList}
                    setChangeableCurrentMaterialsList={
                      setChangeableCurrentMaterialsList
                    }
                  />
                </div>
              ) : (
                <div className="w-100% h-100%">
                  {currentMockMaterial !== undefined &&
                    currentMockMaterialGroup !== undefined &&
                    currentMockMaterialList !== undefined}
                  <WrapperDetailMaterialInfoMenu
                    currentMockMaterial={currentMockMaterial}
                    currentMockMaterialGroup={currentMockMaterialGroup}
                    currentMockMaterialList={currentMockMaterialList}
                    close={handleCloseAndClearLocation}
                    materialList={materialList}
                    setChangeableCurrentMaterialsList={
                      setChangeableCurrentMaterialsList
                    }
                  />
                </div>
              )} */}
            </div>
          </div>
          {/* <div
            className="card-footer py-5 text-center"
            id="kt_custom_material_full_info_footer"
          >
            <Link
              to="/crafted/pages/profile"
              className="btn btn-bg-body text-primary"
            >
              View All Activities
              <KTIcon iconName="arrow-right" className="fs-3 text-primary" />
            </Link>
          </div> */}
        </div>
      </div>
    );
  };
  const handleClose = () => {
    close();
  };
  return (
    <>
      {isOpen && (
        <SharedModal
          close={handleClose}
          size="right"
          content={<FullInfo />}
          headerContent={
            creationMode === true ? (
              <h3 className="card-label fw-bolder">{intl.formatMessage({ id: "SALES_ORDERS.ORDERS.CREATENEWORDER" })}</h3>
            ) : (
              <h3 className="card-label fw-bolder">{`${currentMocksalesData?.key}`}</h3>
            )
          }
        />
      )}
    </>
  );
}

export {CreateNewSale}