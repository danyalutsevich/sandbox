import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Button
        className="bg-pink-600"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Click me
      </Button>
    </div>
  );
}

export default App;
