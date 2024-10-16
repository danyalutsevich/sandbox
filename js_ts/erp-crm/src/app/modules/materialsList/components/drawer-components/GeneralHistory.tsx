import React, { useEffect, useState } from "react";
import { ICurrentMaterialsProps } from "./WrapperDetailMaterialInfoMenu";
import {
  IMaterialList,
  IShipmentHistory,
  IShipments,
} from "../../MaterialsListModels";
import { useIntl } from "react-intl";
import {
  Radio,
  RadioChangeEvent,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
// import { ShipmentCard } from "./shipments-tables/ShipmentCard";
import dayjs from "dayjs";

interface IFlatShipmentHistory {
  shipment: IShipments;
  history: IShipmentHistory;
}

interface IGeneralHistoryProps {
  currentMaterial: ICurrentMaterialsProps;
  materialList: IMaterialList;
  // close?: () => void;
}

export const GeneralHistory: React.FC<IGeneralHistoryProps> = ({
  currentMaterial,
  // materialList,
}) => {
  const intl = useIntl();
  const [currentShipments, setCurrentShipments] = useState<
    IShipments[] | undefined
  >();
  const [currentShipmentsPreparedFlat, setCurrentShipmentsPreparedFlat] =
    useState<IFlatShipmentHistory[] | undefined>();

  const getFlatHistory = (shipments: IShipments[]): IFlatShipmentHistory[] => {
    const prepared: IFlatShipmentHistory[] = [];
    for (const shipment of shipments) {
      for (const history of shipment.shipmentHistory) {
        prepared.push({
          shipment,
          history,
        });
      }
    }
    return prepared;
  };

  useEffect(() => {
    if (currentShipments !== undefined) {
      setCurrentShipmentsPreparedFlat(getFlatHistory(currentShipments));
    }
  }, [currentShipments]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTab, setCurrentTab] = useState<"all" | "incoming" | "outgoing">(
    "all"
  );
  useEffect(() => {
    setCurrentShipments(currentMaterial.currentMockMaterial?.shipments);
  }, [currentMaterial]);

  const columns: TableColumnsType<IFlatShipmentHistory> = [
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.HISTORY.DOCUMENT",
      }),
      width: "200px",
      dataIndex: "document",
      render: (text: string, record: IFlatShipmentHistory) => (
        <div
          className="d-flex gap-1 flex-wrap"
          //
        >
          <span className="d-flex gap-1" style={{ width: "max-content" }}>
            <p className="text-dark fw-semibold fs-7 mb-0">
              {intl.formatMessage({
                id: "MATERIALS_LIST.DETAILS.SHIPMENT.MESSAGE",
              })}
            </p>
            <p className="fw-bold text-primary mb-0">
              № {record.shipment.invoice}
            </p>
          </span>
          <span
            className="d-flex gap-1 text-muted fw-semibold fs-7"
            style={{ width: "max-content" }}
          >
            {/* <p className=""> */}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FROM",
            })}{" "}
            {/* </p>
            <p className="text-muted fw-semibold fs-7"> */}
            {dayjs(record.shipment.date).format("DD MMMM YYYY hh:mm")}
            {/* </p> */}
          </span>
        </div>
      ),
      sorter: (a, b) =>
        a.history.serialNumber.length - b.history.serialNumber.length,
    },
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.HISTORY.DESCRIPTION",
      }),
      dataIndex: "description",
      render: (text: string, record: IFlatShipmentHistory) =>
        record.history.shipmentType === "from-provider" ? (
          <span className="text-muted fw-semibold fs-7">
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FROM_PROVIDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">
              {record.shipment.provider}
            </a>{" "}
            {">"} {record.history.stockName} {">"}{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.ORDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">
              {record.history.invoice}
            </a>
          </span>
        ) : (
          <span className="text-muted fw-semibold fs-7">
            {record.history.stockName} {">"}{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.FOR_CLIENT",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">
              {record.history.client}
            </a>{" "}
            {intl.formatMessage({
              id: "MATERIALS_LIST.DETAILS.SHIPMENT.ORDER",
            })}{" "}
            <a className="text-primary fw-semibold fs-7">
              {record.history.invoice}
            </a>
          </span>
        ),
      sorter: (a, b) =>
        dayjs(a.history.date).unix() - dayjs(b.history.date).unix(),
      // sorter: (a, b) => a.serialNumber.length - b.serialNumber.length,
    },
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.HISTORY.INCOMING",
      }),
      dataIndex: "incoming",
      render: (value: string, record: IFlatShipmentHistory) =>
        record.history.shipmentType === "from-provider" ? <>1</> : <></>,
    },
    {
      title: intl.formatMessage({
        id: "MATERIALS_LIST.DETAILS.HISTORY.OUTGOING",
      }),
      dataIndex: "outgoing",
      render: (value: string, record: IFlatShipmentHistory) =>
        record.history.shipmentType === "to-client" ? <>1</> : <></>,
    },
  ];

  useEffect(() => {
    console.log(currentTab);
    switch (currentTab) {
      case "incoming":
        setCurrentShipmentsPreparedFlat(
          getFlatHistory(currentShipments ?? []).filter(
            (s) => s.history.shipmentType === "from-provider"
          )
        );
        console.log(
          getFlatHistory(currentShipments ?? []).filter(
            (s) => s.history.shipmentType === "from-provider"
          )
        );
        break;
      case "outgoing":
        console.log(
          getFlatHistory(currentShipments ?? []).filter(
            (s) => s.history.shipmentType === "to-client"
          )
        );
        setCurrentShipmentsPreparedFlat(
          getFlatHistory(currentShipments ?? []).filter(
            (s) => s.history.shipmentType === "to-client"
          )
        );
        break;
      case "all":
      default:
        setCurrentShipmentsPreparedFlat(getFlatHistory(currentShipments ?? []));
        break;
    }
  }, [currentTab]);

  const handleChangeTab = ({ target: { value } }: RadioChangeEvent) => {
    setCurrentTab(value);
  };

  const onChange: TableProps<IFlatShipmentHistory>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div
        className="tab-pane fade show"
        id="kt_topbar_details_menu_3"
        role="tabpanel"
      >
        <div className="d-flex flex-column px-5 my-5">
          <div className="d-flex w-100 justify-content-between">
            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              value={currentTab}
              onChange={handleChangeTab}
            >
              <Radio.Button value="all">
                {intl.formatMessage({
                  id: "MATERIALS_LIST.DETAILS.HISTORY.ALL",
                })}
              </Radio.Button>
              <Radio.Button value="incoming">
                {intl.formatMessage({
                  id: "MATERIALS_LIST.DETAILS.HISTORY.INCOMING",
                })}
              </Radio.Button>
              <Radio.Button value="outgoing">
                {intl.formatMessage({
                  id: "MATERIALS_LIST.DETAILS.HISTORY.OUTGOING",
                })}
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="mt-5">
            <Table
              // rowSelection={{
              //   type: "checkbox",
              //   ...rowSelection,
              // }}
              columns={columns}
              // dataSource={[]}
              dataSource={
                currentShipmentsPreparedFlat?.map((s, index) => ({
                  ...s,
                  key: index,
                })) ?? []
              }
              onChange={onChange}
              showSorterTooltip={{ target: "sorter-icon" }}
            />
          </div>

          {/* <div>{currentTab}</div> */}
          <div className="pt-5 d-flex flex-column gap-5">
            {/* ================ */}
            {/* {currentShipments !== undefined &&
              currentShipments.length > 0 &&
              currentShipments.map((shipment, index) => (
                <ShipmentCard
                  key={index}
                  currentShipment={shipment}
                  currentMaterial={currentMaterial}
                />
              ))} */}
            {/* ================ */}
            {/* <h3 className="text-gray-900 text-center fw-bolder">
              Get Pro Access
            </h3>

            <div className="text-center text-gray-600 fw-bold pt-1">
              Outlines keep you honest. They stoping you from amazing poorly
              about drive
            </div>

            <div className="text-center mt-5 mb-9">
              <a
                href="#"
                className="btn btn-sm btn-primary px-6"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_upgrade_plan"
              >
                Upgrade
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
