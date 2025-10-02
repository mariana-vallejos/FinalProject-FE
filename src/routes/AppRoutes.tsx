import { Route, Routes } from "react-router";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/guest/Home";
import MovieDetail from "../pages/movie/MovieDetail";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ReviewsPage from "../pages/admin/ReviewsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import MainLayout from "../components/layout";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/not-found"} element={<NotFoundPage />} />
        <Route element={<MainLayout />}>
          <Route path={"/"} element={<Home />} />

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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
