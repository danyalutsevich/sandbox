import { FC } from "react";
import { IMaterialList } from "../MaterialsListModels";
import { KTIcon } from "../../../../_metronic/helpers";

interface ITableHeaderProps {
  currentMaterialsList: IMaterialList;
  openModalCreationProduct: () => void;
}

const TableHeader: FC<ITableHeaderProps> = ({
  currentMaterialsList,
  openModalCreationProduct,
}) => {
  return (
    <div className="card-header border-0 pt-5">
      <h3 className="card-title align-items-start flex-column">
        <span className="card-label fw-bold fs-3 mb-1">
          {currentMaterialsList.name}
        </span>
        <span className="text-muted mt-1 fw-semibold fs-7">
          Count:{" "}
          {currentMaterialsList.groups.reduce(
            (prev, curr) => (prev += curr.items.length),
            0
          )}
        </span>
      </h3>
      <div className="card-toolbar d-flex gap-2">
        {/* begin::Menu */}
        <button
          type="button"
          className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <KTIcon iconName="category" className="fs-2" />
        </button>
        {/* begin::Menu 2 */}
        <div
          className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px"
          data-kt-menu="true"
        >
          {/* begin::Menu item */}
          <div className="menu-item px-3">
            <div className="menu-content fs-6 text-gray-900 fw-bold px-3 py-4">
              Quick Actions
            </div>
          </div>
          {/* end::Menu item */}
          {/* begin::Menu separator */}
          <div className="separator mb-3 opacity-75"></div>
          {/* end::Menu separator */}
          {/* begin::Menu item */}
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-3">
              New Ticket
            </a>
          </div>
          {/* end::Menu item */}
          {/* begin::Menu item */}
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-3">
              New Customer
            </a>
          </div>
          {/* end::Menu item */}
          {/* begin::Menu item */}
          <div
            className="menu-item px-3"
            data-kt-menu-trigger="hover"
            data-kt-menu-placement="right-start"
            data-kt-menu-flip="left-start, top"
          >
            {/* begin::Menu item */}
            <a href="#" className="menu-link px-3">
              <span className="menu-title">New Group</span>
              <span className="menu-arrow"></span>
            </a>
            {/* end::Menu item */}
            {/* begin::Menu sub */}
            <div className="menu-sub menu-sub-dropdown w-175px py-4">
              {/* begin::Menu item */}
              <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                  Admin Group
                </a>
              </div>
              {/* end::Menu item */}
              {/* begin::Menu item */}
              <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                  Staff Group
                </a>
              </div>
              {/* end::Menu item */}
              {/* begin::Menu item */}
              <div className="menu-item px-3">
                <a href="#" className="menu-link px-3">
                  Member Group
                </a>
              </div>
              {/* end::Menu item */}
            </div>
            {/* end::Menu sub */}
          </div>
          {/* end::Menu item */}
          {/* begin::Menu item */}
          <div className="menu-item px-3">
            <a href="#" className="menu-link px-3">
              New Contact
            </a>
          </div>
          {/* end::Menu item */}
          {/* begin::Menu separator */}
          <div className="separator mt-3 opacity-75"></div>
          {/* end::Menu separator */}
          {/* begin::Menu item */}
          <div className="menu-item px-3">
            <div className="menu-content px-3 py-3">
              <a className="btn btn-primary btn-sm px-4" href="#">
                Generate Reports
              </a>
            </div>
          </div>
          {/* end::Menu item */}
        </div>
        {/* end::Menu 2 */}
        {/* end::Menu */}
        <button className="btn btn-primary" onClick={openModalCreationProduct}>
          Add new product
        </button>
      </div>
    </div>
  );
};

export { TableHeader };
