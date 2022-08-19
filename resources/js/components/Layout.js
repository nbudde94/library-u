import React from 'react';
import user from '../user';
import { Navigate } from 'react-router-dom';

const Layout = ({ children }) => {
    if (user.isLoggedIn()) {
        return (
            <div className="container">
                {children}
            </div>
        )
    } else {
        return (<Navigate to='/'></Navigate>)
    }
}

export default Layout;