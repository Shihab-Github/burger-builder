import React from 'react';

const welcome = (props) => {
    return (
        <div>
            <p>Welcome {props.user}</p>
            <main>{props.children}</main>
        </div>

    );
}

export default welcome;