import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from '../layouts/Main';
import { getPosts } from '../services/contentful.service';
import PostCell from '../components/Blog/PostCell';
import MailchimpSubscribe from "react-mailchimp-subscribe"


const CustomMailChimpForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <div>
      {status === "sending" && <div>sending...</div>}
      {status === "error" && (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
   
      <br />
      <button onClick={submit}>
        Submit
      </button>
    </div>
  );
};


export class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      posts: []
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    const postsPraser = (items) => items.map(item => {
      let newitem = item.fields;
      newitem.image = item.fields.heroImage.fields.file['url']
      newitem.id = item.sys.id;
      return newitem;
    });

    getPosts()
    .then(response => {
      this.setState({
        posts: postsPraser(response.items),
        isLoaded: true,
      });
    })
  }

  render(){
    const { isLoaded, posts } = this.state;
    return (
      <Main>
        <Helmet title="Blog" />
        <article className="post" id="blog">
          <header>
            <div className="title">
              <h2><Link to="/blog">Blog</Link></h2>
              <p>Combination of findings and tutorials</p>
              <div>
                <h4> Subscribe to my news letter </h4>
                <MailchimpSubscribe
                url={MAILCHIMP_URL}
                render={({ subscribe, status, message }) => (
                  <CustomMailChimpForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                  />
                )}
                />
              </div>
            </div>
          </header>
          
          {isLoaded? ( posts.map(post => (
                <PostCell
                  data={post}
                  key={post.id}
                />))): (<h3> loading ... </h3>) }
        </article>
      </Main>
    );
  }
}

export default Blog;

