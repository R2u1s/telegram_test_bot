import { FC, useReducer,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Player from '../player/player';
import Start from '../start/start';
import { StoreContext } from '../../services/store_context';
import { reducer } from '../../services/store_context';
import { initialState } from '../../services/store_context';
import { ProtectedAuthorized } from '../ProtectedAuthorized';
import Course from '../course/course';
import List from '../list/list';
import Theme from '../theme/theme';
import { initBackButton } from '@telegram-apps/sdk';

export const PATH_MAIN = "/telegram_test_bot";
export const PATH_LIST = "/telegram_test_bot/list";
export const PATH_COURSE = "/telegram_test_bot/list/course";
export const PATH_THEME = "/telegram_test_bot/list/course/theme";
export const PATH_PLAYER = "/telegram_test_bot/list/course/theme/player";

/* export const PATH_MAIN = "/";
export const PATH_LIST = "/list";
export const PATH_COURSE = "/list/course";
export const PATH_THEME = "/list/course/theme";
export const PATH_PLAYER = "/list/course/theme/player"; */

const App: FC = () => {

  const [store, setStore] = useReducer<any>(reducer, initialState);

  const colorScheme = 'Telegram' in window ? window.Telegram.WebApp.colorScheme : 'white';

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [colorScheme]);

  const [backButton] = initBackButton();
  backButton.show();

  return (
    <>
      <StoreContext.Provider value={{ store, setStore }}>
        <Routes>
          <Route path={PATH_MAIN} element={<Start />} />
          <Route path={PATH_LIST} element={
            <ProtectedAuthorized element={<List />} />
          } />
          <Route path={PATH_COURSE} element={
            <ProtectedAuthorized element={<Course />} />
          } />
          <Route path={PATH_THEME} element={
            <ProtectedAuthorized element={<Theme />} />
          } />
          <Route path={PATH_PLAYER} element={
            <ProtectedAuthorized element={<Player />} />
          } />
        </Routes>
      </StoreContext.Provider>
    </>
  )
}

export default App;