import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'



export default class PostEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            upd: false,
        },
        this.categoryUpdate = this.categoryUpdate.bind(this);
    }

    componentDidMount(){
        let self = this;
        let id = this.props.match.params.id;
        axios.get('/api/categories/' + id)
            .then(function(data) {
                self.setState({
                    id: data.data.id,
                    name: data.data.name,
                })
            });
    }

    handleInput(key, e) {
        var state = this.state; 
        state[key] = e.target.value;
        this.setState({state: state });
    }

    categoryUpdate(e){
        e.preventDefault();

        this.setState({
            upd: false
        })

        let data = JSON.stringify({
            id: this.state.id,
            name: this.state.name,
        })

        axios.put(`/api/categories/+${this.state.id}`, data, {
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
        const { id, name, upd } = this.state;
        return (
            <div className="col-lg-4 col-lg-offset-4">
            {upd ? <div className="alert alert-success" role="alert">Updating!</div> : null}
                <form className="bs-example" onSubmit={this.categoryUpdate}>
                    <div className="input-group col-lg-12">
                        <input className="form-control" placeholder="name" onChange={(e)=>this.handleInput('name',e)} value={name}></input> <br />
                    </div> <br/>
                    <div className="input-group col-lg-12">
                        <input className="btn btn-primary btn-block" type="submit" value="edit"></input>
                    </div> <br/>
                </form>
            </div>
        )
    }

}

