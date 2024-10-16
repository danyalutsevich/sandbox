import clsx from "clsx";

export type AvailableColors =
  | "yellow"
  | "black"
  | "white"
  | "blue"
  | "pink"
  | "green"
  | "purple"
  | "red";

export const getColorUtil = (color: AvailableColors): string => {
  switch (color) {
    case "yellow":
      return "#ffc107";
    case "white":
      return "#ffffff";
    case "blue":
      return "#0dcaf0";
    case "pink":
      return "#d63384";
    case "red":
      return "#dc3545";
    case "green":
      return "#198754";
    case "purple":
      return "#6f42c1";
    case "black":
    default:
      return "#000000";
  }
};

export const colorIconUtil = (
  colors: AvailableColors[],
  align?: boolean
): JSX.Element => {
  return (
    <div
      className={clsx(
        align === true ? "align-items-start pt-2" : "",
        "symbol-group symbol-hover d-flex justify-content-center flex-wrap "
      )}
    >
      {colors.map((color) => (
        <div
          key={color}
          className="w-15px h-15px position-relative rounded-circle"
        >
          <div
            className="symbol w-25px h-25px rounded-circle border border-2 position-absolute"
            style={{
              background: getColorUtil(color),
            }}
          ></div>
        </div>
      ))}
    </div>
    //     <div className="symbol-group symbol-hover min-w-70px pe-2 d-flex justify-content-center flex-wrap">
    //       {colors.map((color) => (
    //         <div
    //           key={color}
    //           className="symbol symbol-circle symbol-25px"
    //           // className="w-10px h-10px position-relative rounded-circle"
    //         >
    //           <div
    //             className="symbol-label fs-8 fw-bold text-inverse-primary border border-2"
    //             style={{
    //               background: getColorUtil(color),
    //             }}
    //           ></div>
    //           {/* <div
    //             className="w-20px h-20px rounded-circle border border-2 position-absolute"
    //             style={{
    //               background: getColorUtil(color),
    //             }}
    //           ></div> */}
    //         </div>
    //       ))}
    //       {/* <div className='symbol symbol-circle symbol-25px'>
    //   <div className='symbol-label fs-8 fw-bold bg-primary text-inverse-primary'>A</div>
    // </div> */}
    //     </div>
  );
};
