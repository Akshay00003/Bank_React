import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./Admin.module.scss";

const Admin = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.log("no cookie");
        // navigate("/");
      }
      const { data } = await axios.post(
        "http://localhost:4000/admin",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status ? null : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  const viewUsers = () => {
    axios.get("http://localhost:4000/users").then((result) => {
      console.log(result.data);
      setUsers(result.data);
    });
  };
  const handleDeactivate=(userId)=>{
    axios.post('http://localhost:4000/user/'+userId)
    .then(result=>console.log(result.data))
  }
  const handleDelete=(userId)=>{
    axios.delete('http://localhost:4000/user/'+userId)
    .then(window.location.reload())

  }
  return (
    <div className={styles.container}>
      <div className={styles.admin}>
        <h1>{username}</h1>
        <button onClick={Logout}>Log Out</button>
      </div>
      <div className={styles.users}>
        <button onClick={viewUsers}>View Users</button>
        {users &&
          users.map((user) => (
            <div key={user._id} className={styles.user}>
              <h4>Name :{user.username} </h4>
              <h5>Amount : {user.account}</h5>
              <h5>Email : {user.email}</h5>
              <h5>Status : {user.status ? "active" : "inactive"}</h5>
              <button onClick={()=>handleDeactivate(user._id)}>Deactivate</button>
              <button onClick={()=>handleDelete(user._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Admin;
