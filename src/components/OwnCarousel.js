import React from 'react';
import {Row, Col, Carousel } from 'react-bootstrap';
import postImg from '../img/post1.jpg';

function OwnCarousel({posts}){
    return(
    <Carousel indicators={false}>
        {
            posts.map((post, index)=>{
                const fixed = post.content.replace(/<br\s*\\?>/g, "\r\n");

                return(
                    <Carousel.Item key={post.id+index}>
                        <article>
                            <Row>
                            <Col md={6} className="pr-0">
                                <div>
                                <Carousel.Caption>
                                    <h3>{post.title}</h3>
                                    <div className="content">
                                    {fixed.split(/[\r\n]+/).map((line,i) => <p key={post.id+i}>{line}</p>)}
                                    </div> 
                                </Carousel.Caption>
                                </div>              
                            </Col>
                            <Col md={6} className="pl-0">
                                <img src={postImg} alt="car interior" />
                            </Col>
                            </Row>
                        </article>
                    </Carousel.Item>
                )
            })
        }
    </Carousel>  
    );
}

export default OwnCarousel;

