import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';
import { browserHistory } from 'react-router';
import http from '../utils/http';
import API_BASE_URL from "../utils/constants"


class LoginPage extends React.Component {

    constructor(props, context){
        super(props, context);
        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }
        this.state = {
            errors: {},
            successMessage,
            user: {email: '', password: ''}
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser= this.changeUser.bind(this);
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        //const bcrypt = require('bcryptjs');
        //const salt = bcrypt.genSaltSync(10);
        //const hashPassword = bcrypt.hashSync(this.state.user.password, salt);
        const body = {email: this.state.user.email, password: this.state.user.password};
        http.post(`${API_BASE_URL}/login`, body).then(
            (rep) => {
                this.setState({ errors: {} });
                Auth.authenticateUser(rep.token);
                this.props.handleLogIn();
                browserHistory.push('/frt/dashboard');
            },
            error => {
                console.error("LOGIN ERROR", error);
                const errors = error.errors;
                errors.summary = error.message;
                this.setState({errors});
            }
        );

    };

    changeUser(event){
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({user});
    };

    render(){
        return(
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
            />
        );
    }
}

export default LoginPage;