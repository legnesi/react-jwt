import React from 'react';
import Dashboard from '../components/Dashboard.jsx';
import http from '../utils/http';
import API_BASE_URL from "../utils/constants"

class DashboardPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        this.state = {
            secretData: ''
        };
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentWillMount() {
        http.get(`${API_BASE_URL}/dashboard`).then(
            (message) => {
                this.setState({secretData : message});
            }
        ).catch(error => {
            console.error("error HTTP: ", error)
        });
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <Dashboard secretData={this.state.secretData} />
        );
    }

}

export default DashboardPage;