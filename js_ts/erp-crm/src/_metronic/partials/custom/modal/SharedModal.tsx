import React, { type ReactElement, useEffect, useState } from "react";
import clsx from "clsx";
import { KTIcon } from "../../../helpers";

interface ISharedModalProps {
  // content: ReactElement;
  id?: string;
  content: ReactElement<{ close?: () => void }>;
  headerContent?: JSX.Element;
  size?: "right" | "alert" | "big" | "small";
  close: () => void;
}

export const SharedModal: React.FC<ISharedModalProps> = ({
  id,
  content,
  headerContent,
  size,
  close,
}) => {
  const modalHeaderSize = (): string => {
    switch (size) {
      case "small":
        return "w-100 mw-400px w-sm-400px mh-75";
      case "alert":
        return "w-100 mw-500px mh-75";
      case "big":
        return "w-90% mw-800px mh-75";
      case "right":
      default:
        return " w-lg-1000px";
    }
  };

  const modalWrapperSize = (): string => {
    switch (size) {
      case "big":
      case "alert":
      case "small":
        return "justify-content-center align-items-center";
      case "right":
      default:
        return "justify-content-end";
    }
  };

  const modalSize = (): string => {
    switch (size) {
      // return "";
      // return "";
      case "small":
        return "w-100 w-sm-400px mh-75";
      case "alert":
        return "w-100 w-sm-500px mw-500px mh-75";
      case "big":
        return "w-90% mw-800px mh-75";
      case "right":
      default:
        return "w-100 w-lg-1000px h-100 max-vh-90";
    }
  };

  const [disappearClassName, setDisappearClassName] =
    useState("animate-slide-in");
  const [disappearClassNameBg, setDisappearClassNameBg] =
    useState("animate-appear");

  const handleCloseModalPopup = (): void => {
    setDisappearClassNameBg("animate-disappear");
    setDisappearClassName("animate-slide-out");
    setTimeout(() => {
      close();
    }, 280);
  };

  useEffect(() => {
    if (document !== undefined) document.body.style.overflow = "hidden";
    return () => {
      if (document !== undefined) document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={() => {
        handleCloseModalPopup();
      }}
      id={id ?? ""}
      className={clsx(
        disappearClassNameBg,
        modalWrapperSize(),
        "modal-z-index position-fixed top-0 start-0 w-100 h-100 d-flex overflow-hidden custom-z-index custom-gap custom-cursor-auto"
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={clsx(
          disappearClassName,
          modalSize(),
          "modal-z-index position-absolute rounded-3 bg-body overflow-auto shadow-lg"
        )}
      >
        <div
          className={clsx(
            modalHeaderSize(),
            "position-fixed modal-z-index-high bg-body d-block d-lg-flex justify-content-between py-3 px-2"
          )}
        >
          <span className="w-100 d-flex align-items-center justify-content-between">
            <span className="p-5">{headerContent}</span>
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary"
              onClick={() => {
                handleCloseModalPopup();
              }}
            >
              <KTIcon iconName="cross" className="fs-1" />
            </button>
          </span>
        </div>
        <div className="p-5 pt-20 custom-bg">
          {/* {content} */}
          {{
            ...content,
            props: { ...content.props, close: handleCloseModalPopup },
          }}
        </div>
      </div>
    </div>
  );
};
