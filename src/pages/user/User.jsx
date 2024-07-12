import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = async () => {
      const { data } = await axios.post("http://localhost:4000/user", {
        withCredentials: true,
      });
      const { status, user } = data;
      console.log(status,user);


    };
    username()
  },[]);
  return <div>user</div>;
};

export default User;
