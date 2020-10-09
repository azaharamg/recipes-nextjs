import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

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
  return (
    <Nav>
      <Link href='/'>Home</Link>
      <Link href='/popular'>Most Popular</Link>
      <Link href='/new-recipe'>New Recipe</Link>
    </Nav>
  );
};

export default NavBar;
