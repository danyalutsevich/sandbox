import {Outlet, Route, Routes} from "react-router-dom";
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Products} from "./components/products/products.tsx";
import {useIntl} from "react-intl";

export function StockControl() {
  const intl = useIntl();
  const profileBreadCrumbs: Array<PageLink> = [
    {
      title: intl.formatMessage({ id: "STOCK_CONTROL.STOCK_CONTROL" }),
      path: '/stock-control',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]


  return (
      <Routes>
        <Route
            element={
              <>
                <Outlet />
              </>
            }
        >
          <Route
              path='products'
              element={
                      <>
                          <PageTitle
                              breadcrumbs={profileBreadCrumbs}>{intl.formatMessage({id: "STOCK_CONTROL.PRODUCTS"})}</PageTitle>
                          <Products/>
                      </>
              }
          />
          {/*<Route*/}
          {/*    path='projects'*/}
          {/*    element={*/}
          {/*      <>*/}
          {/*        <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>*/}
          {/*        <Projects />*/}
          {/*      </>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path='campaigns'*/}
          {/*    element={*/}
          {/*      <>*/}
          {/*        <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>*/}
          {/*        <Campaigns />*/}
          {/*      </>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path='documents'*/}
          {/*    element={*/}
          {/*      <>*/}
          {/*        <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>*/}
          {/*        <Documents />*/}
          {/*      </>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path='connections'*/}
          {/*    element={*/}
          {/*      <>*/}
          {/*        <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>*/}
          {/*        <Connections />*/}
          {/*      </>*/}
          {/*    }*/}
          {/*/>*/}
        </Route>
      </Routes>
  )
}
