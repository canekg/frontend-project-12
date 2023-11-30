const baseUrl = 'api/v1';
const routes = {
  api: {
    login: `${baseUrl}/login`,
    signup: `${baseUrl}/signup`,
    data: `${baseUrl}/data`,
  },
  mainPage: '/',
  loginPage: '/login',
  signupPage: '/signup',
};

export default routes;
