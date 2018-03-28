import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class UserShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('/api/users', { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
            .then(function(data) {
                self.setState({data})
            });
    }

    render(){
        const { data } = this.state
        return (
            (data ? <h1>{data.data.user.name}</h1>:"")
        )
    }
}


