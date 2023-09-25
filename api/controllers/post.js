import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  // Getting all posts with and without a category
  const cat = req.query.cat;
  const q = cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

  db.query(q, [cat], (err, data) => {
    if (err) return res.status(500).data(err);
    if (data.length) return res.status(200).json(data);
    if (data.length === 0) return res.status(409).json("No Posts");
  });
};

export const getPost = (req, res) => {
  //Getting a single post details through id
  const q =
    "SELECT p.id, `username`,`email`, `title`, `desc`, p.img, u.image AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

  const id = req.params.id.substring(1);

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data[0]);
    console.log(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    console.log(values);

    db.query(q, [values], (err, data) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  // Verifying jwt
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated");

  jwt.verify(token, "jwtkey", (err, data) => {
    if (err) return res.status(403).json("Token is not valid!");

    //Deleting the post with the id
    const id = req.params.id.substring(1);
    const q = "DELETE FROM posts WHERE `id`=? and `uid`=? ";
    db.query(q, [id, data.id], (err, data) => {
      if (err) return res.status(403).json("You cannot delete someones post");

      return res.status(200).json("Post has been successfully deleted");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err.response.data);
      return res.json("Post has been updated.");
    });
  });
};
