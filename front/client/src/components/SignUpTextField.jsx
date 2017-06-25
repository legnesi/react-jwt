import React from 'react';
import TextField from 'material-ui/TextField';

class SignUpTextField extends React.Component {

    render() {
        const {label, name, onChange, error, value, type} = this.props;

        return(
            <div className="field-line">
                <TextField
                    floatingLabelText={label}
                    name={name}
                    errorText={error}
                    onChange={onChange}
                    value={value}
                    type={ type? type :"text"}
                />
            </div>

        );
    }
}

export default SignUpTextField;