import React from "react";
import { Container, PostForm } from "../components";
import appwriteSevices from "../appwrite/config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editpost() {
  const [post, setPosts] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteSevices.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
