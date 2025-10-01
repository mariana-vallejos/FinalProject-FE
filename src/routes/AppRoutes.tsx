import { Route, Routes } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/guest/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ReviewsPage from "../pages/admin/ReviewsPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ReviewsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
