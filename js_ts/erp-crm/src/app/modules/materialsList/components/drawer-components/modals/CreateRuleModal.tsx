import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ISelectValue } from "../../../../../../_metronic/partials";
import { SharedModal } from "../../../../../../_metronic/partials/custom/modal/SharedModal";
import { IRule } from "../rules/RulesTable";

interface ICreateRuleModalProps {
  rules: IRule[];
  updateRulesForTable: (rule: IRule) => void;
  close?: () => void;
}

interface ICreateRuleInputs {
  min: number;
  max: number;
  stock: string;
}

export const CreateRuleModal: React.FC<ICreateRuleModalProps> = ({
  close,
  rules,
  updateRulesForTable,
}) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const createRuleSchema = Yup.object().shape({
    min: Yup.number().min(1).max(10000000).required("Max value is required"),
    max: Yup.number().min(1).max(10000000).required("Max value is required"),
    stock: Yup.string().min(1).required("Please, choose the stock"),
  });

  const mockOptionsRules: ISelectValue[] = [
    { id: 1, value: "12", label: "Kyiv #1" },
    { id: 2, value: "11", label: "Stockholm #1" },
    { id: 3, value: "13", label: "London #1" },
    { id: 4, value: "14", label: "London #2" },
  ];

  const initialValues: ICreateRuleInputs = {
    min: 1,
    max: 1,
    stock: mockOptionsRules[0].value,
  };

  const formikCreateRule = useFormik<ICreateRuleInputs>({
    initialValues,
    validationSchema: createRuleSchema,
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
    formikCreateRule.validateForm({
      min: formikCreateRule.values.min,
      max: formikCreateRule.values.max,
      stock: formikCreateRule.values.stock,
    });
    formikCreateRule.isValid && setIsOpenSuccessModal(true);
    updateRulesForTable({
      id: rules.length + 2,
      key: rules.length + 2,
      stockName:
        mockOptionsRules.find((o) => o.value === formikCreateRule.values.stock)
          ?.label ?? "",
      min: formikCreateRule.values.min,
      max: formikCreateRule.values.max,
    });
  };

  const SuccessContentModal: FC = () => (
    <div className="form-label fs-6 fw-bolder mb-3 p-10 text-center">
      The rule has been successfully created
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
      <div className="fv-row mb-0">
        <div className="fv-row mb-0">
          <label htmlFor="stock" className="form-label fs-6 fw-bolder mb-3">
            Stocks
          </label>
          <select
            className="form-select form-select-solid form-select-lg fw-bold"
            {...formikCreateRule.getFieldProps("stock")}
          >
            {mockOptionsRules.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {(formikCreateRule.touched.stock && formikCreateRule.errors.stock) ||
            (isSubmitPressed && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formikCreateRule.errors.stock}
                </div>
              </div>
            ))}
        </div>
        <label htmlFor="min" className="form-label fs-6 fw-bolder mb-3">
          Minimum stock level
        </label>
        <input
          type="number"
          className="form-control form-control-lg form-control-solid"
          id="min"
          placeholder="Minimum stock level"
          {...formikCreateRule.getFieldProps("min")}
        />
        {(formikCreateRule.touched.min && formikCreateRule.errors.min) ||
          (isSubmitPressed && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formikCreateRule.errors.min}</div>
            </div>
          ))}
      </div>{" "}
      <div className="fv-row mb-0">
        <label htmlFor="max" className="form-label fs-6 fw-bolder mb-3">
          Maximum stock level
        </label>
        <input
          type="number"
          className="form-control form-control-lg form-control-solid"
          id="max"
          placeholder="Maximum stock level"
          {...formikCreateRule.getFieldProps("max")}
        />
        {(formikCreateRule.touched.max && formikCreateRule.errors.max) ||
          (isSubmitPressed && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formikCreateRule.errors.max}</div>
            </div>
          ))}
      </div>{" "}
      <div className="d-flex gap-4 w-100 mt-10">
        <button type="button" className="btn btn-light w-100" onClick={close}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-dark w-100"
          // onClick={() => {

          // }}
          // onSubmit={formikCreateRule.handleSubmit}
        >
          Create
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
