import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { mockMaterialsList } from "./mockData";
import { Content } from "../../../_metronic/layout/components/content";
import { useIntl } from "react-intl";
import { MaterialsListMenu } from "./MaterialsListMenu";
// import { ProfileHeader } from "../profile/ProfileHeader";
// import {Overview} from './components/Overview'
// import {Projects} from './components/Projects'
// import {Campaigns} from './components/Campaigns'
// import {Documents} from './components/Documents'
// import {Connections} from './components/Connections'
// import {ProfileHeader} from './ProfileHeader'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: "Materials List",
    path: "/materials-list",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];
//   const intl = useIntl();

//   return (
//     <Content>
//       <>{intl.formatMessage({ id: "MATERIALS_LIST.COMMON.NAME" })}</>
//       {/* <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
// </div> */}
//     </Content>
//   );

const MaterialsListPage = () => {
  const intl = useIntl();

  return (
    <Routes>
      <Route
        element={
          <>
            <Content>
              <h1>
                {intl.formatMessage({ id: "MATERIALS_LIST.COMMON.NAME" })}
              </h1>
            </Content>
            <Outlet />
            {/* <ProfileHeader /> */}
          </>
        }
      >
        {mockMaterialsList.map((material) => (
          <Route
            key={material.id}
            path={encodeURI(material.name)}
            element={
              <Content>
                <>
                  <PageTitle breadcrumbs={profileBreadCrumbs}>
                    {material.name}
                  </PageTitle>
                  <>
                    <MaterialsListMenu currentMaterialsList={material} />
                    {/* {material.items.map((m, index) => (
                      <span key={index}>
                        {`${m.code} ${m.name} ${m.purchasePrice}`}
                      </span>
                    ))} */}
                  </>
                  {/* <Overview /> */}
                </>
              </Content>
            }
          />
        ))}
        {/* <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='projects'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
            <Projects />
          </>
        }
      /> */}
        <Route index element={<Navigate to="/materials-list" />} />
      </Route>
    </Routes>
  );
};

export default MaterialsListPage;
