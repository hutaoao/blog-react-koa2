import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({...rest}) => {
  console.log(rest)
  // const jwtToken = sessionStorage.getItem('jwtToken');
  const jwtToken = 1;
  if (jwtToken) {
    return <Route {...rest} />
  } else {
    return <Redirect to='login'/>
  }
}

export default PrivateRoute;
