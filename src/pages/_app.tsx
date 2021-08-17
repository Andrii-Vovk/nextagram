/* eslint-disable react/jsx-props-no-spreading */
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../ui/style/global.scss";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../core/store/store";
import "react-toastify/dist/ReactToastify.css";
import AuthEnforcer from "../ui/components/authEnforcer/authEnforcer";
import Toast from "../ui/components/common/toast/toast";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/66afb0360d.js"
          crossOrigin="anonymous"
        />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toast />
          <AuthEnforcer />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;
