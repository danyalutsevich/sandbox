import { FC } from "react";
import { IMaterialList } from "./MaterialsListModels";
import { MaterialsTable } from "./components/MaterialsTable";

interface IMaterialsListMenuProps {
  currentMaterialsList: IMaterialList;
}

export const MaterialsListMenu: FC<IMaterialsListMenuProps> = ({
  currentMaterialsList,
}) => {
  // const sortedMaterialsList = {
  //   ...currentMaterialsList,
  //   items: currentMaterialsList.items.sort(
  //     (a, b) => parseInt(a.code) - parseInt(b.code)
  //   ),
  // };
  return (
    <div className="">
      <MaterialsTable currentMaterialsList={currentMaterialsList} />
    </div>
  );
};
