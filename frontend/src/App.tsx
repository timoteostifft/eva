import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import User from "./pages/UserJourneys";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
