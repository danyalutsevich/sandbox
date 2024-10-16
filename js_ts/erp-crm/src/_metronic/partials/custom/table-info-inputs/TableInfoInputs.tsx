/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { SharedChangeableInput } from "./SharedChangeableInput";
import { KTIcon } from "../../../helpers";
// import { FieldInputProps } from "formik/dist/types";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";
import * as bootstrap from "bootstrap";
import { Toaster } from "../toast/Toaster";

export interface ISelectValue {
  id: number;
  label: string;
  value: string;
}

export interface ITableInfoInputsConfig {
  label: string;
  value: string;
  customValueJsx?: JSX.Element;
  inputKey: string;
  isNotChangeable?: boolean;
  firstRead?: boolean;
  inputType?: "text" | "number" | "select" | "password" | "textarea";
  selectOptions?: ISelectValue[];
  selectValue?: string;
  disabled?: boolean;
  // inputProps?: FieldInputProps<string | number | readonly string[] | undefined>;
  // formicTouched?: boolean;
  // errorMsg?: string;
}

export interface ITableModeConfig {
  tablePropertyLabel: string;
  tableValueLabel: string;
}

export interface IExtendableModeConfig {
  addLabelText: string;
  setInputValues: React.Dispatch<
    React.SetStateAction<ITableInfoInputsConfig[]>
  >;
}

interface ITableInfoInputsProps {
  inputValues: ITableInfoInputsConfig[];
  formik: FormikProps<any>;
  // formik: any;
  tableModeConfig?: ITableModeConfig;
  extendableModeConfig?: IExtendableModeConfig;
  isSubmitPressed: boolean;
  creationMode?: boolean;
  setInputValues?: React.Dispatch<
    React.SetStateAction<ITableInfoInputsConfig[]>
  >;
  safeUpdate?: (key: string, value: string) => void;
}

interface IAddNewValues {
  label: string;
  value: string;
}

const addNewValuesSchema = Yup.object().shape({
  label: Yup.string().min(1).required("Label is required"),
  value: Yup.string().min(1).required("Value is required"),
});

const initialValues: IAddNewValues = {
  label: "",
  value: "",
};

const TableInfoInputs: React.FC<ITableInfoInputsProps> = ({
  inputValues,
  formik,
  isSubmitPressed,
  tableModeConfig,
  extendableModeConfig,
  creationMode,
  setInputValues,
  safeUpdate,
}) => {
  const [addValuesCondition, setAddValuesCondition] = useState(false);
  const formikForNewValues = useFormik<IAddNewValues>({
    initialValues,
    validationSchema: addNewValuesSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setTimeout(() => {
        console.log("Form sent", values);
      }, 1000);
    },
    validateOnChange: true,
    validateOnMount: true,
  });

  const handleUpdateValues = () => {
    if (extendableModeConfig !== undefined) {
      // formikForNewValues.submitForm();
      // console.log(formikForNewValues.isValid, formikForNewValues.isValidating);
      if (formikForNewValues.isValid) {
        extendableModeConfig.setInputValues([
          ...inputValues,
          {
            label: formikForNewValues.values.label,
            value: formikForNewValues.values.value,
            inputKey: encodeURI(formikForNewValues.values.label),
            firstRead: true,
          },
        ]);
        const newToastSuccess = new bootstrap.Toast("#successToastCreateRule");
        newToastSuccess.show();
        formikForNewValues.resetForm();
        setAddValuesCondition(false);
        // setTimeout(() => {
        //   newToastSuccess.hide();
        // }, 2000);
      } else {
        const newToastError = new bootstrap.Toast("#errorEmptyToastCreateRule");
        newToastError.show();
      }
    }
  };
  // useEffect(() => {
  //   console.log(inputValues, formik.getFieldProps("name"));
  // }, [inputValues]);
  // console.log(inputValues);
  return (
    <div className="d-flex flex-column content-justify-center flex-row-fluid">
      {tableModeConfig !== undefined && (
        <div className="row ">
          <label
            className={"border col-3 col-form-label fw-bold fs-6 bg-light"}
          >
            {tableModeConfig.tablePropertyLabel}
          </label>

          <div className={"col-8 col-form-label border fw-bold fs-6 bg-light"}>
            {tableModeConfig.tableValueLabel}
          </div>
          <div className="col-1"></div>
        </div>
      )}
      {inputValues.map((input) => {
        return (
          <SharedChangeableInput
            input={input}
            formik={formik}
            key={input.inputKey}
            isTableMode={tableModeConfig !== undefined}
            setInputValues={setInputValues}
            inputValues={inputValues}
            isSubmitPressed={isSubmitPressed}
            creationMode={creationMode}
            safeUpdate={safeUpdate}
          />
        );
      })}
      {addValuesCondition && (
        <div className="row ">
          <label
            className={"border col-3 col-form-label fw-bold fs-6 bg-light"}
          >
            <input
              type="text"
              className="form-control form-control-lg form-control-solid"
              placeholder={"Label"}
              {...formikForNewValues.getFieldProps("label")}
            />
          </label>

          <div className={"col-8 col-form-label border fw-bold fs-6 bg-light"}>
            <input
              type="text"
              className="form-control form-control-lg form-control-solid"
              placeholder={"Value"}
              {...formikForNewValues.getFieldProps("value")}
            />
          </div>
          <div className="col-1"></div>
        </div>
      )}
      {extendableModeConfig !== undefined && (
        <div className="mt-2 w-100 d-flex">
          <button
            type="button"
            onClick={() => {
              addValuesCondition
                ? handleUpdateValues()
                : setAddValuesCondition(true);
            }}
            className="btn d-flex gap-5 btn-lg btn-color-primary btn-active-light-primary"
          >
            <KTIcon iconName="add-item" className="fs-2" />
            {addValuesCondition ? "Save" : extendableModeConfig.addLabelText}
          </button>
        </div>
      )}
      <Toaster
        id={"successToastCreateRule"}
        msg="You have been successfully created a new rule"
        title="New rule created"
        status="success"
      />
      <Toaster
        id={"errorEmptyToastCreateRule"}
        msg="Please fill in all gap"
        title="Warning!"
        status="error"
      />
    </div>
  );
};

export { TableInfoInputs };
