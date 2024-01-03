import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Thenks } from "./pages/rahmat";
import Admin from "./pages/admin";
import Adminp from "./pages/adminp";
import Adminp1 from "./pages/admink";


export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rahmat" element={<Thenks />} />
      <Route path="/adminlogin" element={<Admin />} />
      <Route path="/admin" element={<Adminp />} />
      <Route path="/admin/sayd" element={<Adminp />} />
      <Route path="/admin/kategory" element={<Adminp1 />} />
      <Route path="/*" element={"404"} />
    </Routes>
  );
}

