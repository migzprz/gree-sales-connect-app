import React from 'react';
import Restriction from './pages/Restriction';


const withAuthorization = (WrappedComponent, accessIndex) => {
  return function WithAuthorization(props) {
    const accessString = sessionStorage.getItem('accessString')

    // Check if the user's access string permits the use of the page
    const isAuthorized = accessString && accessString[Number(accessIndex)] === '1' ? true : false

    console.log('Is Authorized:', isAuthorized);

    // If user is not authorized, redirect to unauthorized page
    if (!isAuthorized) {
        console.log('not authorized!... redirecting')
        return <Restriction/>;
    }

    // If user is authorized, render the wrapped component
    return <WrappedComponent {...props}/>;
  };
};

export default withAuthorization;