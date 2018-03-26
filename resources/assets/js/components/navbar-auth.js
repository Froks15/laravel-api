import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

export default class Navbar_auth extends Component {
    logout(){
        localStorage.clear();
        axios.get('/logout')
        .then((response) => {})
        .catch((err) => {})
    }

    render() {
        let name = localStorage.getItem('name');
        return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Link</a></li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{name} <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">My profile</a></li>
                            <li><a href="#">Another action</a></li>
                            <li role="separator" className="divider"></li>
                            <li>
                                <Link to="/" onClick={this.logout}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
        );
    }
}
