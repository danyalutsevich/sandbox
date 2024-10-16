import React, { FC, useState } from "react";
import { ICurrentMaterialsProps } from "../WrapperDetailMaterialInfoMenu";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ISelectValue } from "../../../../../../_metronic/partials";
import { SharedModal } from "../../../../../../_metronic/partials/custom/modal/SharedModal";

interface IWriteOffModalProps {
  currentMaterial: ICurrentMaterialsProps;
  close?: () => void;
}

interface IWriteOffInputs {
  count: number;
  document: string;
}

export const WriteOffModal: React.FC<IWriteOffModalProps> = ({
  currentMaterial,
  close,
}) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const writeOffSchema = Yup.object().shape({
    count: Yup.number()
      .min(1)
      .max(currentMaterial.currentMockMaterial?.quantity ?? 1)
      .required("Label is required"),
    document: Yup.string().min(1).required("Please, choose the act"),
  });

  const mockOptionsDocument: ISelectValue[] = [
    { id: 1, value: "12", label: "Write-off act #12" },
    { id: 2, value: "11", label: "Creating act #11" },
  ];

  const initialValues: IWriteOffInputs = {
    count: 0,
    document: mockOptionsDocument[0].value,
  };

  const formikWriteOff = useFormik<IWriteOffInputs>({
    initialValues,
    validationSchema: writeOffSchema,
    onSubmit: (values, formikHelpers) => {
      console.log("Form sent", values, formikHelpers);
      // setTimeout(() => {
      // }, 1000);
    },

    validateOnChange: true,
    validateOnMount: true,
  });

  const handleCloseBothModals = () => {
    setIsOpenSuccessModal(false);
    setTimeout(() => {
      close?.();
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitPressed(true);
    formikWriteOff.validateForm({
      count: formikWriteOff.values.count,
      document: formikWriteOff.values.document,
    });
    console.log(isSubmitPressed, formikWriteOff, formikWriteOff.values.count);
    formikWriteOff.isValid && setIsOpenSuccessModal(true);
  };

  const SuccessContentModal: FC = () => (
    <div className="form-label fs-6 fw-bolder mb-3 p-10 text-center">
      The product has been successfully written off
      <button
        type="button"
        className="btn btn-dark w-100 mt-10"
        onClick={handleCloseBothModals}
      >
        OK
      </button>
    </div>
  );

  return (
    <form
      className="pt-4 d-flex flex-column gap-4"
      id="write-off-form"
      onSubmit={handleSubmit}
    >
      <div className="nav-link text-primary text-center">{`Total quantity of goods: ${currentMaterial.currentMockMaterial?.quantity}`}</div>
      <div className="fv-row mb-0">
        <label
          htmlFor="emailaddress"
          className="form-label fs-6 fw-bolder mb-3"
        >
          Quantity
        </label>
        <input
          type="number"
          className="form-control form-control-lg form-control-solid"
          id="quantity"
          placeholder="Quantity"
          {...formikWriteOff.getFieldProps("count")}
        />
        {(formikWriteOff.touched.count && formikWriteOff.errors.count) ||
          (isSubmitPressed && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formikWriteOff.errors.count}</div>
            </div>
          ))}
      </div>{" "}
      <div className="fv-row mb-0">
        <label
          htmlFor="emailaddress"
          className="form-label fs-6 fw-bolder mb-3"
        >
          Document
        </label>
        <select
          className="form-select form-select-solid form-select-lg fw-bold"
          {...formikWriteOff.getFieldProps("document")}
        >
          {mockOptionsDocument.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(formikWriteOff.touched.document && formikWriteOff.errors.document) ||
          (isSubmitPressed && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formikWriteOff.errors.document}
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex gap-4 w-100 mt-10">
        <button type="button" className="btn btn-light w-100" onClick={close}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-dark w-100"
          // onClick={() => {

          // }}
          // onSubmit={formikWriteOff.handleSubmit}
        >
          Write off
        </button>
      </div>
      {isOpenSuccessModal && (
        <SharedModal
          id="success-modal"
          close={handleCloseBothModals}
          size="alert"
          content={<SuccessContentModal />}
          // headerContent={<h3 className="card-label fw-bolder">{""}</h3>}
        />
      )}
    </form>
  );
};
