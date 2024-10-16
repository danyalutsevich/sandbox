import { FC, Fragment, useEffect, useState } from "react";
import { IMaterialList } from "../MaterialsListModels";
// import { KTIcon } from "../../../../_metronic/helpers";
import { TableHeader } from "./TableHeader";
import { useIntl } from "react-intl";
import { colorIconUtil } from "../../../../_metronic/helpers/custom/colorIcon.util";
import { useNavigate } from "react-router-dom";
import { MaterialFullInfoDrawer } from "../../../../_metronic/partials";
// import { MaterialFullInfoDrawer } from "../../../../_metronic/partials/layout/material-full-info-drawer/MaterialFullInfoDrawer";

interface IMaterialsTableProps {
  currentMaterialsList: IMaterialList;
  className?: string;
}

const MaterialsTable: FC<IMaterialsTableProps> = ({
  currentMaterialsList,
  className,
}) => {
  const [changeableCurrentMaterialsList, setChangeableCurrentMaterialsList] =
    useState<IMaterialList>(currentMaterialsList);

  useEffect(() => {
    setChangeableCurrentMaterialsList(currentMaterialsList);
  }, [currentMaterialsList]);
  const [isOpenDetailInfo, setIsOpenDetailInfo] = useState(false);
  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl();
  const tableHeaders = [
    {
      minSize: "min-w-20px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.CODE" }),
      tableCode: "code",
    },
    {
      minSize: "min-w-50px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.VENDOR_CODE" }),
      tableCode: "vendorCode",
    },
    {
      minSize: "min-w-150px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.NAME" }),
      tableCode: "name",
    },
    {
      minSize: "min-w-70px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.COLOR" }),
      tableCode: "color",
    },
    {
      minSize: "min-w-100px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.QUANTITY" }),
      tableCode: "quantity",
    },
    {
      minSize: "min-w-100px",
      name: intl
        .formatMessage({ id: "MATERIALS_LIST.TABLE.PURCHASE_PRICE" })
        .concat(", $"),
      tableCode: "purchasePrice",
    },
    {
      minSize: "min-w-100px",
      name: intl.formatMessage({ id: "MATERIALS_LIST.TABLE.BALANCE" }),
      tableCode: "balance",
    },
    {
      minSize: "min-w-100px",
      name: intl
        .formatMessage({ id: "MATERIALS_LIST.TABLE.CONSUMER_PRICE" })
        .concat(", $"),
      tableCode: "consumerPrice",
    },
    {
      minSize: "min-w-100px",
      name: intl
        .formatMessage({ id: "MATERIALS_LIST.TABLE.MAXIMUM_PRICE" })
        .concat(", $"),
      tableCode: "maximumPrice",
    },
    {
      minSize: "min-w-100px",
      name: intl
        .formatMessage({ id: "MATERIALS_LIST.TABLE.WHOLESALE_PRICE" })
        .concat(", $"),
      tableCode: "wholesalePrice",
    },
  ];

  const handleOpenCreationModal = (): void => {
    navigate(`?materialId=${changeableCurrentMaterialsList.id}`);
    setIsOpenCreateProduct(true);
  };

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <TableHeader
        openModalCreationProduct={handleOpenCreationModal}
        currentMaterialsList={changeableCurrentMaterialsList}
      />
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      data-kt-check="true"
                      data-kt-check-target=".materials-table-check"
                    />
                  </div>
                </th>
                {tableHeaders.map((headKey, index) => (
                  <th className={headKey.minSize} key={index}>
                    {headKey.name}
                  </th>
                ))}
                {/* <th className="min-w-150px">Order Id</th>
                <th className="min-w-140px">Country</th>
                <th className="min-w-120px">Date</th>
                <th className="min-w-120px">Company</th>
                <th className="min-w-120px">Total</th>
                <th className="min-w-120px">Status</th>
                <th className="min-w-100px text-end">Actions</th> */}
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {changeableCurrentMaterialsList.groups.map(
                (materialGroup, index) => {
                  return (
                    <Fragment key={materialGroup.groupCode + index}>
                      <tr>
                        <td>
                          <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input
                              className="form-check-input materials-table-check"
                              type="checkbox"
                              value="1"
                            />
                          </div>
                        </td>
                        <td>
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary fs-6"
                          >
                            {materialGroup.groupCode}
                          </a>
                        </td>
                        <td></td>

                        <td>
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                          >
                            {materialGroup.groupName}
                          </a>
                        </td>
                        <td>{colorIconUtil(materialGroup.availableColors)}</td>
                        <td>
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                          >
                            {materialGroup.items.reduce(
                              (prev, curr) => (prev += curr.quantity),
                              0
                            )}
                          </a>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      {materialGroup.items.map((material) => (
                        <tr key={material.vendorCode}>
                          <td>
                            {/* <div className="form-check form-check-sm form-check-custom form-check-solid">
                            <input
                              className="form-check-input materials-table-check"
                              type="checkbox"
                              value="1"
                            />
                          </div> */}
                          </td>
                          <td>
                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                              <input
                                className="form-check-input materials-table-check"
                                type="checkbox"
                                value="1"
                              />
                            </div>
                            {/* <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary fs-6"
                          >
                            {materialGroup.groupCode}
                          </a> */}
                          </td>
                          <td>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {material.vendorCode}
                            </span>
                          </td>
                          <td>
                            <a
                              href={`#${material.vendorCode}`}
                              id="kt_custom_material_full_info_toggle"
                              // data-toggle="modal"
                              // data-target="#exampleModalCenter"
                              onClick={() => {
                                setIsOpenDetailInfo(true);
                                navigate(
                                  `?materialId=${changeableCurrentMaterialsList.id}&groupCode=${materialGroup.groupCode}&vendorCode=${material.vendorCode}`
                                );
                              }}
                              className="text-gray-900 text-hover-primary d-block mb-1 fs-6"
                            >
                              {materialGroup.groupName}
                            </a>
                          </td>
                          <td>
                            {/* <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                          > */}
                            {colorIconUtil([material.color])}
                            {/* </a> */}
                          </td>
                          <td>
                            <a
                              href="#"
                              className="text-gray-900 text-hover-primary d-block mb-1 fs-6"
                            >
                              {material.quantity}
                            </a>
                          </td>
                          <td className="text-gray-900 fw-bold text-hover-primary fs-6">
                            {material.purchasePrice}
                          </td>
                          <td>
                            <span className="badge badge-light-success">
                              {material.balance}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold text-hover-primary fs-6">
                              {material.consumerPrice}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold text-hover-primary fs-6">
                              {material.maximumPrice}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold text-hover-primary fs-6">
                              {material.wholesalePrice}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  );
                }
              )}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>

      <MaterialFullInfoDrawer
        isOpen={isOpenDetailInfo}
        close={() => {
          setIsOpenDetailInfo(false);
        }}
        materialList={changeableCurrentMaterialsList}
        setChangeableCurrentMaterialsList={setChangeableCurrentMaterialsList}
      />
      <MaterialFullInfoDrawer
        isOpen={isOpenCreateProduct}
        close={() => {
          setIsOpenCreateProduct(false);
        }}
        creationMode
        materialList={changeableCurrentMaterialsList}
        setChangeableCurrentMaterialsList={setChangeableCurrentMaterialsList}
      />

      {/* <MaterialFullInfoDrawer /> */}
      {/* begin::Body */}
    </div>
  );
};

export { MaterialsTable };
