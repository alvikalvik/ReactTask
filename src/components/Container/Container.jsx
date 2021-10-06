import React from 'react';
import PropTypes from 'prop-types';

import './Container.css';

Container.propTypes = {
  children: PropTypes.node
};

function Container({ children }) {
  return <div className="container">{children}</div>;
}

export default Container;
