import React, { useEffect, useState } from "react";
import { ICurrentMaterialsProps } from "./WrapperDetailMaterialInfoMenu";
import { IMaterialList, IShipments } from "../../MaterialsListModels";
import { useIntl } from "react-intl";
import { Empty, Radio, RadioChangeEvent } from "antd";
import { ShipmentCard } from "./shipments-tables/ShipmentCard";

interface IGeneralShipmentsProps {
  currentMaterial: ICurrentMaterialsProps;
  materialList: IMaterialList;
  // close?: () => void;
}

export const GeneralShipments: React.FC<IGeneralShipmentsProps> = ({
  currentMaterial,
  // materialList,
}) => {
  const intl = useIntl();
  const [currentShipments, setCurrentShipments] = useState<
    IShipments[] | undefined
  >();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTab, setCurrentTab] = useState<"all" | "inStock" | "soldOut">(
    "all"
  );
  useEffect(() => {
    setCurrentShipments(currentMaterial.currentMockMaterial?.shipments);
  }, [currentMaterial]);

  useEffect(() => {
    switch (currentTab) {
      case "inStock":
        console.log("in-stock");
        setCurrentShipments(
          currentMaterial.currentMockMaterial?.shipments?.filter(
            (s) => s.status === "in-stock"
          )
        );
        break;
      case "soldOut":
        console.log("sold-out");
        setCurrentShipments(
          currentMaterial.currentMockMaterial?.shipments?.filter(
            (s) => s.status === "sold-out"
          )
        );
        break;
      case "all":
      default:
        console.log("all");
        setCurrentShipments(currentMaterial.currentMockMaterial?.shipments);
        break;
    }
  }, [currentTab]);

  const handleChangeTab = ({ target: { value } }: RadioChangeEvent) => {
    setCurrentTab(value);
  };

  // const handleMockSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const filter = event.target.value;
  //   if (filter.trim() !== '') {
  //     const filtered = currentShipments?.filter((s) => {
  //       return (
  //         s.client?.includes(filter) ||
  //         s.invoice?.includes(filter) ||
  //         s.provider?.includes(filter) ||
  //         s.status?.includes(filter)
  //       );
  //     });
  //     setCurrentShipments(filtered);
  //   } else {

  //   }
  // };

  return (
    <>
      <div
        className="tab-pane fade show"
        id="kt_topbar_details_menu_2"
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
                  id: "MATERIALS_LIST.DETAILS.SHIPMENT.ALL",
                })}
              </Radio.Button>
              <Radio.Button value="inStock">
                {intl.formatMessage({
                  id: "MATERIALS_LIST.DETAILS.SHIPMENT.IN_STOCK",
                })}
              </Radio.Button>
              <Radio.Button value="soldOut">
                {intl.formatMessage({
                  id: "MATERIALS_LIST.DETAILS.SHIPMENT.SOLD_OUT",
                })}
              </Radio.Button>
            </Radio.Group>
            <input
              type="search"
              className="form-control form-control-sm w-200px"
              // onChange={handleMockSearch}
            />
          </div>

          {/* <div>{currentTab}</div> */}
          <div className="pt-5 d-flex flex-column gap-5">
            {currentShipments !== undefined ? (
              <>
                {currentShipments.length > 0 ? (
                  currentShipments.map((shipment, index) => (
                    <ShipmentCard
                      key={index}
                      currentShipment={shipment}
                      currentMaterial={currentMaterial}
                    />
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
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
