import { Route, Routes } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/guest/Home";
import MovieDetail from "../pages/movie/MovieDetail";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ReviewsPage from "../pages/admin/ReviewsPage";
import ProfilePage from "../pages/profile/ProfilePage";

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

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ReviewsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
