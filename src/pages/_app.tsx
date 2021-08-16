import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import "../ui/style/global.scss";

// import store from '../app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
