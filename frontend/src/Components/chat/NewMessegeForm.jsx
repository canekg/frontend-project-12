import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import SendMessageIcon from '../icons/SendMessageIcon.jsx';
import { useAuth } from '../../context/AuthProvider.jsx';
import { useSocket } from '../../context/SocketProvider.jsx';
import { useFilter } from '../../context/FilterProvider.jsx';
import { getChannelsInfo } from '../../selectors/index.js';

const NewMessegeForm = () => {
  const filterWords = useFilter();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const auth = useAuth();
  const socket = useSocket();
  const { currentChannelId } = useSelector(getChannelsInfo);
  const formik = useFormik({
    initialValues: { messageBody: '' },
    onSubmit: ({ messageBody }, { resetForm }) => {
      try {
        socket.newMessage({
          body: filterWords(messageBody),
          channelId: currentChannelId,
          username: auth.user.username,
        });
        resetForm();
      } catch (err) {
        console.error(err);
      }
    },
    validationSchema: yup.object().shape({
      messageBody: yup.string().required(),
    }),
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageBody === '') {
      inputRef.current.focus();
    }
  }, [formik.values.messageBody]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="py-1 border rounded-2"
      >
        <Form.Group className="input-group">
          <Form.Control
            ref={inputRef}
            name="messageBody"
            autoComplete="off"
            aria-label={t('newMessage')}
            placeholder={t('newMessagePlaceholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.messageBody}
            disabled={formik.isSubmitting}
          />
          <Button type="submit" variant="light" className="border-0" disabled={formik.isSubmitting}>
            <SendMessageIcon />
            <span className="visually-hidden">{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessegeForm;
