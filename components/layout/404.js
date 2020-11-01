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

const Error404 = (props) => {
  const { title, description } = props;
  return (
    <Container>
      <h1>{title}</h1>
      <p>{description}</p>
      <Image src='/static/image/404.svg' alt='404' />
    </Container>
  );
};

Error404.defaultProps = {
  title: 'Oops!!',
  description: "We can't seem to find the page you're looking for.",
};

export default Error404;
