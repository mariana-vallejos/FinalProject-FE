import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return <>
    <Routes>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route path={'/admin'} element={<Dashboard/>}/>
    </Routes>
  </>;
}

export default App;
