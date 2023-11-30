/* eslint-disable no-unused-vars */
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import React from 'react';
// import store from './slices/index.js';
import App from './App.js';
import resources from './locales/index.js';
// import FilterProvider from './context/FilterProvider';
// import AuthProvider from './context/AuthProvider';
// import SocketProvider from './context/SocketProvider';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default init;
