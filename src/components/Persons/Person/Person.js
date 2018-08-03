import React from 'react';
const person = (props) => {
    return (
        <div>
            <div className='card'>
                <div className='card-body'>
                    <p className='card-title' onClick={props.deletePerson} >{props.name}</p>
                    <p>I'm {props.age} years old.</p>   
                    <p>{props.children}</p>
                </div>
                <input type="text" className="form-control" onChange={props.changeName} />
             </div>
             <br />
        </div>
    )
};
 export default person;