import React, {useState, useEffect} from 'react';
import API from './utils/Api';

import './scss/custom-bootstrap.scss';
import './scss/App.scss';

import {Container, Row, Col } from 'react-bootstrap';
import OwnCarousel from './components/OwnCarousel';
import MyForm from './components/MyForm';

import logo from './img/logo.svg';
import banner from './img/banner.jpg';
import postImg from './img/post1.jpg';

var postLimit = 10;
var page = 1;

async function getPost(setPosts){
  try {
    const response = await API.get("/posts?_page="+ page +"&_limit="+postLimit)
    setPosts(response.data);
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
  }
}

function App() {
  const [posts, setPosts] = useState(false);

useEffect(() => {
  getPost(setPosts);
}, []);

  
  return (
    <div>
      <header className="App-header">
        <Row>
          <a className="logo" href="./" >
            <img src={logo} alt="logo" />
          </a>
        </Row>
        <Row className="banner">
          <Container>
          <Col md={12}>
            <h1>Lorem ipsum dolor <br/>sit amet</h1>
          </Col>
          </Container>
          <img src={banner} alt="logo" />
        </Row>
      </header>
      <main className="container">
        <Row className="first">
          <Col md={6} className="pr-md-0">
            <img src={postImg} alt="car interior" />
          </Col>
          <Col md={6}>
            <div>
              <h2>LOREM IPSUM</h2>
              <p className="content">
              Excepteur sint occaecat cupidatat non
              <br/>proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p> 
            </div>
          </Col>
        </Row>
        

        <div className="post-container">
          { posts ? <OwnCarousel posts={posts}/> : null }
        </div>
      </main>
      <footer>
        <Container>
          <MyForm/>
        </Container>    
      </footer>
    </div>
  );
}

export default App;
