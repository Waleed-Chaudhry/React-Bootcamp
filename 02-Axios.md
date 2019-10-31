# Axios

### Handling a GET request

#### Container
```JSX
/*
 * The container has the state to hold the response of the GET
 * The state also holds which data item to display, and any errors returned from the GET
 * Passes the state as a prop to a functional component to render the JSON
 */
import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [], //To store the posts returned by the GET
        selectedPostId: null, //To select a particular post
        error: false //To handle the error from the axios get
    }

    componentDidMount () {
        // Only doing a GET the first time component is created
        axios.get( '/posts' )
            .then( response => {
                // Limiting response to 4 elements
                const posts = response.data.slice(0, 4);
                // Set the posts object in the state
                this.setState({posts: posts});
            } )
            .catch(error => {
                // Set the error object in the state
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // Set the state to display a selected post in addition to all the posts
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        // Set a value of posts assuming there is an error
        if (!this.state.error) {
            // Overwrite posts if the GET returns data, and doesn't error out
            posts = this.state.posts.map(post => {
                /* Passing the data to a list of components */
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return (
            <div>
                <section className="Posts">
                    {/* All the posts */}
                    {posts}
                </section>
                {/* Just the selected Post */}
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
            </div>
        );
    }
}

export default Blog;
```

#### Component
```JSX
import React from 'react';

import './Post.css';

const post = (props) => (
    // Click listener
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default post;
```

### Calling a GET whenever a component updates
```JSX
componentDidUpdate () {
    if ( this.props.id ) {
        /* To prevent an infinte call loop */
        if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
            // The infinte call loop happens because the component updates when the response returns 
            // That return causes the GET request to be sent again, since the component updates
            // When that request is sent, and before it returns, the state is temporaily undefined (i.e. it's waiting for the response
            // That causes the state to be updated, and hence the component to be updated
            // Component then updates again when the data is returned
            // And this keeps repeating forever
            axios.get( '/posts/' + this.props.id )
                .then( response => {
                    this.setState( { loadedPost: response.data } );
                } );
        }
    }
}

/* Displaying different things in the post object at various stages to the async GET return values */
render () {
    // Before the GET is invoked
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    // After props.id has returned i.e. we've selected a post, but the full data hasn't returned
    if ( this.props.id ) {
        post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        /* Can instead assign <Spinner/> to post variable */
    }
    // Full data has been returned, and is thus rendered to the DOM
    if ( this.state.loadedPost ) {
        post = <FullPost />
    }
    return post;
}
```

#### Spinner
```JSX
import React from 'react';

// Get CSS from: https://projects.lukehaas.me/css-loaders/
import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;
```

### Getting Axios Defaults
```JSX
// These are set on index.js before ReactDOM.render( <App />, document.getElementById( 'root' ) );

/* Axios Defauls */
// All axios requests that don't explicity overwrite these params use these defaults */
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* Interceptors */
// Can intercept all axios requests and print them, or append something to them this way 
axios.interceptors.request.use(request => {
    console.log(request);
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

// Copy paste the above with request replaced with response to handle responses i.e. GETs
```

#### Other notes
* npm install axios --save
* Another common place to call an endpoint is in the body of click listner handler
