import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'



export default class MyPostAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('/api/myPosts', { headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}})
            .then(function(data) {
                self.setState({
                    posts: data.data.posts.data,
                })
            });
    }


    render(){
        const { posts } = this.state
        return (
            <div>
                {posts.map((value, index) => {
                    return (
                        <Link key={ index } to={"/posts/" + value.id}>
                            <div className="panel panel-default">
                                <div className="panel-heading">{ value.title }</div>
                                <div className="panel-body">
                                { value.text }
                                </div>
                            </div>
                        </Link>
                    )
                })}
                
            </div>
        )
    }
}

