import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';

export default class PostAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            newPost: {
                title: '',
                text: '',
                category_id: '',  
            },
        }
        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    submit(e){
        e.preventDefault();

        let data = JSON.stringify({
            title: this.state.newPost.title,
            text: this.state.newPost.text,
            user_id: localStorage.getItem('id'),
            category_id: this.state.newPost.category_id,
        })
        axios.post(`/api/posts`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.props.history.push(`/me/posts`);
        })
    }

    handleInput(key, e) {
        var state = {...this.state.newPost}; 
        state[key] = e.target.value;
        this.setState({newPost: state });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input placeholder="title" value={this.state.newPost.title} onChange={(e)=>this.handleInput('title',e)}></input> <br/>
                    <input placeholder="text" value={this.state.newPost.text} onChange={(e)=>this.handleInput('text',e)}></input> <br/>
                    <input placeholder="category_id" value={this.state.newPost.category_id} onChange={(e)=>this.handleInput('category_id',e)}></input> <br/>
                    <input type="submit" value="Add Post" />
                </form>
            </div>
        )
    }
}

