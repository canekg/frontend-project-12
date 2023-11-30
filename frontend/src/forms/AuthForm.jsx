/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useTranslation } from 'react-i18next';
// import Navigation from '../../Navigation';
// import routes from '../../routes';
// import empty from '../../assets/404.jpg';

import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import useAuth from '../useAuth';
import routes from '../routes';

const AuthForm = ({ t }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const inputEl = useRef(null);
  const fieldsetEl = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const submitForm = async (values, formik) => {
    try {
      const from = location.state?.from?.pathname || '/';
      console.log('111');
      console.log(values);
      fieldsetEl.current.setAttribute('disabled', true);
      console.log('222');
      const response = await axios.post(routes.api.login, values);
      console.log('333');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      login();
      // navigate(routes.mainPage, { replace: false });
      navigate(from, { replace: false });
    } catch (error) {
      console.log('444');
      switch (error) {
        case 'AxiosError':
          formik.setErrors({ authorization: '401' });
          console.log(error);
          break;
        default:
          formik.setErrors({ network: '404' });
          console.log(error);
          break;
      }
    }
    fieldsetEl.current.removeAttribute('disabled');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      submitForm(values, formik);
    },
  });
  const {
    errors, touched, handleChange, handleSubmit, values,
  } = formik;

  const usernameClass = cn('form-control', {
    'is-invalid': touched.username && (errors.username || errors.authorization),
  });
  const passwordClass = cn('form-control', {
    'is-invalid': touched.password && (errors.password || errors.authorization),
  });

  return (
    <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <fieldset ref={fieldsetEl}>
        <Form.Group className="form-floating mb-3" controlId="username">
          <input name="username" ref={inputEl} autoComplete="username" required onChange={handleChange} placeholder={t('loginPage.usernamePlaceholder')} value={values.username} id="username" className={usernameClass} />
          <label htmlFor="username" className="form-label">{t('loginPage.username')}</label>
        </Form.Group>
        <Form.Group className="form-floating mb-4" controlId="password">
          <input name="password" type="password" autoComplete="current-password" required onChange={handleChange} placeholder={t('loginPage.passwordPlaceholder')} value={values.password} id="password" className={passwordClass} />
          <label htmlFor="password" className="form-label">{t('loginPage.password')}</label>
          {errors ? <div className="invalid-tooltip">{t('loginPage.errors.authError')}</div> : null}
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="w-100 mb-3">
          {t('loginPage.enter')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default AuthForm;
