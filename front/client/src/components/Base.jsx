import React from "react";
import {Link, IndexLink} from "react-router";
import http from "../utils/http";
import LoginPage from '../containers/LoginPage.jsx'
import API_BASE_URL from "../utils/constants"

class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = { authenticate: false };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogOut() {
        this.setState({authenticate:false})
    }

    handleLogIn() {
        this.setState({authenticate:true})
    }


    componentWillMount() {
        http.get(`${API_BASE_URL}/checkAuth`).then(
            (authenticate) => {
                this.setState({authenticate})
            }
        )
    }

    render() {
        const {children} = this.props;
        return(
            <div>
                <div className="top-bar">
                    <div className="top-bar-left">
                        <IndexLink to="/frt">React App</IndexLink>
                    </div>

                    { this.state.authenticate ? (
                            <div className="top-bar-right">
                                <Link onClick={ this.handleLogOut} to="/frt/logout">Log out</Link>
                            </div>
                        ) : (
                            <div className="top-bar-right">
                                <Link to="/frt/login">Log in</Link>
                                <Link to="/frt/signup">Sign up</Link>
                            </div>
                        )
                    }
                </div>

                {
                    React.Children.map(children, child => {
                        if (child) {
                            if(child.type === LoginPage) {
                                return React.cloneElement(child, {
                                    handleLogIn: () => this.handleLogIn()
                                })
                            } else {
                                return child
                            }
                        }
                    })
                }

            </div>
        );
    }
}


export default Base;