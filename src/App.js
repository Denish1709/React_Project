import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import ShoppingList from "./pages/shoppinglist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />
      </Routes>
    </Router>
  );
}

export default App;
