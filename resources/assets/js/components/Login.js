import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',  
            },
        }
        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    componentDidMount(){
        if(localStorage.getItem('token')){
            this.props.history.push(`/`);
        }
    }

    submit(e){
        e.preventDefault();

        let data = JSON.stringify({
            password: this.state.user.password,
            email: this.state.user.email
        })

        axios.post(`/api/auth`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("id", res.data.user.id);
            localStorage.setItem("token", res.data.token);
            this.props.history.push(`/`);
        })
    }

    handleInput(key, e) {
        var state = {...this.state.user}; 
        state[key] = e.target.value;
        this.setState({user: state });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input value={this.state.user.email} onChange={(e)=>this.handleInput('email',e)} type="email" placeholder="email"></input> <br/>
                    <input value={this.state.user.password} onChange={(e)=>this.handleInput('password',e)} type="password" placeholder="password"></input> <br/>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

