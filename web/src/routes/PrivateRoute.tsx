import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({...rest}) => {
  if (/admin/.test(rest.location.pathname)) {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (jwtToken) {
      return <Route {...rest} />
    } else {
      return <Redirect to='/login'/>
    }
  } else {
    return <Route {...rest} />
  }
}

export default PrivateRoute;
