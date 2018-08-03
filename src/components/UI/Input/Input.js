import React from 'react';

const input = (props) => {
    let inputElement = null;
    let errorSpan = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className="form-control" {...props.elementConfig} value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} {...props.elementConfig} value={props.value} />
            break;
        case 'select':
            let options = [];
            for (let i = 0; i < props.elementConfig.options.length; i++) {
                const option = <option key={props.elementConfig.options[i].value} value={props.elementConfig.options[i].value}>
                                    {props.elementConfig.options[i].displayValue}
                                </option>
                options.push(option);
            }
            inputElement = <select onChange={props.changed} className="form-control">
                                {options}
                            </select>
            break;
        default:
            inputElement = <input onChange={props.changed} className="form-control" {...props.elementConfig} value={props.value} />
            break;
    }
    if(props.rules && props.rules.required && !props.value){
        errorSpan = (
            <span className="pull-right error-text"><small>required*</small></span>
        );
    }
    else if(props.rules && props.rules.isEmail && !props.valid){
        errorSpan = (
            <span className="pull-right error-text"><small>invalid*</small></span>
        );
    }
    else if(props.rules && props.rules.minLength && !props.valid){
        errorSpan = (
            <span className="pull-right error-text"><small>invalid*</small></span>
        );
    }

    return(
        <div className="form-group">
            <label>{props.elementConfig.label}</label>
            {errorSpan}
            {inputElement}
        </div>
    )
};

export default input;