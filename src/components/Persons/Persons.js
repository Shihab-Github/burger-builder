import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
    return (
        props.persons.map((person, index) => { 
            return <Person 
            deletePerson={() => props.deletePerson(index)} 
            name={person.name} 
            age={person.age} 
            changeName={(event) => props.changeName(event, person.id)}
            key={person.id} />
         })
    );
}

export default persons;