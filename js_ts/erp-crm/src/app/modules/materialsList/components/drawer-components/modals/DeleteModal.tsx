import React, { FC, useState } from "react";
import { SharedModal } from "../../../../../../_metronic/partials/custom/modal/SharedModal";
import { useLocation, useNavigate } from "react-router-dom";

interface IDeleteModalProps {
  close?: () => void;
  // highClose: () => void;
}

export const DeleteModal: React.FC<IDeleteModalProps> = ({
  close,
  // highClose,
}) => {
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleCloseBothModals = () => {
    setIsOpenSuccessModal(false);
    setTimeout(() => {
      close?.();
      navigate(location.pathname);
      window.location.reload();
    }, 100);
  };

  const handleDelete = (): void => {
    setIsOpenSuccessModal(true);
  };

  const SuccessContentModal: FC = () => (
    <div className="form-label fs-6 fw-bolder mb-3 p-10 text-center">
      The product has been successfully deleted
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
    <div className="pt-4 d-flex flex-column gap-4" id="write-off-form">
      <h3 className="card-label fw-bolder">
        {"Are you sure you want to delete this product?"}
      </h3>
      <div className="d-flex gap-4 w-100 mt-10">
        <button type="button" className="btn btn-light w-100" onClick={close}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-danger w-100"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {isOpenSuccessModal && (
        <SharedModal
          id="success-delete-modal"
          close={handleCloseBothModals}
          size="alert"
          content={<SuccessContentModal />}
        />
      )}
    </div>
  );
};
