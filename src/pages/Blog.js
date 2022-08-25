import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "../components/Article";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };
  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Nom" />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {error && <p>Veillez écrire un minimum de 140 caractères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData.map((article) => (
          <Article />
        ))}
      </ul>
    </div>
  );
};

export default Blog;
