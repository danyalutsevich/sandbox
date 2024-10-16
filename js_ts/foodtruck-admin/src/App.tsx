import "./App.css";
import {
  OpenApiAdmin,
  openApiSchemaAnalyzer,
  openApiDataProvider,
  AdminGuesser,
} from "@api-platform/admin";
import {
  parseSwaggerDocumentation,
  parseOpenApi3Documentation,
  parseHydraDocumentation,
} from "@api-platform/api-doc-parser";
import simpleRestProvider from "ra-data-simple-rest";

console.log("hello");

// const entrypointUrl = "http://localhost:3000";
// const docsUrl = "http://localhost:3000/api-json";

const entrypointUrl = "https://foodtruck-api.coderfy.com";
const docsUrl = "https://foodtruck-api.coderfy.com/api-json";

function App() {
  // parseSwaggerDocumentation("https://demo.api-platform.com/docs.jsonld").then(
  //   (a) => console.log(a)
  // );
  // parseHydraDocumentation("https://demo.api-platform.com").then(({ api }) =>
  //   console.log(api)
  // );

  const dataProvider = openApiDataProvider({
    // Use any data provider you like
    dataProvider: simpleRestProvider(entrypointUrl),
    entrypoint: entrypointUrl,
    docEntrypoint: docsUrl,
  });

  const schemaAnalyzer = openApiSchemaAnalyzer();

  return (
    <>
      {/* <AdminGuesser
        dataProvider={dataProvider}
        schemaAnalyzer={schemaAnalyzer}
      /> */}
      <OpenApiAdmin docEntrypoint={docsUrl} entrypoint={entrypointUrl} />
      {/* <OpenApiAdmin
        docEntrypoint="http://localhost:3000/api-json"
        entrypoint="http://localhost:3000"
      /> */}
      {/* <OpenApiAdmin
        docEntrypoint="https://demo.api-platform.com/docs.jsonld" // Replace with your own OpenAPI documentation entrypoint
        entrypoint="https://demo.api-platform.com" // Replace with your own API entrypoint
      /> */}
    </>
  );
}

export default App;
