import React from 'react';
import './BuildControl.css';
import { Button } from 'react-bootstrap';


const buildControl = (props) => {
    return (
        <div className="row">
            <p className="col-lg-2 col-md-2 offset-lg-3">
                <strong>{props.label}</strong>
            </p>
            <p className="col-lg-2 col-md-2 offset-lg-3">
                <Button onClick={props.added} className="btn btn-xs btn btn-primary"><span className="glyphicon glyphicon-plus"></span>Add more</Button>
            </p>
            <p className="col-lg-1 col-md-1">
                <Button onClick={props.removed} disabled={props.disabled} className="btn btn-xs btn btn-danger"><span className="glyphicon glyphicon-minus"></span>Reduce</Button>
            </p>
        </div>
    );
};

export default buildControl;