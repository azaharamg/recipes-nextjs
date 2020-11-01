import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--white);
    :hover {
      color: var(--greyDark);
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const NavBar = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/popular'>
        <a>Most Popular</a>
      </Link>
      {user && (
        <Link href='/new-recipe'>
          <a>New Recipe</a>
        </Link>
      )}
    </Nav>
  );
};

export default NavBar;
