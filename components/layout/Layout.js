import React from 'react';
import Head from 'next/head';

import GlobalTheme from '../theme/GlobalTheme';
import Header from '../layout/Header';

const Layout = (props) => {
  return (
    <React.Fragment>
      <GlobalTheme />

      <Head>
        <html lang='en' />
        <title>Recipe Book</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Oxygen:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <link rel='stylesheet' href='/static/styles/app.css' />
      </Head>

      <Header />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
