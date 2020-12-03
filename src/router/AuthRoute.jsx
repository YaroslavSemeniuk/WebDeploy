import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'ramda';

import { RenderComponent } from './RenderComponent';

export const AuthRoute = (props) => {
  const {
    redirectPath = '/people',
    redirectOnLoggedIn = true,
    useAuthBase,
    actionAppStartInit,
    component,
    ...rest
  } = props;
  const dispatch = useDispatch();

  const { isReady, isAuth, currentUser, Spinner } = useAuthBase();

  if (!isReady && isEmpty(currentUser) && isAuth) {
    dispatch(actionAppStartInit());
  }

  const isLoading = !isReady && isAuth;
  const isRedirect = isReady && isAuth && redirectOnLoggedIn;

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

AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  exact: PropTypes.bool,
  redirectOnLoggedIn: PropTypes.bool,
  useAuthBase: PropTypes.func.isRequired,
  actionAppStartInit: PropTypes.func.isRequired,
  component: PropTypes.any,
};
