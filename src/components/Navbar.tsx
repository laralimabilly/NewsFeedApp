import React from 'react';
import styled from 'styled-components';

const Navbar: React.FC = () => {
  return (
    <Nav>
      <div className="container mx-auto">
        <h1>The News Aggregator</h1>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  color: black;
  font-family: "DM Serif Text", serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export default Navbar;