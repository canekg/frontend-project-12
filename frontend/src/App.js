/* eslint-disable implicit-arrow-linebreak */
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from './Components/pages/Main.jsx';
import Login from './Components/pages/Login.jsx';
import Empty from './Components/pages/Empty.jsx';
import Signup from './Components/pages/Signup.jsx';
import routes from './routes';

const App = () =>
  (
    <>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Routes>
            <Route path={routes.mainPage} element={<Main />} />
            <Route path={routes.loginPage} element={<Login />} />
            <Route path={routes.signupPage} element={<Signup />} />
            <Route path="*" element={<Empty />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </>
  );
export default App;
