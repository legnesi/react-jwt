import React, {PropTypes} from 'react'
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SignUpTextField from './SignUpTextField.jsx';

class LoginForm extends React.Component {

    render() {
        const {onSubmit, onChange, errors, user, successMessage} = this.props;

        return(
            <Card className="container">
                <form action="/" onSubmit={onSubmit}>
                    <h2 className="card-heading">Login</h2>

                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errors.summary && <p className="error-message">{errors.summary}</p>}

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
                        type="password"
                        error={errors.password}
                        onChange={onChange}
                        value={user.password}
                    />

                    <div className="button-line">
                        <RaisedButton type="submit" label="Log in" primary />
                    </div>

                    <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
                </form>
            </Card>
        );
    }
}


export default LoginForm;