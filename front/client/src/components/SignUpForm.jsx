import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import SignUpTextField from './SignUpTextField.jsx';

class SignUpForm extends React.Component {

    render() {
        const {onSubmit, onChange, errors, user} = this.props;

        return (
            <Card className="container">
                <form action="/" onSubmit={onSubmit}>
                    <h2 className="card-heading">Sign Up</h2>

                    {errors.summary && <p className="error-message">{errors.summary}</p>}

                    <SignUpTextField
                        label="Name"
                        name="name"
                        error={errors.name}
                        onChange={onChange}
                        value={user.name}
                    />

                    <SignUpTextField
                        label="Email"
                        name="email"
                        error={errors.email}
                        onChange={onChange}
                        value={user.email}
                    />

                    <SignUpTextField
                        label="Password"
                        name="password"
                        error={errors.password}
                        type="password"
                        onChange={onChange}
                        value={user.password}
                    />

                    <div className="button-line">
                        <RaisedButton type="submit" label="Create New Account" primary />
                    </div>

                    <CardText>Already have an account? <Link to={'/frt/login'}>Log in</Link></CardText>
                </form>
            </Card>
        );
    }
}


export default SignUpForm;