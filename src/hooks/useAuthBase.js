import { useSelector, shallowEqual } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { selectIsReady, selectCurrentUser } from '../containers/App/selectors';
import { selectIsAuth } from '../containers/Auth/selectors';

export const useAuthBase = () => {
  const isReady = useSelector(selectIsReady);
  const isAuth = useSelector(selectIsAuth);
  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  return { isReady, isAuth, currentUser, Spinner: CircularProgress };
};
