import { Navigate,useParams } from 'react-router-dom';
import { useEffect,useMemo,useContext } from 'react';
import { PATH_MAIN } from './app/app';
import { StoreContext } from '../services/store_context';

export const ProtectedAuthorized: React.FC<{element:React.ReactNode}> = ({ element }) => {

  const { store, setStore } = useContext(StoreContext);

  const path = useParams<string>();

  useEffect(
    () => {
/*       dispatch(refreshToken()); */
    },
    []
  );

  const content = useMemo(
    () => {
      return (store.authRequest) ?
      <p style={{ textAlign: 'center' }}>Загрузка...</p>
      : (
        store.user === '' ? <Navigate to={PATH_MAIN} replace /> : element
      );
    },
    [store.user,path]
  );

  return (
    <>
    {content}
  </>
  ); 
}