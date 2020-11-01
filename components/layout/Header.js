import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import SearchBox from '../ui/SearchBox';
import { Button } from '../ui/Button';
import NavBar from './NavBar';

import { FirebaseContext } from '../../firebase';

const Wave = styled.div`
  position: absolute;
  height: 50px;
  width: 100%;
  background: #2c3e50;
  bottom: 0;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 100% 50%;
  }

  &:before {
    width: 55%;
    height: 109%;
    background-color: var(--greyLight);
    right: -1.5%;
    top: 60%;
  }
  &:after {
    width: 55%;
    height: 97%;
    background-color: #2c3e50;
    left: -1.5%;
    top: 40%;
  }
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--greenDark03);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  margin-right: 2rem;
  &:first-letter {
    font-size: 200%;
  }
  :hover {
    color: var(--greyMedium);
  }
`;

const Avatar = styled.p`
  margin-right: 2rem;
  color: var(--white);
  font-family: var(--primaryFontFamily);
  font-weight: 700;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header
      css={css`
        position: relative;
        background: #2c3e50;
        height: 30vh;
        padding: 2rem 1rem;
      `}
    >
      <Wave />

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
              <Avatar>{`Hello ${user.displayName}!!`}</Avatar>
              <Button
                bgColor='true'
                type='button'
                onClick={() => {
                  firebase.logOut();
                }}
              >
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
