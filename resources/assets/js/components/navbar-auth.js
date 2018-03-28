import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

export default class Navbar_auth extends Component {

    constructor(props){
        super(props);
        this.state = {
            role: 'user'
        }
    }

    logout(){
        localStorage.clear();
        axios.get('/logout')
        .then((response) => {})
        .catch((err) => {})
    }

    componentDidMount(){
        axios.get(`/api/isAdmin`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.setState({role: res.data})
        })
    }

    render() {
        const {role} = this.state;
        let name = localStorage.getItem('name');
        return (
                <ul className="nav navbar-nav navbar-right">
                    {role == 'admin' ? <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/categories">
                                    All category
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories/create">
                                    Create category
                                </Link>
                            </li>
                        </ul>
                    </li> : null}
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{name} <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">My profile</a></li>
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
