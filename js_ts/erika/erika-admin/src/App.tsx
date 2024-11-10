import { Admin, Resource } from "react-admin";
// import EicrudDataProvider from "./utils/dataProvider";
import { sp } from "./client";
import "./App.css";
import { BlogList } from "./resources/blog/list";
import { BlogShow } from "./resources/blog/show";
import { authProvider } from "./utils/authProvider";
import { BlogCreate } from "./resources/blog/create";
// import EicrudDataProvider from "ra-data-eicrud";
import { BlogEdit } from "./resources/blog/edit";
import EicrudDataProvider from "../../../../../apps/ra-data-eicrud/src/index";

function App() {
  const provider = EicrudDataProvider(sp);

  return (
    <Admin
      dataProvider={provider}
      // authProvider={authProvider}
      // requireAuth
      disableTelemetry
    >
      <Resource
        name="blog"
        list={<BlogList />}
        create={<BlogCreate />}
        show={<BlogShow />}
        edit={<BlogEdit />}
      />
    </Admin>
  );
}

export default App;
