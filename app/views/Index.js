import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Particles from 'react-particles-js';
 
const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">About this site</Link></h2>
          <p>A beautiful, responsive, react app written with modern Javascript.</p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/resume">resume</Link>, {' '}
        <Link to="/projects">projects</Link>, {' '}
        view <Link to="/stats">site statistics</Link>, {' '}
        or <Link to="/contact">contact</Link> me.
      </p>
      <p> Source available <a href="https://github.com/ealhomsi/ealhomsi.github.io">here</a>.</p>
    </article>
    <article id="mobile">
      <Particles 
        id="mobile"
        height="15rem"
        params={{
          particles: {
            line_linked: {
              shadow: {
                enable: true,
                color: "#333333",
                blur: 3,
                opacity: 0.1
              }
            }
          }
        }}
        style={{
          width: '100%'
        }}
      />
    </article>
  </Main>
);

export default Index;
