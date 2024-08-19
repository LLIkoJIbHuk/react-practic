import { RootState } from '../store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RequireAutht = ({children}: {children: ReactNode}) => {
  //берет состояние и вытаскивает нужный jwt токен
  const jwt = useSelector((s: RootState) => s.user.jwt);
  
  if(!jwt) {
    return <Navigate to='/auth/login' replace />;
  }
  return children;
};