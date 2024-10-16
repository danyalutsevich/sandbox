import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SharedModal } from "../../../../../../_metronic/partials/custom/modal/SharedModal";
import { IEmployeeCommission } from "../rules/EmployeeCommissionTable";

interface ICreateCommissionRuleModalProps {
  rule: IEmployeeCommission | null;
  updateRulesForTable: (rule: IEmployeeCommission) => void;
  close?: () => void;
}

interface ICreateRuleInputs {
  quantity: number;
  percent: number;
  calculationRule: string;
}

export const CreateCommissionRuleModal: React.FC<
  ICreateCommissionRuleModalProps
> = ({ close, updateRulesForTable }) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const [currentCalculationRule, setCurrentCalculationRule] = useState<
    "percent" | "quantity"
  >();

  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const createRuleSchema = Yup.object().shape({
    calculationRule: Yup.string().required("Please, choose calculation rule"),
    quantity: Yup.number()
      .min(0)
      .max(10000000)
      .required("Quantity is required"),
    percent: Yup.number().min(0).max(100).required("Percent is required"),
  });

  const initialValues: ICreateRuleInputs = {
    percent: 0,
    quantity: 0,
    calculationRule: "",
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
    // formikCreateRule.validateForm(
    //   {
    //           calculationRule: formikCreateRule.values.calculationRule,
    //           quantity: formikCreateRule.values.quantity,
    //           percent: formikCreateRule.values.percent,
    //         }
    // formikCreateRule.values.calculationRule === "percent"
    //   ? {
    //       calculationRule: "percent",
    //       percent: formikCreateRule.values.percent,
    //       quantity: 10,
    //     }
    //   : {
    //       calculationRule: "quantity",
    //       quantity: formikCreateRule.values.quantity,
    //       percent: 10,
    //     }
    // );
    console.log(formikCreateRule.values, currentCalculationRule);
    if (currentCalculationRule === "percent") {
      formikCreateRule.validateForm({
        calculationRule: "percent",
        percent: formikCreateRule.values.percent,
        quantity: 10,
      });
      console.log(formikCreateRule.isValid, formikCreateRule);
      if (formikCreateRule.isValid) {
        setIsOpenSuccessModal(true);
        updateRulesForTable({
          key: 2,
          id: 2,
          calculationRule: "percent",
          percent: formikCreateRule.values.percent,
          quantity: 0,
        });
      }
    } else if (currentCalculationRule === "quantity") {
      formikCreateRule.validateForm({
        calculationRule: "quantity",
        quantity: formikCreateRule.values.quantity,
        percent: 10,
      });
      console.log(formikCreateRule.isValid, formikCreateRule);
      if (formikCreateRule.isValid) {
        setIsOpenSuccessModal(true);
        updateRulesForTable({
          key: 2,
          id: 2,
          calculationRule: "quantity",
          quantity: formikCreateRule.values.quantity,
          percent: 0,
        });
      }
    }
    // formikCreateRule.isValid && setIsOpenSuccessModal(true);
    // updateRulesForTable(
    //   formikCreateRule.values.calculationRule === "percent"
    //     ? {
    //         key: 2,
    //         id: 2,
    //         calculationRule: "percent",
    //         percent: formikCreateRule.values.percent,
    //         quantity: 10,
    //       }
    //     : {
    //         key: 2,
    //         id: 2,
    //         calculationRule: "quantity",
    //         quantity: formikCreateRule.values.quantity,
    //         percent: 10,
    //       }
    // );
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
        <div className="mb-7">
          {/* begin::Label */}
          <label className="text-dark text-center fs-6 mb-5 py-10">
            You can set the commission as a percentage of the product price or
            profit and/or as a fixed amount.
          </label>
          {/* end::Label */}
          {/* begin::Roles */}
          {/* begin::Input row */}
          <div className="d-flex fv-row">
            {/* begin::Radio */}
            <div className="form-check form-check-custom form-check-solid">
              {/* begin::Input */}
              <input
                className="form-check-input me-3"
                {...formikCreateRule.getFieldProps("calculationRule")}
                name="calculationRule"
                type="radio"
                value="percent"
                id="kt_modal_create_rule_option_0"
                checked={currentCalculationRule === "percent"}
                onChange={() => {
                  formikCreateRule.setFieldValue("calculationRule", "percent");
                  setCurrentCalculationRule("percent");
                }}
              />

              {/* end::Input */}
              {/* begin::Label */}
              <label
                className="form-check-label"
                htmlFor="kt_modal_update_role_option_0"
              >
                <div className="fw-bolder text-gray-800">Percent</div>
                {/* <div className="text-gray-600">
                  Best for business owners and company administrators
                </div> */}
              </label>
              {/* end::Label */}
            </div>
            {/* end::Radio */}
          </div>
          {/* end::Input row */}
          {currentCalculationRule === "percent" && (
            <>
              {/* <label
                htmlFor="percent"
                className="form-label fs-6 fw-bolder mb-3"
              >
                Quantity
              </label> */}
              <input
                type="number"
                className="form-control form-control-lg form-control-solid mt-5"
                id="percent"
                placeholder="percent"
                {...formikCreateRule.getFieldProps("percent")}
              />
              {(formikCreateRule.touched.percent &&
                formikCreateRule.errors.percent) ||
                (isSubmitPressed && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formikCreateRule.errors.percent}
                    </div>
                  </div>
                ))}
            </>
          )}
          <div className="separator  my-5"></div>
          {/* begin::Input row */}
          <div className="d-flex fv-row">
            {/* begin::Radio */}
            <div className="form-check form-check-custom form-check-solid">
              {/* begin::Input */}
              <input
                className="form-check-input me-3"
                {...formikCreateRule.getFieldProps("calculationRule")}
                name="quantity"
                type="radio"
                value="quantity"
                id="kt_modal_create_rule_option_1"
                checked={currentCalculationRule === "quantity"}
                onChange={() => {
                  formikCreateRule.setFieldValue("calculationRule", "quantity");
                  setCurrentCalculationRule("quantity");
                }}
              />
              {/* end::Input */}
              {/* begin::Label */}
              <label
                className="form-check-label"
                htmlFor="kt_modal_update_role_option_1"
              >
                <div className="fw-bolder text-gray-800">Quantity</div>
                {/* <div className="text-gray-600">
                  Best for developers or people primarily using the API
                </div> */}
              </label>
              {/* end::Label */}
            </div>
            {/* end::Radio */}
          </div>
          {/* end::Input row */}
          {currentCalculationRule === "quantity" && (
            <>
              {/* <label
                htmlFor="quantity"
                className="form-label fs-6 fw-bolder mb-3"
              >
                Quantity
              </label> */}
              <input
                type="number"
                className="form-control form-control-lg form-control-solid mt-5"
                id="quantity"
                placeholder="Quantity"
                {...formikCreateRule.getFieldProps("quantity")}
              />
              {(formikCreateRule.touched.quantity &&
                formikCreateRule.errors.quantity) ||
                (isSubmitPressed && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formikCreateRule.errors.quantity}
                    </div>
                  </div>
                ))}
            </>
          )}

          {/* end::Input row */}
          {/* end::Roles */}
        </div>
        {/* end::Input group */}

        {/* <div className="fv-row mb-0">
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
      </div>{" "} */}
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
