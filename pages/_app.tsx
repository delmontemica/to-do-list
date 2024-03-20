import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "../styles/globals.css";
import theme from "../theme/themeConfig";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const App = ({ Component, pageProps }: AppProps) => (
  <main className={roboto.className}>
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  </main>
);

export default App;
