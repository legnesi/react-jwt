/**
 * Created by usign on 11/04/17.
 */
import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';


const routes = {
    // base component (wrapper for the whole application).
    component: Base,
    childRoutes: [

        {
            path: '/frt',
            component: HomePage
        },

        {
            path: '/frt/login',
            component: LoginPage
        },

        {
            path: '/frt/dashboard',
            component: DashboardPage
        },

        {
            path: '/frt/signup',
            component: SignUpPage
        },

        {
            path: '/frt/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();
                replace('/frt');
            }
        }

    ]
};

export default routes;