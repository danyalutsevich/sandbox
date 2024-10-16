import React from "react";
import {
  AvailableColors,
  colorIconUtil,
} from "../../../../../_metronic/helpers/custom/colorIcon.util";

interface IColorValueProps {
  color?: AvailableColors;
}

export const ColorValue: React.FC<IColorValueProps> = ({ color }) => {
  return (
    <div className="w-100 d-flex">
      {color !== undefined && (
        <>
          <span className="form-control form-control-flush w-auto">
            {color ?? ""}
          </span>
          {colorIconUtil([color], true)}
        </>
      )}
    </div>
  );
};
