import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../contexts/authcontext";

const Single = () => {
  const root = "http://localhost:8800/api/";
  const { currentUser } = useContext(AuthContext);
  const id = useLocation().pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(`${root}posts/${id}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${root}posts/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          <img
            className="logo"
            src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.email === post.email && (
            <div className="edit">
              <Link className="link" to="/write?id=3" state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <Link>
                <img src={Delete} alt="delete" onClick={handleDelete} />
              </Link>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {post.desc}
      </div>
      <Menu cat={post?.cat} />
    </div>
  );
};

export default Single;
