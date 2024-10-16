// import { FC, useEffect, useState } from "react";
// import { Link, useLocation, useSearchParams } from "react-router-dom";
// import { KTIcon } from "../../../helpers";
// // import { Item1 } from "../../content/activity/Item1";
// // import { Item2 } from "../../content/activity/Item2";
// // import { Item3 } from "../../content/activity/Item3";
// // import { Item4 } from "../../content/activity/Item4";
// // import { Item5 } from "../../content/activity/Item5";
// // import { Item6 } from "../../content/activity/Item6";
// // import { Item7 } from "../../content/activity/Item7";
// // import { Item8 } from "../../content/activity/Item8";
// import {
//   IMaterialGroup,
//   IMaterialList,
//   IMaterialListProperties,
// } from "../../../../app/modules/materialsList/MaterialsListModels";
// import { mockMaterialsList } from "../../../../app/modules/materialsList/mockData";
// import { WrapperDetailMaterialInfoMenu } from "../../../../app/modules/materialsList/components/drawer-components";

// const MaterialFullInfoDrawer: FC = () => {
//   // const params = useParams();
//   const searchParams = useSearchParams();
//   const location = useLocation();

//   const [currentMockMaterial, setCurrentMockMaterial] =
//     useState<IMaterialListProperties>();
//   const [currentMockMaterialGroup, setCurrentMockMaterialGroup] =
//     useState<IMaterialGroup>();
//   const [currentMockMaterialList, setCurrentMockMaterialList] =
//     useState<IMaterialList>();

//   useEffect(() => {
//     const materialId = searchParams[0].get("materialId");
//     const groupCode = searchParams[0].get("groupCode");
//     const vendorCode = searchParams[0].get("vendorCode");
//     // ===== MOCK GET MATERIAL BY VENDOR_CODE =======
//     if (vendorCode !== null && groupCode !== null && materialId !== null) {
//       const currentMaterialsList = mockMaterialsList.find(
//         (list) => list.id === parseInt(materialId)
//       );
//       const currentGroup = currentMaterialsList?.groups.find(
//         (group) => group.groupCode === groupCode
//       );
//       const currentMaterial = currentGroup?.items.find(
//         (item) => item.vendorCode === vendorCode
//       );
//       if (currentMaterialsList && currentGroup && currentMaterial) {
//         setCurrentMockMaterial(currentMaterial);
//         setCurrentMockMaterialGroup(currentGroup);
//         setCurrentMockMaterialList(currentMaterialsList);
//       }
//     }
//   }, [location]);

//   return (
//     <div
//       // id="kt_custom_material_full_info"
//       className="bg-body"
//       // data-kt-drawer="true"
//       // data-kt-drawer-name="custom_material_full_info"
//       // data-kt-drawer-activate="true"
//       // data-kt-drawer-overlay="true"
//       // data-kt-drawer-width="{default:'100%', 'lg': '1000px'}"
//       // data-kt-drawer-direction="end"
//       // data-kt-drawer-toggle="#kt_custom_material_full_info_toggle"
//       // data-kt-drawer-close="#kt_custom_material_full_info_close"
//     >
//       <div className="card shadow-none rounded-0 w-100">
//         <div className="card-header" id="kt_custom_material_full_info_header">
//           <h3 className="card-title fw-bolder text-gray-900">{`${currentMockMaterialList?.name} | ${currentMockMaterialGroup?.groupName} | ${currentMockMaterial?.vendorCode}`}</h3>

//           <div className="card-toolbar">
//             <button
//               type="button"
//               className="btn btn-sm btn-icon btn-active-light-primary me-n5"
//               id="kt_custom_material_full_info_close"
//             >
//               <KTIcon iconName="cross" className="fs-1" />
//             </button>
//           </div>
//         </div>
//         <div
//           className="p-6 position-relative h-100%"
//           id="kt_custom_material_full_info_body"
//         >
//           <div
//             id="kt_custom_material_full_info_scroll"
//             className="position-relative scroll-y me-n5 pe-5"
//             data-kt-scroll="true"
//             data-kt-scroll-height="auto"
//             data-kt-scroll-wrappers="#kt_custom_material_full_info_body"
//             data-kt-scroll-dependencies="#kt_custom_material_full_info_header, #kt_custom_material_full_info_footer"
//             data-kt-scroll-offset="5px"
//             // style={{
//             //   height: "100% !important",
//             // }}
//           >
//             <div className="w-100% h-100%">
//               {currentMockMaterial !== undefined &&
//                 currentMockMaterialGroup !== undefined &&
//                 currentMockMaterialList !== undefined}
//               <WrapperDetailMaterialInfoMenu
//                 currentMockMaterial={currentMockMaterial}
//                 currentMockMaterialGroup={currentMockMaterialGroup}
//                 currentMockMaterialList={currentMockMaterialList}
//                 close={}
//               />
//             </div>
//             {/* <div className="timeline">
//               <Item1 />
//               <Item2 />
//               <Item3 />
//               <Item4 />
//               <Item5 />
//               <Item6 />
//               <Item7 />
//               <Item8 />
//             </div> */}
//           </div>
//         </div>
//         <div
//           className="card-footer py-5 text-center"
//           id="kt_custom_material_full_info_footer"
//         >
//           <Link
//             to="/crafted/pages/profile"
//             className="btn btn-bg-body text-primary"
//           >
//             View All Activities
//             <KTIcon iconName="arrow-right" className="fs-3 text-primary" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { MaterialFullInfoDrawer };
