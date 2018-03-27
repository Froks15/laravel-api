import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'



export default class PostEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            user_id: '',
            title: '',
            text: '',
            category_id: '',
            upd: false,
        },
        this.postUpdate = this.postUpdate.bind(this);
    }

    componentDidMount(){
        let self = this;
        let id = this.props.match.params.id;
        axios.get('/api/posts/' + id)
            .then(function(data) {
                self.setState({
                    id: data.data.id,
                    title: data.data.title,
                    text: data.data.text,
                    user_id: data.data.user_id,
                    category_id: data.data.category_id,
                })
            });
    }

    handleInput(key, e) {
        var state = this.state; 
        state[key] = e.target.value;
        this.setState({state: state });
    }

    postUpdate(e){
        e.preventDefault();

        this.setState({
            upd: false
        })

        let data = JSON.stringify({
            title: this.state.title,
            text: this.state.text,
            user_id: this.state.user_id,
            category_id: this.state.category_id,
        })

        axios.put(`/api/posts/+${this.state.id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.setState({
                upd: true
            })
        })
    }


    render(){
        const { id, title, text, user_id, category_id, upd } = this.state;
        return (
            <div className="col-lg-4 col-lg-offset-4">
            {upd ? <div className="alert alert-success" role="alert">Updating!</div> : null}
                <form className="bs-example" onSubmit={this.postUpdate}>
                    <div className="input-group col-lg-12">
                        <input className="form-control" placeholder="title" onChange={(e)=>this.handleInput('title',e)} value={title}></input> <br />
                    </div> <br/>
                    <div className="input-group col-lg-12" >
                        <textarea rows="10" className="form-control" placeholder="text" onChange={(e)=>this.handleInput('text',e)} value={text}></textarea> <br />
                    </div> <br/>
                    <div className="input-group col-lg-12">
                        <input className="btn btn-primary btn-block" type="submit" value="edit"></input>
                    </div> <br/>
                </form>
            </div>
        )
    }

}

