import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

export default class Navbar_guest extends Component {

    render() {
        return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Guest <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li role="separator" className="divider"></li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/registration">
                                    Registration
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
        );
    }
}
