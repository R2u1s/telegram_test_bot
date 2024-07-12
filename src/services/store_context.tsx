import React from 'react';
import { TStore } from '../types/types';

export const StoreContext = React.createContext<any>({});

export const initialState: TStore = {
  user: '',
  authRequest: false,
  authSuccess: false,
  authFailed: false,
  dataRequest: false,
  dataSuccess: false,
  dataFailed: false,
  tracks: null
}

export type TAction = {
  type: string,
  action?: any
}

export function reducer(state: TStore, action: TAction) {

  switch (action.type) {

    case "authRequest":
      return {
        ...state,
        authRequest: true
      };

    case "authSuccess":
      return {
        ...state,
        user: action.action.user,
        authRequest: false,
        authSuccess: true
      };

    case "authFailed":
      return {
        ...state,
        authRequest: false,
        authFailed: true
      };

    case "clear":
      return initialState;

    default:
      throw new Error(`Wrong value`);
  }
}