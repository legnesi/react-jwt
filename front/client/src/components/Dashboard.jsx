import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {secretData} = this.props;

        return(
            <Card className="container">
                <CardTitle
                    title="Dashboard"
                    subtitle="You should get access to this page only after authentication."
                />

                {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
            </Card>
        );
    }
}


export default Dashboard;