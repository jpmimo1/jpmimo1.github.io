import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/:area" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
