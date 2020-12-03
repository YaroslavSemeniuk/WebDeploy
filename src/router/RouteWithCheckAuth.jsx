import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { isEmpty } from 'ramda';

import { RenderComponent } from './RenderComponent';

export const RouteWithCheckAuth = (props) => {
  const { redirectPath = '/sign-in', component, useAuthBase, ...rest } = props;

  const { isReady, isAuth, currentUser, Spinner } = useAuthBase();

  const isLoading = !isReady && isAuth;
  const isRedirect = !isAuth && isEmpty(currentUser);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return (
          <RenderComponent
            isLoading={isLoading}
            isRedirect={isRedirect}
            redirectPath={redirectPath}
            Spinner={Spinner}
            component={component}
            {...routeProps}
          />
        );
      }}
    />
  );
};

RouteWithCheckAuth.propTypes = {
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  exact: PropTypes.bool,
  useAuthBase: PropTypes.func,
  component: PropTypes.any,
};
