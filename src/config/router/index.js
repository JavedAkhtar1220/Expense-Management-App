import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../containers/Home';
import Login from '../../containers/Auth/Login';
import Signup from '../../containers/Auth/Signup';
import AuthWith from '../../containers/Auth/AuthWith';
import Activity from '../../containers/Activity';
import AddItems from '../../containers/AddItems';
import History from '../../containers/History';

function AppRouter() {
    return (
        <Router >
            <Route exact component={Home} path='/' />
            <Route exact component={Login} path='/login' />
            <Route exact component={Signup} path='/signup' />
            <Route exact component={AuthWith} path='/authentication' />
            <Route exact component={Activity} path='/activity' />
            <Route exact component={AddItems} path='/additems' />
            <Route exact component={History} path='/history' />
        </Router>
    );
}

export default AppRouter;