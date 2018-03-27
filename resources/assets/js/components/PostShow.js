import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'


export default class PostShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            user_id: '',
            title: '',
            text: '',
            deleted: false,
            comments: [],
            newComment: {
                text: '',           
            },
            test: false
        }
        this.postRemove = this.postRemove.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.requestComments = this.requestComments.bind(this);
        this.delComment = this.delComment.bind(this);
    }

    componentDidMount(){
        this.requestComments();
    }

    requestComments() {
        let self = this;
        let id = this.props.match.params.id;
        axios.get('/api/posts/' + id)
            .then(function(data) {
                self.setState({
                    id: data.data.id,
                    title: data.data.title,
                    text: data.data.text,
                    user_id: data.data.user_id,
                    comments: data.data.comments,
                })
            });
    }

    postRemove() {
        axios.delete('/api/posts/' + this.state.id, { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            this.setState({
                deleted: true
            })
        }).catch((error) => {

        })
    }

    handleInput(key, e) {
        var state = {...this.state.newComment}; 
        state[key] = e.target.value;
        this.setState({newComment: state });
    }

    delComment(id) {
        axios.delete('/api/comments/' + id, { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            this.requestComments();
        }).catch((error) => {

        })
    }

    addComment(e) {
        e.preventDefault();
        let post_id = this.props.match.params.id;

        let data = JSON.stringify({
            text: this.state.newComment.text,
            user_id: localStorage.getItem('id'),
            post_id: post_id
        })

        axios.post(`/api/comments`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.setState({
                newComment: {
                    text: ''
                }
            })
            this.requestComments();
        })

    }


    render(){
        const { id, title, text, user_id, deleted, comments } = this.state;
        const editPost = user_id == localStorage.getItem('id') ? <Link to={"/posts/"+id+"/edit"}>Edit</Link> : null;
        const removePost = user_id == localStorage.getItem('id') ? <a onClick={this.postRemove}>remove</a> : null;
        if(deleted){
            return (
                <div>
                    Post success deleted!
                </div>
            )
            
        }else {
            return (
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">{title}</div>
                        <div className="panel-body">
                            {text}
                        </div>
                        <div className="panel-body">
                        {editPost} <br/>
                        {removePost} <br/>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <form onSubmit={this.addComment}>
                            <div className="form-group">
                                <label htmlFor="InputText">Comment</label> <br/>
                                <textarea onChange={(e)=>this.handleInput('text',e)} className="form-control" id="InputText" value={this.state.newComment.text}></textarea> <br/>
                                <input className="btn btn-primary" type="submit" value="add comment"></input>
                            </div>
                        </form>
                    </div>
                    <hr/>
                    {comments.map((value, index) => {
                    return (
                        <div key={index}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    { value.user_id } <br/>
                                    { value.text } <br/>
                                    { localStorage.getItem('id') == value.user_id ? <button onClick={()=>{this.delComment(value.id)}}>delete</button> : null }
                                </div>
                            </div>

                        </div>
                    )
                })}
                </div>
            )
        }
    }
}

