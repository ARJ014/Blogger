import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState(state?.desc || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const root = "http://localhost:8800/api/";

  const handleChange = (e) => {
    setCat(e.target.value);
    console.log(cat);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${root}upload`, formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      const postInput = {
        title,
        cat,
        desc: value,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        img: file
          ? imgUrl
          : "https://img.freepik.com/free-photo/background_53876-32169.jpg?w=1060&t=st=1695678549~exp=1695679149~hmac=9d6b7c3c2cefc850fc1bc09efc3f3d095a001131f86dd3bebed477eb802b5369",
      };
      state
        ? await axios.put(
            `${root}posts/${state.id}`,
            {
              title,
              id: state.id,
              cat,
              decs: value,
              img: file
                ? imgUrl
                : "https://img.freepik.com/free-photo/background_53876-32169.jpg?w=1060&t=st=1695678549~exp=1695679149~hmac=9d6b7c3c2cefc850fc1bc09efc3f3d095a001131f86dd3bebed477eb802b5369",
            },
            { withCredentials: true }
          )
        : await axios.post(`${root}posts/`, postInput, {
            withCredentials: true,
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art"
              checked={cat === "art"}
              onChange={handleChange}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              id="science"
              checked={cat === "science"}
              onChange={handleChange}
            />
            <label htmlFor="art">Science</label>
          </div>{" "}
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              id="technology"
              checked={cat === "technology"}
              onChange={handleChange}
            />
            <label htmlFor="art">Technology</label>
          </div>{" "}
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              id="cinema"
              checked={cat === "cinema"}
              onChange={handleChange}
            />
            <label htmlFor="art">Cinema</label>
          </div>{" "}
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              id="design"
              checked={cat === "design"}
              onChange={handleChange}
            />
            <label htmlFor="art">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              id="food"
              checked={cat === "food"}
              onChange={handleChange}
            />
            <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
