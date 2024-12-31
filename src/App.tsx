import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <p className="text-lg">News Aggregator</p>
      <Input type="text" placeholder="Search" />
      <Button>Click me</Button>
    </div>
  );
}

export default App;
