import { Blog } from "./components/Blog";
import { Auth } from "./components/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center flex-col">
        <h1>ERIKA CLIENT</h1>
        <Auth />
        <Blog />
      </div>
    </QueryClientProvider>
  );
}

export default App;
