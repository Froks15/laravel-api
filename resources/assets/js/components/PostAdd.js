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
            errors: [],
            categories: [],
        }
        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        axios.get('/api/categories').then((response) => {
            let categories = response.data;
            this.setState({categories});              
        }).catch((error) => {

        })
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
        }).catch(err => {
            console.log(err.response.data.errors)
            this.setState({
                errors: err.response.data.errors
            })
        })
    }

    handleInput(key, e) {
        var state = {...this.state.newPost}; 
        state[key] = e.target.value;
        this.setState({newPost: state });
    }

    render(){
        const {categories} = this.state;
        const { errors } = this.state
        return (
            <div>
                <div>
                {errors ? errors.map((value, index) => {
                    return (
                        <div key={index}>
                            {index}
                        </div>
                    )
                }): null}
                </div>
                <form onSubmit={this.submit}>
                    <input placeholder="title" value={this.state.newPost.title} onChange={(e)=>this.handleInput('title',e)}></input> <br/>
                    <textarea placeholder="text" value={this.state.newPost.text} onChange={(e)=>this.handleInput('text',e)}></textarea> <br/>
                    <div className='form-group'>
                                                <label htmlFor="category">Category</label>
                                                <select className="custom-select" id='category' onChange={(e)=>this.handleInput('category_id',e)}>
                                                    {
                                                        categories.map((value, index) => {
                                                            return (
                                                                <option value={value.id} key={value.id}>{value.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                    <input type="submit" value="Add Post" />
                </form>
            </div>
        )
    }
}

