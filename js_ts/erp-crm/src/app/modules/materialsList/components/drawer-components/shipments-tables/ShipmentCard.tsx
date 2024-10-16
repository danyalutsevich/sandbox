import React from "react";
import { IShipmentHistory, IShipments } from "../../../MaterialsListModels";
import { ICurrentMaterialsProps } from "../WrapperDetailMaterialInfoMenu";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import { Table, TableColumnsType, TableProps } from "antd";

interface IShipmentCardProps {
  currentShipment: IShipments;
  currentMaterial: ICurrentMaterialsProps;
}

export const ShipmentCard: React.FC<IShipmentCardProps> = ({
  currentShipment,
  currentMaterial,
}) => {
  const intl = useIntl();

  const columns: TableColumnsType<IShipmentHistory> = [
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.SHIPMENT.STOCK_DOCUMENT",
      }),
      dataIndex: "stockName",
      render: (text: string, record: IShipmentHistory) =>
        record.shipmentType === "from-provider" ? (
          <span className="text-muted fw-semibold fs-7">
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FROM_PROVIDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">
              {currentShipment.provider}
            </a>{" "}
            {">"} {text} {">"}{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.ORDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">{record.invoice}</a>
          </span>
        ) : (
          <span className="text-muted fw-semibold fs-7">
            {text} {">"}{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FOR_CLIENT",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">{record.client}</a>{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.ORDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">{record.invoice}</a>
          </span>
        ),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      // sorter: (a, b) => a.serialNumber.length - b.serialNumber.length,
    },
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.SHIPMENT.SERIAL_NUMBER",
      }),
      dataIndex: "serialNumber",
      sorter: (a, b) => a.serialNumber.length - b.serialNumber.length,
    },
  ];

  // const rowSelection = {
  //   onChange: (
  //     selectedRowKeys: React.Key[],
  //     selectedRows: IShipmentHistory[]
  //   ) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   // getCheckboxProps: (record: IShipmentHistory) => ({
  //   //   // disabled: record.name === "Disabled User", // Column configuration not to be checked
  //   //   name: record.stockName,
  //   // }),
  // };

  const onChange: TableProps<IShipmentHistory>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="card card-body border d-flex flex-row justify-content-between gap-5">
      <div className="mt-2">
        <span className="d-flex gap-1" style={{ width: "max-content" }}>
          <p className="text-dark fw-semibold fs-7">
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.MESSAGE",
            })}
          </p>
          <p className="fw-bold text-primary">№ {currentShipment.invoice}</p>
          <p className="text-muted fw-semibold fs-7">
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FROM",
            })}
          </p>
          <p className="text-muted fw-semibold fs-7">
            {dayjs(currentShipment.date).format("DD MMMM YYYY")}
          </p>
        </span>
        <div className="mt-2">
          <span className="d-flex gap-1" style={{ width: "max-content" }}>
            <p className="text-muted fw-semibold fs-7">
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.PROVIDER",
              })}
              :
            </p>
            <p className="fw-bold text-primary">{currentShipment.provider}</p>
          </span>
          <span className="d-flex gap-1" style={{ width: "max-content" }}>
            <p className="text-muted fw-semibold fs-7">
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.RECEIVED",
              })}
              :
            </p>
            <p className="text-muted fw-semibold fs-7">
              {currentShipment.shipmentHistory.length}{" "}
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.BY_PRICE",
              })}
              {currentShipment.shipmentHistory[0].price} $,{" "}
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.FOR_THE_AMOUNT",
              })}{" "}
              {currentShipment.shipmentHistory.reduce(
                (prev, curr) => (prev += curr.price),
                0
              )}{" "}
              $
            </p>
          </span>
          <span className="d-flex gap-1" style={{ width: "max-content" }}>
            <p className="text-muted fw-semibold fs-7">
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.IN_STOCK",
              })}
              :
            </p>
            <p className="fw-bold text-primary">
              {currentShipment.status === "sold-out"
                ? 0
                : currentMaterial?.currentMockMaterial?.quantity ?? 0}
            </p>
          </span>
        </div>
      </div>
      <div className="w-100">
        <Table
          // rowSelection={{
          //   type: "checkbox",
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={currentShipment.shipmentHistory.map((s, index) => ({
            ...s,
            key: index,
          }))}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </div>
    </div>
  );
};
