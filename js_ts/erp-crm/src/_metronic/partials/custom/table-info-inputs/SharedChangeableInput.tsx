/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ISelectValue, ITableInfoInputsConfig } from "./TableInfoInputs";
import clsx from "clsx";
import { KTIcon } from "../../../helpers";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FormikProps } from "formik";
import Select, { SingleValue } from "react-select";

interface ISharedChangeableInputProps {
  // formik: any;
  formik: FormikProps<any>;
  input: ITableInfoInputsConfig;
  isTableMode?: boolean;
  inputValues: ITableInfoInputsConfig[];
  isSubmitPressed: boolean;
  creationMode?: boolean;
  setInputValues?: React.Dispatch<
    React.SetStateAction<ITableInfoInputsConfig[]>
  >;
  safeUpdate?: (key: string, value: string) => void;
}

export const SharedChangeableInput: React.FC<ISharedChangeableInputProps> = ({
  formik,
  input,
  isTableMode,
  inputValues,
  isSubmitPressed,
  creationMode,
  setInputValues,
  safeUpdate,
}) => {
  const [isChangeMode, setIsChangeMode] = useState(true);
  const [currentSelectValue, setCurrentSelectValue] =
    useState<SingleValue<ISelectValue>>();
  const inputType = (): string => {
    if (input.inputType !== undefined) {
      switch (input.inputType) {
        case "number":
          return "number";
        case "password":
          return "password";
        default:
          return "text";
      }
    } else {
      return "text";
    }
  };
  useEffect(() => {
    if (creationMode === true && currentSelectValue !== undefined) {
      console.log(currentSelectValue?.value);
      safeUpdate?.(input.inputKey, currentSelectValue?.value ?? "");
      // setInputValues?.(
      //   inputValues.map((inputValue) => {
      //     if (inputValue.inputKey === input.inputKey) {
      //       return {
      //         ...input,
      //         value:
      //           input.inputType !== "select"
      //             ? formik.getFieldProps(input.inputKey).value
      //             : currentSelectValue?.value,
      //         selectValue: currentSelectValue?.value ?? undefined,
      //         customValueJsx: input.customValueJsx,
      //         // customValueJsx: currentSelectValue?.value !== undefined ? {...input.customValueJsx, props: currentSelectValue.value } : undefined
      //       };
      //     } else {
      //       return inputValue;
      //     }
      //   })
      // );
    }
  }, [currentSelectValue]);
  useEffect(() => {
    console.log(input.inputKey, input);
  }, [input]);
  useEffect(() => {
    if (input.firstRead === true) {
      setIsChangeMode(false);
    }
  }, [input.firstRead]);
  return (
    <>
      <div key={input.inputKey} className="row">
        <label
          className={clsx(
            isChangeMode && "required",
            isTableMode && "border",
            "col-3 col-form-label fw-bold fs-6 p-2 d-flex align-items-center"
          )}
        >
          {input.label}
        </label>

        <div className={clsx(isTableMode && "border ", "p-2 col-8 fv-row")}>
          {input.isNotChangeable === true || !isChangeMode ? (
            <>
              {input.customValueJsx !== undefined ? (
                input.customValueJsx
              ) : (
                <div className="form-control form-control-lg form-control-flush d-flex align-items-center">
                  {input.value}
                </div>
              )}
            </>
          ) : (
            <>
              {input.inputType !== undefined &&
              input.inputType === "select" &&
              input.selectOptions !== undefined ? (
                <Select
                  className="react-select-styled react-select-solid"
                  classNamePrefix="react-select"
                  options={input.selectOptions}
                  placeholder={input.label}
                  onChange={(newValue: SingleValue<ISelectValue>) => {
                    setCurrentSelectValue(newValue);
                  }}
                  isDisabled={input.disabled}
                  // inputValue={input.selectValue}
                  // value={input.selectValue}
                  // value={input.selectOptions.find(
                  //   (s) => s.value === input.selectValue
                  // )}
                />
              ) : (
                <>
                  <input
                    type={inputType()}
                    className="form-control form-control-lg form-control-solid"
                    placeholder={input.label}
                    {...formik.getFieldProps(input.inputKey)}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    disabled={input.disabled}
                    // value={input.value}
                    // {...input.inputProps}
                  />
                  {(formik.touched[input.inputKey] &&
                    formik.errors[input.inputKey]) ||
                    (isSubmitPressed && (
                      // {input.formicTouched && input.errorMsg && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {`${formik.errors[input.inputKey] ?? ""}`}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
        </div>

        {!input.isNotChangeable && (
          <div className="col-1 d-flex justify-content-center">
            {isChangeMode ? (
              creationMode === true ? (
                <></>
              ) : (
                <div>
                  <OverlayTrigger
                    key={`${input.inputKey}-${input.label}-confirm`}
                    placement="top"
                    overlay={<Tooltip id="tooltip-user-name">Confirm</Tooltip>}
                  >
                    <span
                      onClick={() => {
                        // const current = inputValues.find(
                        //   (i) => i.inputKey === input.inputKey
                        // );
                        setInputValues?.(
                          inputValues.map((inputValue) => {
                            if (inputValue.inputKey === input.inputKey) {
                              return {
                                ...input,
                                value:
                                  input.inputType !== "select"
                                    ? formik.getFieldProps(input.inputKey).value
                                    : currentSelectValue?.value,
                                selectValue:
                                  currentSelectValue?.value ?? undefined,
                                customValueJsx: input.customValueJsx,
                                // customValueJsx: currentSelectValue?.value !== undefined ? {...input.customValueJsx, props: currentSelectValue.value } : undefined
                              };
                            } else {
                              return inputValue;
                            }
                          })
                        );
                        //   [
                        //   ...inputValues,
                        //   inputValues[input.inputKey]
                        //   // inputValues[input.inputKey] = {
                        //   //   ...current,
                        //   //   value: formik.getFieldProps(input.inputKey),
                        //   // }.value,}
                        // ]);
                        setIsChangeMode(false);
                      }}
                      className="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2"
                    >
                      <KTIcon iconName="check-circle" className="fs-3 mb-3" />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key={`${input.inputKey}-${input.label}-cancel`}
                    placement="top"
                    overlay={<Tooltip id="tooltip-user-name">Cancel</Tooltip>}
                  >
                    <span
                      onClick={() => {
                        setIsChangeMode(false);
                      }}
                      className="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2"
                    >
                      <KTIcon iconName="cross-circle" className="fs-3 mb-3" />
                    </span>
                  </OverlayTrigger>
                </div>
              )
            ) : (
              <OverlayTrigger
                key={`${input.inputKey}-${input.label}`}
                placement="top"
                overlay={<Tooltip id="tooltip-user-name">Change value</Tooltip>}
              >
                <span
                  onClick={() => {
                    !input.isNotChangeable && setIsChangeMode(!isChangeMode);
                  }}
                  className="btn btn-icon btn-sm btn-active-color-primary pe-0 me-2 align-self-center"
                >
                  <KTIcon iconName="pencil" className="fs-3 mb-3" />
                </span>
              </OverlayTrigger>
            )}
          </div>
        )}
      </div>
    </>
  );
};
