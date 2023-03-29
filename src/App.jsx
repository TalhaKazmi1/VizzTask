import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/dash" element={<Dashboard />}>
            <Route path="Create" element={<CreateUser />} />
            <Route path="Edit/:userId" element={<EditUser />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
