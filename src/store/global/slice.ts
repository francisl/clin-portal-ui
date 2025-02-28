import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, MessageArgsPropsCustom } from 'store/global/types';
import { LANG } from 'utils/constants';
import intl from 'react-intl-universal';
import locales from 'locales';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';

export const GlobalState: initialState = {
  lang: LANG.FR,
  notification: undefined,
  message: undefined,
  messagesToDestroy: [],
  isFetchingStats: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: GlobalState,
  reducers: {
    changeLang: (state, action: PayloadAction<LANG>) => {
      intl.init({
        currentLocale: action.payload,
        locales,
      });

      return {
        ...state,
        lang: action.payload,
      };
    },

    displayMessage: (state, action: PayloadAction<MessageArgsPropsCustom>) => ({
      ...state,
      message: action.payload,
    }),

    destroyMessages: (state, action: PayloadAction<string[]>) => ({
      ...state,
      message: undefined,
      messagesToDestroy: action.payload,
    }),

    displayNotification: (state, action: PayloadAction<NotificationArgsProps>) => ({
      ...state,
      notification: action.payload,
    }),

    destroyNotification: (state) => ({
      ...state,
      notification: undefined,
    }),
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
