import "./App.css";
import { Landing } from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import { UserData } from "./pages/UserData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/:username" element={<UserData />} />
      </Routes>
    </div>
  );
}

export default App;
