// import clsx from "clsx";
import { FC } from "react";
// import { Link } from "react-router-dom";
// import {
//   // defaultAlerts,
//   defaultLogs,
//   KTIcon,
//   // useIllustrationsPath,
// } from "../../../../../_metronic/helpers";
import { useIntl } from "react-intl";
import {
  IMaterialGroup,
  IMaterialList,
  IMaterialListProperties,
} from "../../MaterialsListModels";
import { GeneralInfoDetailMaterialMenu } from "./GeneralInfoDetailMaterialMenu";
import { GeneralShipments } from "./GeneralShipments";
import { GeneralHistory } from "./GeneralHistory";

export interface ICurrentMaterialsProps {
  currentMockMaterial: IMaterialListProperties | undefined;
  currentMockMaterialGroup: IMaterialGroup | undefined;
  currentMockMaterialList: IMaterialList | undefined;
}

interface IWrapperDetailMaterialInfoMenuProps extends ICurrentMaterialsProps {
  materialList: IMaterialList;
  close: () => void;
  setChangeableCurrentMaterialsList: React.Dispatch<
    React.SetStateAction<IMaterialList>
  >;
}

const WrapperDetailMaterialInfoMenu: FC<
  IWrapperDetailMaterialInfoMenuProps
> = ({
  currentMockMaterial,
  currentMockMaterialGroup,
  currentMockMaterialList,
  materialList,
  setChangeableCurrentMaterialsList,
}) => {
  const fullCurrentMockMaterialInfo = {
    currentMockMaterial,
    currentMockMaterialGroup,
    currentMockMaterialList,
  };
  const intl = useIntl();
  return (
    <div
      className="d-flex menu menu-sub menu-sub-dropdown menu-column w-100% h-100% shadow-none"
      data-kt-menu="true"
    >
      <div className="d-flex flex-column rounded-top bg-light text-muted pt-5">
        {/* <h3 className=" fw-bold px-9 mt-10 mb-6">
          Notifications <span className="fs-8 opacity-75 ps-3">24 reports</span>
        </h3> */}

        <ul className="nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9">
          <li className="nav-item">
            <a
              className="nav-link  opacity-75 opacity-state-100 pb-4 active"
              data-bs-toggle="tab"
              href="#kt_topbar_details_menu_1"
            >
              {intl.formatMessage({ id: "MATERIALS_LIST.DETAILS.GENERAL" })}
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link  opacity-75 opacity-state-100 pb-4"
              data-bs-toggle="tab"
              href="#kt_topbar_details_menu_2"
            >
              {intl.formatMessage({ id: "MATERIALS_LIST.DETAILS.SHIPMENTS" })}
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link opacity-75 opacity-state-100 pb-4"
              data-bs-toggle="tab"
              href="#kt_topbar_details_menu_3"
            >
              {intl.formatMessage({ id: "MATERIALS_LIST.DETAILS.HISTORY" })}
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link  opacity-75 opacity-state-100 pb-4"
              data-bs-toggle="tab"
              href="#kt_topbar_details_menu_4"
            >
              {intl.formatMessage({ id: "MATERIALS_LIST.DETAILS.STOCK" })}
            </a>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        {currentMockMaterial !== undefined &&
          currentMockMaterialGroup !== undefined &&
          currentMockMaterialList !== undefined && (
            <GeneralInfoDetailMaterialMenu
              currentMaterial={fullCurrentMockMaterialInfo}
              materialList={materialList}
              setChangeableCurrentMaterialsList={
                setChangeableCurrentMaterialsList
              }
            />
          )}

        <GeneralShipments
          currentMaterial={fullCurrentMockMaterialInfo}
          materialList={materialList}
        />
        <GeneralHistory
          currentMaterial={fullCurrentMockMaterialInfo}
          materialList={materialList}
        />

        {/* <div
          className="tab-pane fade"
          id="kt_topbar_details_menu_3"
          role="tabpanel"
        >
          <div className="scroll-y mh-325px my-5 px-8">
            {defaultLogs.map((log, index) => (
              <div key={`log${index}`} className="d-flex flex-stack py-4">
                <div className="d-flex align-items-center me-2">
                  <span
                    className={clsx(
                      "w-70px badge",
                      `badge-light-${log.state}`,
                      "me-4"
                    )}
                  >
                    {log.code}
                  </span>

                  <a
                    href="#"
                    className="text-gray-800 text-hover-primary fw-bold"
                  >
                    {log.message}
                  </a>

                  <span className="badge badge-light fs-8">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="py-3 text-center border-top">
            <Link
              to="/crafted/pages/profile"
              className="btn btn-color-gray-600 btn-active-color-primary"
            >
              View All <KTIcon iconName="arrow-right" className="fs-5" />
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export { WrapperDetailMaterialInfoMenu };
