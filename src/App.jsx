import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
// import { AuthProvider } from "./Shared/hooks/AuthProvider";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import { ToastContainer } from "react-toastify";
import EditModal from './components/EditModal';
import NotFound from './components/NotFound';
import DetailsUser from './pages/DetailsUser';
import PrivateRoutes from "./pages/PrivateRoutes";

function App() {
  return (
    // <AuthProvider>
      <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Create" element={<CreateUser />} />
            <Route path="Edit/:userId" element={<EditUser />} />
            <Route path="/modal" element={<EditModal />} />
            <Route path="/Detail/:userId" element={<DetailsUser />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    // </AuthProvider>
  );
}

export default App;
