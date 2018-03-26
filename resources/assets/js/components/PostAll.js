import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import {Link} from 'react-router-dom'



export default class PostAll extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('/api/posts')
            .then(function(data) {
                console.log(data.data.posts)
                self.setState({
                    posts: data.data.posts.data,
                })
            });
    }


    render(){
        const { posts } = this.state
        return (
            <div>
                <Navbar />
                {posts.map((value, index) => {
                    return (
                        <Link key={ index } to={"/posts/" + value.id}>
                            <h2 className='card-title'>{ value.title }</h2>
                            <p className='card-body'>{ value.text }</p>
                        </Link>
                    )
                })}
                
            </div>
        )
    }
}

