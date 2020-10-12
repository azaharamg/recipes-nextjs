import React from 'react';
import { Global, css } from '@emotion/core';

const GlobalTheme = () => {
  return (
    <Global
      styles={css`
        :root {
          --blueLight01: #028090;
          --blueDark02: #05668d;

          --greenLight01: #f0f3bd;
          --green02: #02c39a;
          --greenDark03: #00a896;

          --greyDark: #6c757d;
          --greyLight: #d9d9d9;

          --white: #fff;
          --red: #ff0000;

          --primaryFontFamily: 'Oxygen', sans-serif;
          --secondaryFontFamily: 'Source Sans Pro', sans-serif;
        }

        html {
          font-size: 62.5%;
          box-sizing: border-box;
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
        }

        body {
          font-size: 1.6rem;
          line-height: 1.5;
          font-family: var(--secondaryFontFamily);
        }

        h1,
        h2,
        h3 {
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }

        h1,
        h2 {
          font-family: var(--primaryFontFamily);
          font-weight: 700;
        }

        h3 {
          font-family: var(--secondaryFontFamily);
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        a {
          text-decoration: none;
          font-family: var(--secondaryFontFamily);
        }

        img {
          max-width: 100%;
        }
      `}
    />
  );
};

export default GlobalTheme;
