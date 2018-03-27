import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Users from './Users';
import Login from './Login';
import Registration from './Registration';
import Navbar from './Navbar';
import PostShow from './PostShow';
import PostAll from './PostAll';
import PostAdd from './PostAdd';
import PostEdit from './PostEdit';
import MyPostAll from './MyPostAll';

export default class Example extends Component {
    render() {
        return (
            <div>
                Main page
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Example} />
                <Route exact path='/registration' component={Registration} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/posts' component={PostAll} />
                <Route exact path='/posts/create' component={PostAdd} />
                <Route exact path='/posts/:id' component={PostShow} />
                <Route exact path='/posts/:id/edit' component={PostEdit} />
                <Route exact path='/me/posts' component={MyPostAll} />
            </Switch>
        </div>
        
    </Router>, document.getElementById('root')
    );
 }
