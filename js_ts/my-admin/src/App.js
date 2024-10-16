import { HydraAdmin, OpenApiAdmin } from "@api-platform/admin";

// Replace with your own API entrypoint
// For instance if https://example.com/api/books is the path to the collection of book resources, then the entrypoint is https://example.com/api
// export default () => <HydraAdmin entrypoint="https://demo.api-platform.com" />;

const entrypointUrl = "https://foodtruck-api.coderfy.com";
const docsUrl = "https://foodtruck-api.coderfy.com/api-json";

export default () => (
  <OpenApiAdmin docEntrypoint={docsUrl} entrypoint={entrypointUrl} />
);
