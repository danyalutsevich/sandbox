import clsx from "clsx";
import React from "react";

interface IToasterProps {
  msg: string;
  title: string;
  status: "error" | "success" | "warning" | "info";
  id: string;
}

export const Toaster: React.FC<IToasterProps> = ({
  msg,
  title,
  status,
  id,
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "success":
        return "bg-light-success text-success";
      case "error":
        return "bg-light-danger text-danger";
      case "warning":
        return "bg-light-warning text-warning";
      case "info":
        return "bg-light-info text-info";
      default:
        return "";
    }
  };
  const getStatusBorder = (status: string) => {
    switch (status) {
      case "success":
        return "border-success";
      case "error":
        return "border-danger";
      case "warning":
        return "border-warning";
      case "info":
        return "border-info";
      default:
        return "";
    }
  };

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1201 }}>
      <div
        id={id}
        className={clsx(`toast hide ${getStatusClass(status)}`)}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className={clsx(`toast-header ${getStatusBorder(status)} ${getStatusClass(status)}`)}>
          {/* <img src="..." className="rounded me-2" alt="..." /> */}
          <strong className="me-auto">{title}</strong>
          {/* <small>11 mins ago</small> */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{msg}</div>
      </div>
    </div>
  );
};
