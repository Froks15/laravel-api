import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';


export default class PostShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            text: '',
        }
    }

    componentDidMount(){
        let self = this;
        let id = this.props.match.params.id;
        axios.get('/api/posts/' + id)
            .then(function(data) {
                self.setState({
                    title: data.data.title,
                    text: data.data.text,
                })
            });
    }


    render(){
        const { title, text } = this.state
        return (
            <div>
                <Navbar />
                {title} <br/>
                {text}
            </div>
        )
    }
}

