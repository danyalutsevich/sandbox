import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { authProvider, TOKEN_KEY } from "./authProvider";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TrainList } from "./pages/train/list";
import { TrainCreate } from "./pages/train/create";
import { UserList } from "./pages/user/list";
import { RouteList } from "./pages/route/list";
import { TrainShow } from "./pages/train/show";
import { TrainEdit } from "./pages/train/edit";
import { RouteCreate } from "./pages/route/create";
import { RouteShow } from "./pages/route/show";
import { RouteEdit } from "./pages/route/edit";
import { UserCreate } from "./pages/user/create";
import { StationList } from "./pages/station/list";
import { StationCreate } from "./pages/station/create";
import { UserEdit } from "./pages/user/edit";
import { UserShow } from "./pages/user/show";
import { StationEdit } from "./pages/station/edit";
import { StationShow } from "./pages/station/show";
import { ScheduleList } from "./pages/schedule/list";
import { ScheduleCreate } from "./pages/schedule/create";
import { ScheduleEdit } from "./pages/schedule/edit";
import { ScheduleShow } from "./pages/schedule/show";
import {
  CircleStopIcon,
  ListIcon,
  RouteIcon,
  TrainIcon,
  UserIcon,
} from "lucide-react";
import { axiosInstance } from "./utils/axiosInstance";

function App() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  const dataProvider = nestjsxCrudDataProvider(API_URL, axiosInstance);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider()}
            routerProvider={routerProvider}
            authProvider={authProvider}
            resources={[
              // {
              //   name: "blog_posts",
              //   list: "/blog-posts",
              //   create: "/blog-posts/create",
              //   edit: "/blog-posts/edit/:id",
              //   show: "/blog-posts/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
              // {
              //   name: "categories",
              //   list: "/categories",
              //   create: "/categories/create",
              //   edit: "/categories/edit/:id",
              //   show: "/categories/show/:id",
              //   meta: {
              //     canDelete: true,
              //   },
              // },
              {
                name: "user",
                list: "/user",
                create: "/user/create",
                edit: "/user/edit/:id",
                show: "/user/show/:id",
                meta: {
                  icon: <UserIcon />,
                  canDelete: true,
                },
              },
              {
                name: "train",
                list: "/train",
                create: "/train/create",
                edit: "/train/edit/:id",
                show: "/train/show/:id",
                meta: {
                  icon: <TrainIcon />,
                  canDelete: true,
                },
              },
              {
                name: "route",
                list: "/route",
                create: "/route/create",
                edit: "/route/edit/:id",
                show: "/route/show/:id",
                meta: {
                  icon: <RouteIcon />,
                  canDelete: true,
                },
              },
              {
                name: "station",
                list: "/station",
                create: "/station/create",
                edit: "/station/edit/:id",
                show: "/station/show/:id",
                meta: {
                  icon: <CircleStopIcon />,
                  canDelete: true,
                },
              },
              {
                name: "schedule",
                list: "/schedule",
                create: "/schedule/create",
                edit: "/schedule/edit/:id",
                show: "/schedule/show/:id",
                meta: {
                  icon: <ListIcon />,
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                {/* <Route */}
                {/*   index */}
                {/*   element={<NavigateToResource resource="blog_posts" />} */}
                {/* /> */}
                {/* <Route path="/blog-posts"> */}
                {/*   <Route index element={<BlogPostList />} /> */}
                {/*   <Route path="create" element={<BlogPostCreate />} /> */}
                {/*   <Route path="edit/:id" element={<BlogPostEdit />} /> */}
                {/*   <Route path="show/:id" element={<BlogPostShow />} /> */}
                {/* </Route> */}
                {/* <Route path="/categories"> */}
                {/*   <Route index element={<CategoryList />} /> */}
                {/*   <Route path="create" element={<CategoryCreate />} /> */}
                {/*   <Route path="edit/:id" element={<CategoryEdit />} /> */}
                {/*   <Route path="show/:id" element={<CategoryShow />} /> */}
                {/* </Route> */}

                <Route path="/train">
                  <Route index element={<TrainList />} />
                  <Route path="create" element={<TrainCreate />} />
                  <Route path="edit/:id" element={<TrainEdit />} />
                  <Route path="show/:id" element={<TrainShow />} />
                </Route>

                <Route path="/user">
                  <Route index element={<UserList />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="show/:id" element={<UserShow />} />
                </Route>

                <Route path="/station">
                  <Route index element={<StationList />} />
                  <Route path="create" element={<StationCreate />} />
                  <Route path="edit/:id" element={<StationEdit />} />
                  <Route path="show/:id" element={<StationShow />} />
                </Route>

                <Route path="/schedule">
                  <Route index element={<ScheduleList />} />
                  <Route path="create" element={<ScheduleCreate />} />
                  <Route path="edit/:id" element={<ScheduleEdit />} />
                  <Route path="show/:id" element={<ScheduleShow />} />
                </Route>

                <Route path="/route">
                  <Route index element={<RouteList />} />
                  <Route path="create" element={<RouteCreate />} />
                  <Route path="edit/:id" element={<RouteEdit />} />
                  <Route path="show/:id" element={<RouteShow />} />
                </Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-outer"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <Toaster />
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
