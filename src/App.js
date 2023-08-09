import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/home";
import ShoppingList from "./pages/shoppinglist";
import EditItems from "./pages/edit";
import { MyVerticallyCenteredModa, Test } from "./pages/test";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/shoppinglist" element={<ShoppingList />} />
        <Route path="/edit/:id" element={<EditItems />} />
        <Route path="/test/:id" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
