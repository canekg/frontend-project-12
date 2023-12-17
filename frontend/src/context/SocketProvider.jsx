import {
  createContext, useMemo, useCallback, useContext,
} from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import store from '../slices/index.js';
import { addMessages } from '../slices/messagesSlice';
import {
  addChannel, removeChanneFromState, renameChannelFromState,
} from '../slices/channelsSlice';

const SocketContext = createContext({});
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { t } = useTranslation();
  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessages(payload)));
  socket.on('newChannel', (payload) => addChannel(payload));
  socket.on('removeChannel', (payload) => store.dispatch(removeChanneFromState(payload)));
  socket.on('renameChannel', (payload) => store.dispatch(renameChannelFromState(payload)));

  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('notifications.errMessage'));
      }
    });
  }, [socket, t]);

  const newChannel = useCallback((newNameChannel) => new Promise((resolve) => {
    socket.emit('newChannel', newNameChannel, (response) => {
      if (response.status === 'ok') {
        resolve(response.data);
      }
    });
  }), [socket]);

  const removeChannel = useCallback((channelId) => {
    socket.emit('removeChannel', { id: channelId });
  }, [socket]);

  const renameChannel = useCallback((channelId, newNameChannel) => {
    socket.emit('renameChannel', { id: channelId, name: newNameChannel });
  }, [socket]);

  const context = useMemo(() => ({
    newMessage, newChannel, removeChannel, renameChannel,
  }), [newMessage, newChannel, removeChannel, renameChannel]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
