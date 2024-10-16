import { Admin, ListGuesser, Resource } from "react-admin";
import EicrudDataProvider from "./utils/dataProvider";
import { sp } from "./client";
import "./App.css";
import { BlogList } from "./resources/blog/list";

function App() {
  const dataProvider = EicrudDataProvider(sp);

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="blog" list={<BlogList />} />
    </Admin>
  );
}

export default App;
