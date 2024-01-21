import { Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, Search } from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};
