import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
            },
        }
    }

    componentDidMount(){
        let self = this;
        let id = this.props.match.params.id;
        axios.get('/api/users/' + id, { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
            .then(function(data) {
                self.setState({
                   user: {
                        name: data.data.user.name,
                        email: data.data.user.email,
                   }
                })
            });
    }

    render(){
        const { user } = this.state
        return (
            (user ? 
            <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
            :"")
        )
    }
}


