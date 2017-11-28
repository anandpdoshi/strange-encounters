import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Login from '../login';
import Register from '../register';
import Feed from '../feed';
import requireAuthentication from '../../modules/authCheck';

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/about-us">About</Link>
        </header>

        <main>
            <Route exact path="/" component={ Home } />
            <Route exact path="/feed" component={ requireAuthentication(Feed) } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/about-us" component={ About } />
        </main>
    </div>
);

export default App;
