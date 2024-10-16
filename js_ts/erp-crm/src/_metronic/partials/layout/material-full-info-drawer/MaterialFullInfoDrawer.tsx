import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { KTIcon } from "../../../helpers";
import {
  IMaterialGroup,
  IMaterialList,
  IMaterialListProperties,
} from "../../../../app/modules/materialsList/MaterialsListModels";
import { mockMaterialsList } from "../../../../app/modules/materialsList/mockData";
import { WrapperDetailMaterialInfoMenu } from "../../../../app/modules/materialsList/components/drawer-components";
import { SharedModal } from "../../custom/modal/SharedModal";
import { GeneralInfoDetailMaterialMenu } from "../../../../app/modules/materialsList/components/drawer-components/GeneralInfoDetailMaterialMenu";

interface IMaterialFullInfoDrawerProps {
  isOpen: boolean;
  creationMode?: boolean;
  materialList: IMaterialList;
  setChangeableCurrentMaterialsList: React.Dispatch<
    React.SetStateAction<IMaterialList>
  >;
  close: () => void;
}

const MaterialFullInfoDrawer: FC<IMaterialFullInfoDrawerProps> = ({
  isOpen,
  creationMode,
  materialList,
  close,
  setChangeableCurrentMaterialsList,
}) => {
  const searchParams = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseAndClearLocation = () => {
    close();
    navigate(location.pathname);
  };

  const [currentMockMaterial, setCurrentMockMaterial] =
    useState<IMaterialListProperties>();
  const [currentMockMaterialGroup, setCurrentMockMaterialGroup] =
    useState<IMaterialGroup>();
  const [currentMockMaterialList, setCurrentMockMaterialList] =
    useState<IMaterialList>();

  useEffect(() => {
    const materialId = searchParams[0].get("materialId");
    const groupCode = searchParams[0].get("groupCode");
    const vendorCode = searchParams[0].get("vendorCode");
    // ===== MOCK GET MATERIAL BY VENDOR_CODE =======
    if (vendorCode !== null && groupCode !== null && materialId !== null) {
      const currentMaterialsList = mockMaterialsList.find(
        (list) => list.id === parseInt(materialId)
      );
      const currentGroup = currentMaterialsList?.groups.find(
        (group) => group.groupCode === groupCode
      );
      const currentMaterial = currentGroup?.items.find(
        (item) => item.vendorCode === vendorCode
      );
      if (currentMaterialsList && currentGroup && currentMaterial) {
        setCurrentMockMaterial(currentMaterial);
        setCurrentMockMaterialGroup(currentGroup);
        setCurrentMockMaterialList(currentMaterialsList);
      }
    }
    if (creationMode === true && materialId !== null) {
      const currentMaterialsList = mockMaterialsList.find(
        (list) => list.id === parseInt(materialId)
      );
      setCurrentMockMaterialList(currentMaterialsList);
    }
  }, [location]);

  const FullInfo: FC = () => {
    return (
      <div className="bg-body">
        <div className="card shadow-none rounded-0 w-100">
          <div
            className="p-6 position-relative h-100%"
            id="kt_custom_material_full_info_body"
          >
            <div
              id="kt_custom_material_full_info_scroll"
              className="position-relative scroll-y me-n5 pe-5"
              data-kt-scroll="true"
              data-kt-scroll-height="auto"
              data-kt-scroll-wrappers="#kt_custom_material_full_info_body"
              data-kt-scroll-dependencies="#kt_custom_material_full_info_header, #kt_custom_material_full_info_footer"
              data-kt-scroll-offset="5px"
            >
              {creationMode === true ? (
                <div className="w-100% h-100%">
                  <GeneralInfoDetailMaterialMenu
                    creationMode
                    currentMaterial={{
                      currentMockMaterial: undefined,
                      currentMockMaterialGroup: undefined,
                      currentMockMaterialList,
                    }}
                    close={handleCloseAndClearLocation}
                    materialList={materialList}
                    setChangeableCurrentMaterialsList={
                      setChangeableCurrentMaterialsList
                    }
                  />
                </div>
              ) : (
                <div className="w-100% h-100%">
                  {currentMockMaterial !== undefined &&
                    currentMockMaterialGroup !== undefined &&
                    currentMockMaterialList !== undefined}
                  <WrapperDetailMaterialInfoMenu
                    currentMockMaterial={currentMockMaterial}
                    currentMockMaterialGroup={currentMockMaterialGroup}
                    currentMockMaterialList={currentMockMaterialList}
                    close={handleCloseAndClearLocation}
                    materialList={materialList}
                    setChangeableCurrentMaterialsList={
                      setChangeableCurrentMaterialsList
                    }
                  />
                </div>
              )}
            </div>
          </div>
          {/* <div
            className="card-footer py-5 text-center"
            id="kt_custom_material_full_info_footer"
          >
            <Link
              to="/crafted/pages/profile"
              className="btn btn-bg-body text-primary"
            >
              View All Activities
              <KTIcon iconName="arrow-right" className="fs-3 text-primary" />
            </Link>
          </div> */}
        </div>
      </div>
    );
  };
  return (
    <>
      {isOpen && (
        <SharedModal
          close={handleCloseAndClearLocation}
          size="right"
          content={<FullInfo />}
          headerContent={
            creationMode === true ? (
              <h3 className="card-label fw-bolder">{`Create a new product`}</h3>
            ) : (
              <h3 className="card-label fw-bolder">{`${currentMockMaterialList?.name} | ${currentMockMaterialGroup?.groupName} | ${currentMockMaterial?.vendorCode}`}</h3>
            )
          }
        />
      )}
    </>
  );
};

export { MaterialFullInfoDrawer };
