import { Route, Routes } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/guest/Home";
import MovieDetail from "../pages/movie/MovieDetail";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/movies/:id"} element={<MovieDetail />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
