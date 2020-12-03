import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Case, Default } from 'react-if';
import { Redirect } from 'react-router';

export const RenderComponent = (props) => {
  const { isLoading, isRedirect, redirectPath, component: Component, Spinner, ...rest } = props;

  return (
    <Switch>
      <Case condition={isLoading}>
        <Spinner />
      </Case>
      <Case condition={isRedirect}>
        <Redirect to={{ pathname: redirectPath }} />
      </Case>
      <Default>
        <Component {...rest} />
      </Default>
    </Switch>
  );
};

RenderComponent.propTypes = {
  isLoading: PropTypes.bool,
  isRedirect: PropTypes.bool,
  redirectPath: PropTypes.string,
  component: PropTypes.any,
  Spinner: PropTypes.any,
};
