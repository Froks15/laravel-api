import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link, NavLink} from 'react-router-dom'
import Navbar_auth from './navbar-auth';
import Navbar_guest from './navbar-guest';

export default class Navbar extends Component {
    render() {
        let menu = localStorage.getItem('token') ? <Navbar_auth />:<Navbar_guest />;
        return (
            <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand">
                    React blog
                </Link>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Posts <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/posts">All posts</Link>
                        </li>
                        <li>
                            <Link to="/me/posts">My posts</Link>
                        </li>
                        <li>
                            <Link to="/posts/create">Create</Link>
                        </li>

                        <li role="separator" className="divider"></li>
                    </ul>
                    </li>
                </ul>
                {menu}
                </div>
            </div>
            </nav>
        );
    }
}
