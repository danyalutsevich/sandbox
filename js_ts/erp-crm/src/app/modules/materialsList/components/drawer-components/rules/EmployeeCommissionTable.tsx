import React, { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import clsx from "clsx";

export interface IEmployeeCommission {
  key: number;
  id: number;
  calculationRule: "percent" | "quantity";
  percent: number;
  quantity: number;
}

interface IEmployeeCommissionTableProps {
  commissionRule: IEmployeeCommission | null;
  openModal: () => void;
  updateRulesForTable: (rule: null) => void;
}

export const EmployeeCommissionTable: React.FC<
  IEmployeeCommissionTableProps
> = ({ commissionRule, openModal, updateRulesForTable }) => {
  const [changeableRules, setChangeableRules] =
    useState<IEmployeeCommission | null>(commissionRule);

  useEffect(() => {
    setChangeableRules(commissionRule);
  }, [commissionRule]);

  const columns: TableColumnsType<IEmployeeCommission> = [
    {
      title: "Calculation rule",
      dataIndex: "calculationRule",
    },
    {
      title: "Commission",
      dataIndex:
        commissionRule !== null && commissionRule.calculationRule === "percent"
          ? "percent"
          : "quantity",
    },
  ];

  // const data: IRule[] = changeableRules.map(rule => ({

  // }));

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h2 className="card-label mt-4">Emplyee commission:</h2>
          <p className="mt-2">
            {
              "If employees receive a commission for selling products or technical specialists receive a commission for adding products to work tasks according to basic calculation rules, you can set an exclusive reward for this product."
            }
          </p>
        </div>

        <div className="col-9 d-flex flex-column gap-4">
          <button
            type="button"
            className={clsx(
              commissionRule !== null ? "btn-danger" : "btn-success",
              "btn  w-200px"
            )}
            onClick={() => {
              commissionRule !== null ? updateRulesForTable(null) : openModal();
            }}
          >
            {commissionRule !== null ? "Remove the rule" : `Create a rule +`}
          </button>
          <Table
            pagination={false}
            columns={columns}
            dataSource={changeableRules !== null ? [changeableRules] : []}
          />
        </div>
      </div>
    </div>
  );
};
