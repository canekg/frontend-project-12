import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Login.jsx';
import NotFoundPage from './pages/Empty.jsx';
import SignupPage from './pages/Signup.jsx';
import MainPage from './pages/Main.jsx';
import routes from '../routes';
import { useAuth } from '../hooks/index.js';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  return auth.user ? (
    children
  ) : (
    <Navigate to={routes.login()} state={{ from: location }} />
  );
};

const LogOut = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return auth.user ? <Button onClick={auth.logOut}>{t('logOut')}</Button> : null;
};

const App = () => {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white">
          <Container>
            <Navbar.Brand as={Link} to={routes.home()}>
              {t('mainHeader')}
            </Navbar.Brand>
            <LogOut />
          </Container>
        </Navbar>
        <Routes>
          <Route
            index
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.home()} element={<MainPage />} />
          <Route path={routes.login()} element={<LoginPage />} />
          <Route path={routes.signup()} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
