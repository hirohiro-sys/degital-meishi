// import { Card, Text } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyCard from './components/MyCard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/cards/:id" element={<MyCard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;