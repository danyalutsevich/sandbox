import { Admin, Resource } from "react-admin";
import EicrudDataProvider from "./utils/dataProvider";
import { sp } from "./client";
import "./App.css";
import { BlogList } from "./resources/blog/list";
import { BlogShow } from "./resources/blog/show";
import { authProvider } from "./utils/authProvider";

function App() {
  const dataProvider = EicrudDataProvider(sp);

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      requireAuth
      disableTelemetry
    >
      <Resource name="blog" list={<BlogList />} show={<BlogShow />} />
    </Admin>
  );
}

export default App;
