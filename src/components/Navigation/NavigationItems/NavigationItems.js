import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {
    let loginNav = null;
    if(props.isAuthenticated){
        loginNav = <NavigationItem link="/logout">Logout</NavigationItem>;
    }else{
        loginNav = <NavigationItem link="/auth">Register/Login</NavigationItem>;

    }
    return (
        <ul className="nav navbar-nav">
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null} 
            {loginNav}
        </ul>
    )
};

export default navigationItems;