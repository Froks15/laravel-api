import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'



export default class CategoriesAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            role: 'user',
            categories: [],
        }
        this.requestCategories = this.requestCategories.bind(this);
        this.delCategory = this.delCategory.bind(this);
    }

    delCategory(id) {
        axios.delete('/api/categories/' + id, { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
        .then((response) => {
            this.requestCategories();
        }).catch((error) => {

        })
    }

    requestCategories() {
        let self = this;
        axios.get('/api/categories')
            .then(function(data) {
                self.setState({
                    categories: data.data.categories.data,
                })
            }).catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.requestCategories();
        axios.get(`/api/isAdmin`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        })
        .then(res => {
            this.setState({role: res.data})
        })
    }


    render(){
        const {role} = this.state;
        const { categories } = this.state;

        return (
            <div>
                <h1>categories list:</h1>
                {categories.map((value, index) => {
                    return (
                        <div key={index}>
                            <div className="panel panel-default">
                                <div className="panel-heading">{ value.name }</div>
                                <div className="panel-body">
                                    { role == 'admin' ? <a onClick={()=>{this.delCategory(value.id)}}>delete</a> : null }
                                    <br/>
                                    { role == 'admin' ? <Link to={"/categories/"+value.id+"/edit" }>edit</Link> : null }
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}

