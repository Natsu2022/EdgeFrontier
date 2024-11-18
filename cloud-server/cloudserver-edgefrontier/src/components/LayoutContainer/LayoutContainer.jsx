import PropTypes from 'prop-types';
import React from 'react';
import classes from './LayoutContainer.module.scss';

export const LayoutContainer = ({
  children,
  className = '',
  isFluid = true,
  role,
  Tag = 'div',
}) => (
  <Tag className={`${classes.root} ${className}`} role={role}>
    <div className={isFluid ? classes.fluid : undefined}>{children}</div>
  </Tag>
);

LayoutContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isFluid: PropTypes.bool,
  role: PropTypes.string,
  Tag: PropTypes.string,
};
