import React, { useState } from "react";
import styles from "./Home.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [adminToggle, setAdminToggle] = useState(true);
  const [userToggle, setUserToggle] = useState(true);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [userEmail, setUserEmail] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  console.log(userEmail);
  console.log(userPassword);
  const { email, username, password } = inputValues;
  const handleAdminValues = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);
  };
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/login",
        { inputValues },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        navigate("/admin");
      } else {
        alert("you email or password is Incorrect");
      }
      console.log(success, message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdminSingUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/signup",
        { inputValues },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        navigate("/user");
      } else {
        alert(`${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserSignUp = async (e) => {
    e.preventDefault();
    // const formData=new FormData()
    // formData.append("email",userEmail)
    // formData.append("password",userPassword)
    // formData.append("username",userUsername)
    // console.log(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        { username: userUsername, password: userPassword, email: userEmail },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        navigate("/user");
      } else {
        alert(`${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        { password: userPassword, email: userEmail },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        navigate("/user");
      } else {
        alert("your email or password is incorrect");
      }
      console.log(success,message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      {adminToggle ? (
        <div className={styles.admin}>
          <h1>Admin Login</h1>
          <form className={styles.adminForm} action="">
            <label>Email</label>
            <input
              onChange={handleAdminValues}
              name="email"
              value={email}
              type="email"
            />
            <label>password</label>
            <input
              onChange={handleAdminValues}
              name="password"
              value={password}
              type="text"
            />
            <button onClick={handleAdminLogin}>Submit</button>
            <p onClick={() => setAdminToggle(false)}>signup for new Admin</p>
          </form>
        </div>
      ) : (
        <div className={styles.admin}>
          <h1>Admin sing up</h1>
          <form className={styles.adminForm} action="">
            <label>Email</label>
            <input
              onChange={handleAdminValues}
              name="email"
              value={email}
              type="email"
            />
            <label>Username</label>
            <input
              onChange={handleAdminValues}
              name="username"
              value={username}
              type="text"
            />
            <label>password</label>
            <input
              onChange={handleAdminValues}
              name="password"
              value={password}
              type="text"
            />
            <button onClick={handleAdminSingUp}>Submit</button>
            <p onClick={() => setAdminToggle(true)}>Back to admin login</p>
          </form>
        </div>
      )}
      {userToggle ? (
        <div className={styles.user}>
          <h1>User Login</h1>
          <form className={styles.userForm} action="">
            <label>Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
            />

            <label>password</label>
            <input
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              type="text"
            />
            <button onClick={handleUserLogIn}>Submit</button>
            <p onClick={() => setUserToggle(false)}>signup for new user</p>
          </form>
        </div>
      ) : (
        <div className={styles.user}>
          <h1>User sign up</h1>
          <form className={styles.userForm} action="">
            <label>Email</label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
            />
            <label>Username</label>
            <input
              value={userUsername}
              onChange={(e) => setUserUsername(e.target.value)}
              type="text"
            />
            <label>password</label>
            <input
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              type="text"
            />
            <button onClick={handleUserSignUp}>Submit</button>
            <p onClick={() => setUserToggle(true)}>Back to user login</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
