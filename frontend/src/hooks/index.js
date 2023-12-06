import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const SocketContext = createContext({});
export const FilterContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useFilter = () => useContext(FilterContext);