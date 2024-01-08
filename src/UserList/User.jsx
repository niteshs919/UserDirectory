import axios from "axios";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUserData(response?.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const fetchpostData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPostData(response?.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  useEffect(() => {
    fetchuserData();
    fetchpostData();
  }, []);
  const userIdCountMap = {};
  postData.forEach(obj => {
    const userId = obj.userId;
    userIdCountMap[userId] = (userIdCountMap[userId] || 0) + 1;
  });
  
  const userIdCountArray = Object.keys(userIdCountMap).map(userId => ({
    userId,
    count: userIdCountMap[userId]
  }));
  return (
    <>
      <UserList userData={userData} userIdCountArray={userIdCountArray} />
    </>
  );
};

export default User;
