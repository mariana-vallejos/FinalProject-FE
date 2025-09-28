import { Route, Routes } from "react-router";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/guest/Home";

function App() {
  return <>
    <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route path={'/admin'} element={<Dashboard/>}/>
    </Routes>
  </>;
}

export default App;
