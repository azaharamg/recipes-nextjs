import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 50vw;
  height: 50vh;
`;

const Error404 = () => {
  return (
    <Container>
      <h1>Oops!!</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <Image src='/static/image/404.svg' alt='404' />
    </Container>
  );
};

export default Error404;
