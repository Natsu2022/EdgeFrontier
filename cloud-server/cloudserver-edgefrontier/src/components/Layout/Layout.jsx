import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { lazyComponent } from '../../common/utils';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Loading } from '../Loading/Loading';

const Footer = lazyComponent('Footer', import('../Footer/Footer'));
const Header = lazyComponent('Header', import('../Header/Header'));

const Container = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>{children}</Suspense>
  </ErrorBoundary>
);

export const Layout = ({ children }) => (
  <>
    <Container>
      <Header />
    </Container>
    <Container>{children}</Container>
    <Container>
      <Footer />
    </Container>
  </>
);

Container.propTypes = {
  children: PropTypes.node,
};

Layout.propTypes = {
  children: PropTypes.node,
};
