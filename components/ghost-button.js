/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import Link from './link';

const GhostButton = ({children, link, variant}) => {
  return (
    <Link variant={variant || 'ghost'} link={link}>
      {children}
    </Link>
  );
};

export default GhostButton;
