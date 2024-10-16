import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
// import clsx from "clsx";
import { useLayout } from "../../core";
import { DrawerComponent } from "../../../assets/ts/components";
import { getTestEvents } from "../../../../app/modules/auth/core/_requests";

const TestApiBtn = () => {
  const { config, classes } = useLayout();
  const location = useLocation();
  useEffect(() => {
    DrawerComponent.hideAll();
    console.log(location, classes);
  }, [location]);

  const appContentContainer = config.app?.content?.container;

  useEffect(() => {
    console.log(appContentContainer, config);
  }, [appContentContainer]);

  // const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const getTestEventsExecute = async () => {
    btnRef.current?.setAttribute("data-kt-indicator", "on");

    // setIsLoading(true);
    const result = await getTestEvents({ join: "foodtruck" });
    console.log(result);
    setTestData(result.data);
    // setIsLoading(false);
    btnRef.current?.setAttribute("data-kt-indicator", "off");
  };

  // useEffect(() => {
  //   getTestEventsExecute();
  // }, []);

  return (
    <div
      className="d-flex gap-2"
      // id="kt_app_content"
      // className={clsx(
      //   "app-content flex-column-fluid",
      //   classes.content.join(" "),
      //   config?.app?.content?.class
      // )}
    >
      {/* {isLoading ? ( */}

      <div
        className="card card-custom"
        // className="w-100 p-5 d-flex justify-content-center align-items-center overflow-scroll"
        style={{
          maxWidth: "500px",
        }}
      >
        <div className="card-body">{JSON.stringify(testData)}</div>
      </div>

      <button
        className="btn btn-info h-max"
        style={{
          height: "50px",
        }}
        onClick={getTestEventsExecute}
        ref={btnRef}
      >
        <span className="indicator-label">Get events test</span>
        <span className="indicator-progress">
          Please wait...
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      </button>
    </div>
  );
};

export { TestApiBtn };
