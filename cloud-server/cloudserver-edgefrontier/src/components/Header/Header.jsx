import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export const Header = () => (
  <LayoutContainer role="banner" Tag="header">
    <Link to="/">Logo</Link>
  </LayoutContainer>
);
