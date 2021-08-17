import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "../ui/style/global.scss";
import store from "../core/store/store";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../ui/components/common/toast/toast";
import Head from 'next/head'
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import AuthEnforcer from "../ui/components/authEnforcer/authEnforcer";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);
  
  return (
    <>
    <Head>
          <script src="https://kit.fontawesome.com/66afb0360d.js" crossOrigin="anonymous"></script>
    </Head>

    <Provider store={store}>
      <Toast />
      <AuthEnforcer />
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default MyApp;
