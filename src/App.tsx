// import { Card, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyCard from './components/MyCard';
import { Register } from "./components/Register";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards/:id" element={<MyCard />} />
          <Route path="/cards/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;