import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/guest/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return <>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>;
}

export default App;
