import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Logo />
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </div>
            </div>
        </nav>
    )
};

export default toolBar;