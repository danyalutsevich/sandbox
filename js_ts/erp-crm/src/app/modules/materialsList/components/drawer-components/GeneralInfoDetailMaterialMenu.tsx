/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { ICurrentMaterialsProps } from "./WrapperDetailMaterialInfoMenu";
import { toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { PhotoContainer } from "../../../../../_metronic/partials/custom/photo-container/PhotoContainer";
import {
  ITableInfoInputsConfig,
  TableInfoInputs,
} from "../../../../../_metronic/partials";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  IFormMainInfo,
  IFormMainPriceInfo,
  IFormMainRulesInfo,
} from "./interfaces/FormMainInfo.interface";
import { useLocation } from "react-router-dom";
// import { colorIconUtil } from "../../../../../_metronic/helpers/custom/colorIcon.util";
import { ColorValue } from "./ColorValue";
import { AvailableColors } from "../../../../../_metronic/helpers/custom/colorIcon.util";
import { SharedModal } from "../../../../../_metronic/partials/custom/modal/SharedModal";
import { WriteOffModal } from "./modals/WriteOffModal";
import { Toaster } from "../../../../../_metronic/partials/custom/toast/Toaster";
import * as bootstrap from "bootstrap";
import { DeleteModal } from "./modals/DeleteModal";
import { IMaterialList } from "../../MaterialsListModels";
import { IRule, RulesTable } from "./rules/RulesTable";
import { CreateRuleModal } from "./modals/CreateRuleModal";
import {
  EmployeeCommissionTable,
  IEmployeeCommission,
} from "./rules/EmployeeCommissionTable";
import { CreateCommissionRuleModal } from "./modals/CreateCommissionRuleModal";

const mainInfoValuesPriceSchema = Yup.object().shape({
  consumerPrice: Yup.number().min(1).required("Price is required"),
  maximumPrice: Yup.number().min(1).required("Price is required"),
  wholesalePrice: Yup.number().min(1).required("Price is required"),
  purchasePrice: Yup.number().min(1).required("Price is required"),
});

const mainInfoValuesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  nameEnglish: Yup.string().required("English name is required"),
  code: Yup.string().required("Code is required"),
  color: Yup.string().required("Color is required"),
  description: Yup.string().required("Description is required"),
});

const mainInfoValuesCreationModeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  nameEnglish: Yup.string().required("English name is required"),
  code: Yup.string().required("Code is required"),
  color: Yup.string().required("Color is required. Firstly choose a group"),
  description: Yup.string().required("Description is required"),
});

interface IGeneralInfoDetailMaterialMenuProps {
  currentMaterial: ICurrentMaterialsProps;
  creationMode?: boolean;
  materialList: IMaterialList;
  setChangeableCurrentMaterialsList: React.Dispatch<
    React.SetStateAction<IMaterialList>
  >;
  close?: () => void;
}

export const GeneralInfoDetailMaterialMenu: FC<
  IGeneralInfoDetailMaterialMenuProps
> = ({
  currentMaterial,
  creationMode,
  materialList,
  close,
  setChangeableCurrentMaterialsList,
}) => {
  const location = useLocation();
  const [currentColor, setCurrentColor] = useState(
    currentMaterial.currentMockMaterial?.color
  );
  const initialMainInfoPriceValues: ITableInfoInputsConfig[] = [
    {
      label: "Consumer price",
      value: `${
        currentMaterial.currentMockMaterial?.consumerPrice.toString() ?? "0"
      }`,
      inputKey: "consumerPrice",
      isNotChangeable: false,
      inputType: "number",
      firstRead: creationMode ? false : true,
    },
    {
      label: "Maximum price",
      value: `${
        currentMaterial.currentMockMaterial?.maximumPrice.toString() ?? "0"
      }`,
      inputKey: "maximumPrice",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
      inputType: "number",
    },
    {
      label: "Purchase price",
      value: `${
        currentMaterial.currentMockMaterial?.purchasePrice.toString() ?? "0"
      }`,
      inputKey: "purchasePrice",
      isNotChangeable: false,
      inputType: "number",
      firstRead: creationMode ? false : true,
    },
    {
      label: "Wholesale price",
      value: `${
        currentMaterial.currentMockMaterial?.wholesalePrice.toString() ?? "0"
      }`,
      inputKey: "wholesalePrice",
      isNotChangeable: false,
      inputType: "number",
      firstRead: creationMode ? false : true,
    },
  ];
  // const initialMainInfoRulesValues: ITableInfoInputsConfig[] = [
  //   {
  //     label: "Stock London #1",
  //     value: `200 items/m`,
  //     inputKey: "stockLondon1",
  //     isNotChangeable: false,
  //     firstRead: creationMode ? false : true,
  //   },
  //   {
  //     label: "Stock London #2",
  //     value: `${currentMaterial.currentMockMaterial?.vendorCode} items/m`,
  //     inputKey: "stockLondon2",
  //     isNotChangeable: false,
  //     firstRead: creationMode ? false : true,
  //   },
  // ];
  const initialMainInfoEmployeeCommissionsValues: ITableInfoInputsConfig[] = [
    {
      label: "Ray The Second",
      value: `4 %`,
      inputKey: "ray",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Andy McLine",
      value: `14 %`,
      inputKey: "andy",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
  ];
  const initialMainInfoValues: ITableInfoInputsConfig[] = [
    {
      label: "Code",
      value: currentMaterial.currentMockMaterialGroup?.groupCode ?? "",
      inputKey: "code",
      // inputKey: "main-info-value-code",
      isNotChangeable: true,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Vendor code",
      value:
        creationMode === true
          ? `${currentMaterial.currentMockMaterialList?.id}`
          : currentMaterial.currentMockMaterial?.vendorCode ?? "",
      inputKey: "vendorCode",
      // inputKey: "main-info-value-code",
      isNotChangeable: true,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Name",
      // value: "TEST NAME",
      value: currentMaterial.currentMockMaterialGroup?.groupName ?? "",
      inputKey: "name",
      // inputKey: "main-info-value-name",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Name in english",
      value: currentMaterial.currentMockMaterialGroup?.groupName ?? "",
      inputKey: "nameEnglish",
      // inputKey: "main-info-value-name-in-english",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Color",
      value: currentColor ?? "",
      customValueJsx: <ColorValue color={currentColor} />,
      inputKey: "color",
      inputType: "select",
      selectOptions:
        currentMaterial.currentMockMaterialGroup?.availableColors.map(
          (color, index) => ({
            id: index,
            value: color,
            label: color,
          })
        ),
      selectValue: currentMaterial.currentMockMaterial?.color ?? "",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Description",
      value: currentMaterial.currentMockMaterial?.itemDescription ?? "",
      inputKey: "description",
      // inputKey: "main-info-value-description",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
  ];
  // const [chosenGroupCreation, setChosenGroupCreation] = useState<string>("");
  const initialMainInfoValuesCreation: ITableInfoInputsConfig[] = [
    {
      label: "Group",
      value: "",
      inputKey: "group",
      inputType: "select",
      selectOptions: currentMaterial.currentMockMaterialList?.groups.map(
        (group, index) => ({
          id: index,
          value: group.groupCode,
          label: group.groupName,
        })
      ),
      selectValue: "",
      isNotChangeable: false,
      firstRead: false,
    },
    {
      label: "Color",
      value: currentColor ?? "",
      customValueJsx: <ColorValue color={currentColor} />,
      inputKey: "color",
      inputType: "select",
      selectOptions:
        currentMaterial.currentMockMaterialGroup?.availableColors.map(
          (color, index) => ({
            id: index,
            value: color,
            label: color,
          })
        ),
      selectValue: currentMaterial.currentMockMaterial?.color ?? "",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
      disabled: true,
    },
    {
      label: "Vendor code",
      value: "------",
      inputKey: "vendorCode",
      // inputKey: "main-info-value-code",
      isNotChangeable: true,
      firstRead: true,
    },
    {
      label: "Name",
      // value: "TEST NAME",
      value: currentMaterial.currentMockMaterialGroup?.groupName ?? "",
      inputKey: "name",
      // inputKey: "main-info-value-name",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
    {
      label: "Name in english",
      value: currentMaterial.currentMockMaterialGroup?.groupName ?? "",
      inputKey: "nameEnglish",
      // inputKey: "main-info-value-name-in-english",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },

    {
      label: "Description",
      value: currentMaterial.currentMockMaterial?.itemDescription ?? "",
      inputKey: "description",
      // inputKey: "main-info-value-description",
      isNotChangeable: false,
      firstRead: creationMode ? false : true,
    },
  ];

  const initialRulesForTable: IRule[] = [
    { id: 1, stockName: "Kyiv #1", min: 10, max: 120, key: 1 },
    { id: 2, stockName: "Stockholm #1", min: 10, max: 1110, key: 2 },
    { id: 3, stockName: "London #1", min: 10, max: 1500, key: 3 },
  ];
  const initialRulesCommissionForTable: IEmployeeCommission = {
    id: 1,
    calculationRule: "percent",
    quantity: 0,
    percent: 15,
    key: 1,
  };

  const [changeableRulesForTable, setChangeableRulesForTable] = useState<
    IRule[]
  >(creationMode ? [] : initialRulesForTable);

  const updateRulesForTable = (rule: IRule): void => {
    console.log(rule);
    setChangeableRulesForTable([...changeableRulesForTable, rule]);
  };

  const [
    changeableRulesCommissionForTable,
    setChangeableRulesCommissionForTable,
  ] = useState<IEmployeeCommission | null>(
    creationMode ? null : initialRulesCommissionForTable
  );

  const updateRulesCommissionForTable = (
    rule: IEmployeeCommission | null
  ): void => {
    console.log(rule);
    setChangeableRulesCommissionForTable(rule);
  };

  const [isSubmitPressed, setIsSubmitPressed] = useState(false);

  const [mainInfoValues, setMainInfoValues] = useState<
    ITableInfoInputsConfig[]
  >(
    creationMode === true
      ? initialMainInfoValuesCreation
      : initialMainInfoValues
  );
  // const [mainInfoRulesValues, setMainInfoRulesValues] = useState<
  //   ITableInfoInputsConfig[]
  // >(initialMainInfoRulesValues);
  // const [
  //   mainInfoRulesEmployeeCommissionsValues,
  //   setMainInfoRulesEmployeeCommissionsValues,
  // ] = useState<ITableInfoInputsConfig[]>(
  //   initialMainInfoEmployeeCommissionsValues
  // );
  const [mainInfoPriceValues, setMainInfoPriceValues] = useState<
    ITableInfoInputsConfig[]
  >(initialMainInfoPriceValues);

  // const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isOpenModalWriteOff, setIsOpenModalWriteOff] = useState(false);
  const [isOpenModalSuccessSaved, setIsOpenModalSuccessSaved] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalCreateRule, setIsOpenModalCreateRule] = useState(false);
  const [isOpenModalCreateCommissionRule, setIsOpenModalCreateCommissionRule] =
    useState(false);

  const initialPriceValues: IFormMainPriceInfo = {
    consumerPrice:
      parseInt(
        initialMainInfoPriceValues.find(
          (value) => value.inputKey === "consumerPrice"
        )?.value ?? ""
      ) ?? "",
    maximumPrice:
      parseInt(
        initialMainInfoPriceValues.find(
          (value) => value.inputKey === "maximumPrice"
        )?.value ?? ""
      ) ?? "",
    wholesalePrice:
      parseInt(
        initialMainInfoPriceValues.find(
          (value) => value.inputKey === "wholesalePrice"
        )?.value ?? ""
      ) ?? "",
    purchasePrice:
      parseInt(
        initialMainInfoPriceValues.find(
          (value) => value.inputKey === "purchasePrice"
        )?.value ?? ""
      ) ?? "",
  };
  const initialValues: IFormMainInfo = {
    name:
      initialMainInfoValues.find((value) => value.inputKey === "name")?.value ??
      "",
    nameEnglish:
      initialMainInfoValues.find((value) => value.inputKey === "nameEnglish")
        ?.value ?? "",
    code:
      initialMainInfoValues.find((value) => value.inputKey === "code")?.value ??
      "",
    color:
      initialMainInfoValues.find((value) => value.inputKey === "color")
        ?.value ?? "",
    description:
      initialMainInfoValues.find((value) => value.inputKey === "description")
        ?.value ?? "",
  };
  const initialRulesValues: any = {
    stockLondon1: "200 items/m",
    stockLondon2: "250 items/m",
  };

  const initialEmployeeCommissionsValues: any = {
    ray: "4 %",
    andy: "15 %",
    // mainInfoRulesValues.find((value) => value.inputKey === "stockLondon1")
    //   ?.value ?? "",
  };
  const [initialFormicValues, setInitialFormicValues] =
    useState<IFormMainInfo>(initialValues);
  const [
    initialFormicEmployeeCommissionsValues,
    setInitialFormicEmployeeCommissionsValues,
  ] = useState<any>(initialEmployeeCommissionsValues);
  const [initialFormicRulesValues, setInitialFormicRulesValues] =
    useState<IFormMainRulesInfo>(initialRulesValues);
  const [initialFormicPriceValues, setInitialFormicPriceValues] =
    useState<IFormMainPriceInfo>(initialPriceValues);
  const [isLoadingMainInfo, setIsLoadingMainInfo] = useState(false);

  // const initialFormicValues: IFormMainInfo = Object.fromEntries(
  //   initialMainInfoValues
  //     .map((v) => v.inputKey)
  //     .map((key) => [
  //       key,
  //       initialMainInfoValues.find((value) => value.inputKey === key)
  //         ?.value ?? "",
  //     ])
  // )

  // const [initialData, setInitialData] = useState<IFormMainInfo>(initialValues);

  useEffect(() => {
    console.log("new material", formik);
    setMainInfoValues(
      creationMode === true
        ? initialMainInfoValuesCreation
        : initialMainInfoValues
    );
    setInitialFormicValues(initialFormicValues);
    setMainInfoPriceValues(initialMainInfoPriceValues);
    setInitialFormicPriceValues(initialFormicPriceValues);
    // setMainInfoRulesValues(initialMainInfoRulesValues);
    setInitialFormicRulesValues(initialFormicRulesValues);
    setInitialFormicEmployeeCommissionsValues(initialEmployeeCommissionsValues);
    setInitialFormicEmployeeCommissionsValues(
      initialMainInfoEmployeeCommissionsValues
    );
    // setMainInfoRulesValues()
  }, [currentMaterial, location]);

  useEffect(() => {
    console.log(mainInfoValues);
    setCurrentColor(
      mainInfoValues.find((v) => v.inputKey === "color")
        ?.value as AvailableColors
    );
    // console.log(
    //   mainInfoValues.find((v) => v.inputKey === "color")
    //     ?.value as AvailableColors
    // );
  }, [mainInfoValues]);

  const handleSafeUpdate = (key: string, value: string): void => {
    console.log(key, value);
    formik.setFieldValue(key, value);
    switch (key) {
      case "group":
        formik.setFieldValue("code", value);
        if (creationMode === true) {
          setMainInfoValues(
            mainInfoValues.map((v) => {
              switch (v.inputKey) {
                case key:
                  return { ...v, value, selectValue: value };
                case "vendorCode":
                  return {
                    ...v,
                    value: `${value}00${
                      (currentMaterial.currentMockMaterialList?.groups.find(
                        (group) => group.groupCode === value
                      )?.items.length ?? 0) + 1
                    }`,
                  };
                case "color":
                  return {
                    ...v,
                    selectOptions:
                      currentMaterial.currentMockMaterialList?.groups
                        .find((g) => g.groupCode === value)
                        ?.availableColors.map((color, index) => ({
                          id: index,
                          value: color,
                          label: color,
                        })) ?? [],
                    disabled: false,
                  };
                default:
                  return v;
              }
            })
          );
          // }
        }
        break;

      // case "color":
      //   if (creationMode === true) {
      //     setMainInfoValues(
      //       mainInfoValues.map((v) => {
      //         switch (v.inputKey) {
      //           case key:
      //             return { ...v, value, selectValue: value };
      //           case "vendorCode":
      //             return {
      //               ...v,
      //               value:
      //                 v.value.match("-") !== null
      //                   ? `${v.value.split("-")[0]}-${value}`
      //                   : `-${value}`,
      //             };
      //           default:
      //             return v;
      //         }
      //       })
      //     );
      //   }
      //   break;
      default:
        break;
    }
  };

  const formik = useFormik<IFormMainInfo>({
    initialValues: initialFormicValues,
    validationSchema:
      creationMode === true
        ? mainInfoValuesCreationModeSchema
        : mainInfoValuesSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      setIsLoadingMainInfo(true);
      setTimeout(() => {
        console.log("Form sent", values);
        // const extendedInitialValues = initialMainInfoValues.map(v => ({
        //   ...v,
        // }))
        // values.
        // values.communications.email = data.communications.email
        // values.communications.phone = data.communications.phone
        // values.allowMarketing = data.allowMarketing
        // const updatedData = Object.assign(data, values)
        // setMainInfoValues(updatedData)
        setIsLoadingMainInfo(false);
      }, 1000);
    },
  });

  const formikPrice = useFormik<IFormMainPriceInfo>({
    initialValues: initialFormicPriceValues,
    validationSchema: mainInfoValuesPriceSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      setIsLoadingMainInfo(true);
      setTimeout(() => {
        console.log("Form sent", values);
        setIsLoadingMainInfo(false);
      }, 1000);
    },
  });

  const formikRules = useFormik<any>({
    initialValues: initialFormicRulesValues,
    // validationSchema: mainInfoValuesPriceSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      setIsLoadingMainInfo(true);
      setTimeout(() => {
        console.log("Form sent", values);
        setIsLoadingMainInfo(false);
      }, 1000);
    },
  });

  const formikEmployeeCommissions = useFormik<any>({
    initialValues: initialFormicEmployeeCommissionsValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      setIsLoadingMainInfo(true);
      setTimeout(() => {
        console.log("Form sent", values);
        setIsLoadingMainInfo(false);
      }, 1000);
    },
  });

  const handlePseudoSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitPressed(true);
    const allFormicData =
      creationMode === true
        ? [formik, formikPrice]
        : [formik, formikPrice, formikRules, formikEmployeeCommissions];
    const isAllValid = allFormicData.every((f) => f.isValid);

    console.log(allFormicData);
    if (isAllValid) {
      setIsOpenModalSuccessSaved(true);
      allFormicData.map((f) => f.resetForm());
    } else {
      const toastError = new bootstrap.Toast("#notAllFieldsCorrect");
      toastError.show();
    }

    // setMainInfoValues(initialMainInfoValues);
    // setMainInfoPriceValues(initialMainInfoPriceValues);
    // setMainInfoRulesValues(initialMainInfoRulesValues);
  };

  const updateAllMaterials = () => {
    if (creationMode === true) {
      setChangeableCurrentMaterialsList({
        ...materialList,
        groups: materialList.groups.map((group) => ({
          ...group,
          items:
            formik.values.code === group.groupCode
              ? [
                  ...group.items,
                  {
                    vendorCode:
                      mainInfoValues.find((v) => v.inputKey === "vendorCode")
                        ?.value ?? "",
                    color: formik.values.color as AvailableColors,
                    purchasePrice: formikPrice.values.purchasePrice,
                    balance: "in-stock",
                    consumerPrice: formikPrice.values.consumerPrice,
                    maximumPrice: formikPrice.values.maximumPrice,
                    wholesalePrice: formikPrice.values.wholesalePrice,
                    quantity: 1,
                  },
                ]
              : group.items,
        })),
      });
    }
  };

  const SuccessSavedContentModal: FC = () => {
    return (
      <div className="form-label fs-6 fw-bolder mb-3 p-10 text-center">
        Changes has been successfully saved
        <button
          type="button"
          className="btn btn-dark w-100 mt-10"
          onClick={() => {
            // ======= MOCK UPDATE ========
            updateAllMaterials();
            // materialList={materialList}
            // setChangeableCurrentMaterialsList={setChangeableCurrentMaterialsList}
            setTimeout(() => {
              setIsOpenModalSuccessSaved(false);
              creationMode === true && close?.();
            }, 500);
          }}
        >
          OK
        </button>
      </div>
    );
  };

  return (
    <>
      <form
        className="tab-pane fade show mt-10 active"
        id="kt_topbar_details_menu_1"
        role="tabpanel"
        onSubmit={handlePseudoSave}
      >
        <div className="px-4 app-container container-xl d-flex flex-column gap-5">
          {/* <div className="d-flex flex-stack py-4"> */}
          <div className="row justify-content-between">
            <div className="col-6">
              {/* ===== Photo block start:: */}
              <PhotoContainer
                clickOverlayBtnFn={() => {}}
                textOverlayBtn={"Delete"}
                imagesList={
                  creationMode === true
                    ? [
                        // toAbsoluteUrl("media/stock/600x400/img-29.jpg"),
                        // toAbsoluteUrl("media/stock/600x400/img-29.jpg"),
                      ]
                    : [
                        toAbsoluteUrl("media/stock/600x400/img-29.jpg"),
                        toAbsoluteUrl("media/stock/600x400/img-31.jpg"),
                        toAbsoluteUrl("media/stock/600x400/img-40.jpg"),
                        toAbsoluteUrl("media/stock/600x400/img-29.jpg"),
                      ]
                }
              />
              {/* ===== Photo block end:: */}
            </div>
            <div className="col-6 mt-5">
              {/* ====== TEST INPUT FORMIK */}

              <TableInfoInputs
                inputValues={mainInfoValues}
                formik={formik}
                setInputValues={setMainInfoValues}
                isSubmitPressed={isSubmitPressed}
                creationMode={creationMode}
                safeUpdate={handleSafeUpdate}
              />
            </div>
          </div>
          <h2 className="card-label">Prices, $:</h2>
          <div className="row gap-5">
            <TableInfoInputs
              inputValues={mainInfoPriceValues}
              formik={formikPrice}
              setInputValues={setMainInfoPriceValues}
              isSubmitPressed={isSubmitPressed}
              creationMode={creationMode}
            />
          </div>
          {/* <h2 className="card-label mt-4">Inventory control:</h2> */}
          <div className="row gap-5">
            <RulesTable
              rules={changeableRulesForTable}
              openModal={() => {
                setIsOpenModalCreateRule(true);
              }}
            />
            <EmployeeCommissionTable
              commissionRule={changeableRulesCommissionForTable}
              openModal={() => {
                setIsOpenModalCreateCommissionRule(true);
              }}
              updateRulesForTable={setChangeableRulesCommissionForTable}
            />
            {/* {creationMode === true ? (
              <>
              </>
            ) : (
              <TableInfoInputs
                // inputValues={initialMainInfoRulesValues}
                inputValues={mainInfoRulesValues}
                formik={formikRules}
                tableModeConfig={{
                  tablePropertyLabel: "Stock",
                  tableValueLabel: "Minimum stock level",
                }}
                extendableModeConfig={{
                  addLabelText: "Add new rule",
                  setInputValues: setMainInfoRulesValues,
                }}
                setInputValues={setMainInfoRulesValues}
                isSubmitPressed={isSubmitPressed}
                creationMode={creationMode}
              />
            )} */}
          </div>
          {/* <h2 className="card-label mt-4">Employee commissions:</h2>
          <div className="row gap-5">
            {creationMode === true ? (
              <></>
            ) : (
              <TableInfoInputs
                // inputValues={initialMainInfoRulesValues}
                inputValues={mainInfoRulesEmployeeCommissionsValues}
                formik={formikEmployeeCommissions}
                tableModeConfig={{
                  tablePropertyLabel: "Employee name",
                  tableValueLabel: "Employee commission, %",
                }}
                isSubmitPressed={isSubmitPressed}
                extendableModeConfig={{
                  addLabelText: "Add new rule",
                  setInputValues: setMainInfoRulesEmployeeCommissionsValues,
                }}
                setInputValues={setMainInfoRulesEmployeeCommissionsValues}
                creationMode={creationMode}
              />
            )}
          </div> */}

          {/* {defaultAlerts.map((alert, index) => (
      <div key={`alert${index}`} className="d-flex flex-stack py-4">
        <div className="d-flex align-items-center">
          <div className="symbol symbol-35px me-4">
            <span
              className={clsx(
                "symbol-label",
                `bg-light-${alert.state}`
              )}
            >
              {" "}
              <KTIcon
                iconName={alert.icon}
                className={`fs-2 text-${alert.state}`}
              />
            </span>
          </div>

          <div className="mb-0 me-2">
            <a
              href="#"
              className="fs-6 text-gray-800 text-hover-primary fw-bolder"
            >
              {alert.title}
            </a>
            <div className="text-gray-500 fs-7">
              {alert.description}
            </div>
          </div>
        </div>

        <span className="badge badge-light fs-8">{alert.time}</span>
      </div>
    ))} */}
        </div>
        <div className="d-flex justify-content-between">
          {creationMode === true ? (
            <div></div>
          ) : (
            <button
              type="button"
              className="btn btn-dark mt-20"
              onClick={() => {
                setIsOpenModalWriteOff(true);
              }}
              disabled={isLoadingMainInfo}
            >
              {"Write off"}
              {/* {!isLoadingMainInfo && "Save Changes"}
        {isLoadingMainInfo && (
          <span className="indicator-progress" style={{ display: "block" }}>
            Please wait...{" "}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )} */}
            </button>
          )}
          <div className="d-flex align-items-center gap-5">
            {creationMode === true ? (
              <div></div>
            ) : (
              // isRoleAdmin &&
              <button
                type="button"
                className="btn btn-danger mt-20"
                disabled={isLoadingMainInfo}
                onClick={() => {
                  setIsOpenModalDelete(true);
                }}
              >
                {"Delete"}
                {/* {!isLoadingMainInfo && "Save Changes"}
        {isLoadingMainInfo && (
          <span className="indicator-progress" style={{ display: "block" }}>
            Please wait...{" "}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )} */}
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary mt-20"
              disabled={isLoadingMainInfo}
            >
              {"Save Changes"}
              {/* {!isLoadingMainInfo && "Save Changes"}
        {isLoadingMainInfo && (
          <span className="indicator-progress" style={{ display: "block" }}>
            Please wait...{" "}
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )} */}
            </button>
          </div>
        </div>

        <Toaster
          id={"notAllFieldsCorrect"}
          msg="Please fill correct in all gap"
          title="Warning!" status={"error"}       
         />
      </form>
      {isOpenModalWriteOff && (
        <SharedModal
          id="modal-write-off"
          close={() => {
            setIsOpenModalWriteOff(false);
          }}
          size="small"
          content={<WriteOffModal currentMaterial={currentMaterial} />}
          headerContent={
            <h3 className="card-label fw-bolder">{`Do you want to write off the product?`}</h3>
          }
        />
      )}
      {isOpenModalSuccessSaved && (
        <SharedModal
          id="success-saved-modal"
          close={() => {
            setIsOpenModalSuccessSaved(false);
          }}
          size="small"
          content={<SuccessSavedContentModal />}
          headerContent={<h3 className="card-label fw-bolder">{""}</h3>}
        />
      )}
      {isOpenModalDelete && (
        <SharedModal
          id="success-saved-modal"
          close={() => {
            setIsOpenModalDelete(false);
          }}
          size="small"
          content={<DeleteModal />}
        />
      )}
      {isOpenModalCreateRule && (
        <SharedModal
          id="modal-create-rule"
          close={() => {
            setIsOpenModalCreateRule(false);
          }}
          size="small"
          content={
            <CreateRuleModal
              rules={changeableRulesForTable}
              updateRulesForTable={updateRulesForTable}
            />
          }
          headerContent={<h3 className="card-label fw-bolder">{`Creation`}</h3>}
        />
      )}
      {isOpenModalCreateCommissionRule && (
        <SharedModal
          id="modal-create-rule"
          close={() => {
            setIsOpenModalCreateCommissionRule(false);
          }}
          size="small"
          content={
            <CreateCommissionRuleModal
              // ={changeableRulesForTable}
              updateRulesForTable={updateRulesCommissionForTable}
              rule={changeableRulesCommissionForTable}
            />
          }
          headerContent={
            <h3 className="card-label fw-bolder">{`Add an exclusive commission for the product`}</h3>
          }
        />
      )}
    </>
  );
};
