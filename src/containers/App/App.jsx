import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router';
import { push } from 'connected-react-router';
import { useSessionStorage } from 'react-use';

import { useAuthBase } from '../../hooks/useAuthBase';
import { RouteWithCheckAuth } from '../../router/RouteWithCheckAuth';
import { Menu } from '../../Components';
import { People } from '../People/People';
import { Channels } from '../Channels/Channels';
import { About } from '../About/About';
import { selectCurrentUser } from './selectors';
import { selectUserAuthData, selectIsLogOut } from '../Auth/selectors';
import { actionAppLogOut } from '../Auth/actions';

export const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);
  const userAuthData = useSelector(selectUserAuthData);

  const [value, setValue] = useSessionStorage('userAuthData');
  const isLogOut = useSelector(selectIsLogOut);

  useEffect(() => {
    if (isLogOut) {
      dispatch(push('/sign-in'));
    } else if (!value && !isLogOut) {
      setValue(() => userAuthData);
    }
  }, [dispatch, isLogOut, setValue, userAuthData, value]);

  return (
    <Box>
      <Menu
        title={currentUser.name}
        handleLogOut={() => {
          setValue(() => undefined);
          dispatch(actionAppLogOut());
        }}
      >
        <Switch>
          <RouteWithCheckAuth
            exact
            path="/people"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={People}
          />
          <RouteWithCheckAuth
            exact
            path="/channels"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={Channels}
          />
          <RouteWithCheckAuth
            exact
            path="/about"
            redirectPath="/sign-in"
            useAuthBase={useAuthBase}
            component={About}
          />

          <Route component={() => <Redirect to="/people" />} />
        </Switch>
      </Menu>
    </Box>
  );
};
