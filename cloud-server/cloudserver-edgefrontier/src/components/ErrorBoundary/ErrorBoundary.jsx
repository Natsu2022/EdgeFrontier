import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo): void { /* Do something with error. */ }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <LayoutContainer role="alert">
          <p>There was an error.</p>
        </LayoutContainer>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};
