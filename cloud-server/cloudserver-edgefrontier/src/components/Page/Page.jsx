import PropTypes from 'prop-types';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { app } from '../../common/constants';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export const Page = ({ children, description, elements, isFluid, keywords, title }) => (
  <HelmetProvider>
    <Helmet defaultTitle={app.name} titleTemplate={`${app.name} | %s`}>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <title>{title}</title>
      {elements}
    </Helmet>
    <LayoutContainer isFluid={isFluid} role="main" Tag="main">
      {children}
    </LayoutContainer>
  </HelmetProvider>
);

Page.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  elements: PropTypes.node,
  isFluid: PropTypes.bool,
  keywords: PropTypes.string,
  title: PropTypes.string,
};
