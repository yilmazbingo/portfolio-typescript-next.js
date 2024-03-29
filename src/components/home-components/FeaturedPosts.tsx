import { IBlog } from "@/types/interfaces";
import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import Divider from "./divider";
import Link from "next/link";

interface FeaturedPostsProps {
  posts: IBlog[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <div style={{ backgroundColor: "#336699" }}>
      <Divider />

      <Container
        style={{
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            color: "red",
            marginBottom: "1.5rem",
          }}
        >
          <h1 style={{ textAlign: "center", color: " rgb(255, 251, 7)" }}>
            FEATURED POSTS
          </h1>
        </div>
        <Row>
          {posts &&
            posts.map((post) => (
              <Col key={post._id} xs="auto" md={3}>
                {" "}
                <Link href={`/blogs/${post.slug}`}>
                  <a style={{ borderRadius: "1rem" }}>
                    <ListGroup style={{ marginBottom: "2rem" }}>
                      <ListGroup.Item
                        style={{
                          backgroundColor: "blue",
                        }}
                      >
                        <Image
                          fluid
                          src={post.image}
                          style={{ height: "22rem", width: "100%" }}
                        ></Image>
                        <ListGroup.Item
                          style={{
                            height: "4rem",
                            paddingBottom: "2rem",
                            overflowWrap: "break-word",
                            backgroundColor: "black",
                          }}
                        >
                          <Row>
                            <Col>
                              <div>
                                {" "}
                                <h5> {post.title} </h5>
                              </div>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup.Item>
                    </ListGroup>
                  </a>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
      <Divider />
    </div>
  );
};
export default FeaturedPosts;
