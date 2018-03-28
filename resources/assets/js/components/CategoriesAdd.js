import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';

export default class CategoriesAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            newCategory: {
                name: ''
            },
        }
        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    submit(e){
        e.preventDefault();

        let data = JSON.stringify({
            name: this.state.newCategory.name,
        })
        axios.post(`/api/categories`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.props.history.push(`/categories`);
        })
    }

    handleInput(key, e) {
        var state = {...this.state.newCategory}; 
        state[key] = e.target.value;
        this.setState({newCategory: state });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input placeholder="category name" value={this.state.newCategory.name} onChange={(e)=>this.handleInput('name',e)}></input> <br/>
                    <input type="submit" value="Add category" />
                </form>
            </div>
        )
    }
}

