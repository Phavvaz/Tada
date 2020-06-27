import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as action from '../../store/index';

const Logout = (props) => {
  useEffect(() => {
    dispatch(action.logOut());
  });
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate('/login', { replace: true });
  });
  const dispatch = useDispatch();

  //   Navigate('/login', { replace: true });
  //   console.log(Navigate);
  //   const logoutNavigate = Navigate('/');
  return null;
};

export default Logout;
