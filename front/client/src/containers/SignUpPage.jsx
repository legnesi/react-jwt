import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx'
import { browserHistory } from 'react-router';
import http from '../utils/http'
import API_BASE_URL from "../utils/constants"

class SignUpPage extends  React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            errors: {},
            user: {email: '', name: '', password: ''}
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();
        //const salt = bcrypt.genSaltSync(10);
        //const hashPassword = bcrypt.hashSync(this.state.user.password, salt);
        const body = {name: this.state.user.name, email: this.state.user.email, password: this.state.user.password};

        http.post(`${API_BASE_URL}/signUp`, body).then(
            (userResponse) => {
                this.setState({errors: {} });
                // make a redirect
                browserHistory.push('/frt/login');
            },
            error => {
                console.error("HTTP ERROR", error);
                const errors = error.errors;
                errors.summary = error.message;
                this.setState({errors});
            }
        ).catch(error => {
            console.error("error HTTP: ", error);
        });
    };

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({user});
    };

    render() {

        return(
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );

    }
}

export default SignUpPage;
