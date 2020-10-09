import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SearchBox from '../ui/SearchBox';
import { Button } from '../ui/Button';
import NavBar from './NavBar';

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--greenDark03);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  margin-right: 2rem;
  &:first-letter {
    font-size: 200%;
  }
`;

const Header = () => {
  const user = true;

  return (
    <header
      css={css`
        background-color: var(--greenLight01);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href='/'>
            <Logo>Recipes</Logo>
          </Link>
          <SearchBox />
          <NavBar />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <React.Fragment>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello!!
              </p>
              <Button bgColor='true' type='button'>
                Log out
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link href='/login'>
                <Button bgColor='true'>Login</Button>
              </Link>
              <Link href='/create-account'>
                <Button bgColor='true'>Register</Button>
              </Link>
            </React.Fragment>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
