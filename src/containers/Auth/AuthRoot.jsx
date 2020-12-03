import React from 'react';
import { Switch } from 'react-router';

import { AuthRoute } from '../../router/AuthRoute';
import { useAuthBase } from '../../hooks/useAuthBase';
import { actionAppStartInit } from '../App/actions';
import { SignIn, SignUp } from './components';

export const AuthRoot = () => {
  return (
    <Switch>
      <AuthRoute
        exact
        path="/sign-up"
        useAuthBase={useAuthBase}
        actionAppStartInit={actionAppStartInit}
        component={SignUp}
      />
      <AuthRoute
        exact
        path="/sign-in"
        useAuthBase={useAuthBase}
        actionAppStartInit={actionAppStartInit}
        component={SignIn}
      />
    </Switch>
  );
};
