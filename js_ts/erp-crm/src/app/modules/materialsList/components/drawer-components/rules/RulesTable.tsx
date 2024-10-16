import React, { useEffect, useState } from "react";
import { Table, TableColumnsType, TableProps } from "antd";

export interface IRule {
  key: number;
  id: number;
  stockName: string;
  min: number;
  max: number;
}

interface IRulesTableProps {
  rules: IRule[];
  openModal: () => void;
}

export const RulesTable: React.FC<IRulesTableProps> = ({
  rules,
  openModal,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changeableRules, setChangeableRules] = useState<IRule[]>(rules);

  useEffect(() => {
    setChangeableRules(rules);
  }, [rules]);

  const columns: TableColumnsType<IRule> = [
    {
      title: "Stock name",
      dataIndex: "stockName",
      render: (text: string) => <a>{text}</a>,
      sorter: (a, b) => a.id - b.id,
      onFilter: (value, record) =>
        record.stockName.indexOf(value as string) === 0,
    },
    {
      title: "Minimum stock level",
      dataIndex: "min",
      sorter: (a, b) => a.min - b.min,
    },
    {
      title: "Maximum stock level",
      dataIndex: "max",
      sorter: (a, b) => a.max - b.max,
    },
  ];

  // const data: IRule[] = changeableRules.map(rule => ({

  // }));

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IRule[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: IRule) => ({
      // disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.stockName,
    }),
  };

  const onChange: TableProps<IRule>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h2 className="card-label mt-4">Inventory control:</h2>
          <p className="mt-2">
            {
              'When the product stock reaches the specified minimum level, the system will add it to the "Products Below Minimum Level" report in quantities up to the maximum level.'
            }
          </p>
        </div>

        <div className="col-9 d-flex flex-column gap-4">
          <button
            type="button"
            className="btn btn-success w-200px"
            onClick={openModal}
          >
            Create a rule +
          </button>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={changeableRules}
            onChange={onChange}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </div>
      </div>
    </div>
  );
};
