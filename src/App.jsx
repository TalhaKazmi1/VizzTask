import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import { ToastContainer } from "react-toastify";
import EditModal from './components/EditModal';
import NotFound from './components/NotFound';
import DetailsUser from './pages/DetailsUser';
import { useLocalStorage } from './Shared/hooks/useLocalStorage';

function App() {
  const { getUserAsync } = useLocalStorage();
  return (
    <div className='App'>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/dash' element={<Dashboard />} />
          <Route path='/Create' element={<CreateUser />} />
          <Route path='Edit/:userId' element={<EditUser />} />
          <Route path='/Login' element={<Login token={getUserAsync} />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/modal' element={<EditModal />} />
          <Route path='/Detail/:userId' element={<DetailsUser />} />
          <Route path='*' exact={true} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
