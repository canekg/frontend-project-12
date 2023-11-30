/* eslint-disable implicit-arrow-linebreak */
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import React, { useContext } from 'react';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../slices/messageSlice.js';
// import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';
import Main from './Components/pages/Main.jsx';
import Login from './Components/pages/Login.jsx';
import Empty from './Components/pages/Empty.jsx';
import Signup from './Components/pages/Signup.jsx';
import routes from './routes';
// import { SocketContext } from '../context/index';
// import avatar from './assets/avatar.jpg';

const App = () =>
  // const socket = useContext(SocketContext);
  // const dispatch = useDispatch();
  // socket.on('newMessage', (message) => {
  //   dispatch(addMessage(message));
  // });
  // socket.on('newChannel', (channel) => {
  //   dispatch(addChannel(channel));
  // });
  // socket.on('renameChannel', (channel) => {
  //   dispatch(renameChannel({ id: channel.id, changes: channel }));
  // });
  // socket.on('removeChannel', (data) => {
  //   dispatch(removeChannel(data.id));
  // });
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
