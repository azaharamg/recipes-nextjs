import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--greyDark);

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const NavBar = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href='/'>Home</Link>
      <Link href='/popular'>Most Popular</Link>
      {user && <Link href='/new-recipe'>New Recipe</Link>}
    </Nav>
  );
};

export default NavBar;
