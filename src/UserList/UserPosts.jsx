import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

const UserPosts = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectecCountry] = useState(null);
  const [isCountry, isSetCounrty] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [updateEnabled, setUpdateEnabled] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      let details = response?.data?.filter((val) => val?.id == userId);
      setUserData(details);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const fetchpostData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      let details = response?.data?.filter((val) => val?.userId == userId);
      setPostData(details);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const fetchingCountry = async () => {
    try {
      const response = await axios.get("http://worldtimeapi.org/api/timezone");
      const options = response?.data?.map((countryValue) => ({
        value: countryValue,
        label: countryValue.split("/").pop(),
      }));
      isSetCounrty(options);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const fetchingCountryTime = async () => {
    try {
      const response = await axios.get(
        `http://worldtimeapi.org/api/timezone/${
          selectedCountry === null
            ? "America/Argentina/Salta"
            : selectedCountry?.value
        }`
      );

      const dateObject = new Date(response?.data?.datetime);
      const utcTime = dateObject.getTime();
      const timezoneOffsetInMinutes = dateObject.getTimezoneOffset();
      const localTime = new Date(utcTime + timezoneOffsetInMinutes * 60000);
      const hours = localTime.getHours();
      const minutes = localTime.getMinutes();
      const seconds = localTime.getSeconds();
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    fetchingCountryTime();
    const intervalId = setInterval(() => {
      if (updateEnabled) fetchingCountryTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [selectedCountry, currentTime, updateEnabled]);

  useEffect(() => {
    fetchuserData();
    fetchpostData();
    fetchingCountry();
  }, [userId]);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };
  const handleStopButtonClick = () => {
    setUpdateEnabled(false);
  };

  const handleStartButtonClick = () => {
    setUpdateEnabled(true);
  };

  return (
    <div className="px-6">
      <div className="flex m-3 h-full justify-between">
        <button
          className="border border-current h-8 w-12 rounded-md bg-slate-400"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <h1 className="font-extrabold">Profile Page</h1>
        <div className="flex gap-2">
          <Select
            value={selectedCountry}
            onChange={(val) => setSelectecCountry(val)}
            options={isCountry}
            className="w-[200px]"
            placeholder={"Select Country"}
          />
          <div className="w-[150px] bg-slate-400 p-2 border border-current rounded-md">
            Time : {currentTime}
          </div>
          <button
            className="border border-current rounded-md p-1"
            onClick={handleStopButtonClick}
          >
            Pause
          </button>
          <button
            className="border border-current rounded-md p-1"
            onClick={handleStartButtonClick}
          >
            Start
          </button>
        </div>
      </div>
      <div className="flex h-24 border border-current justify-between px-4 rounded-2xl">
        <div className="p-2">
          <p className="">Name : {userData[0]?.name}</p>
          <p className="">Username : {userData[0]?.username}</p>
          <p>Catch phrase : {userData[0]?.company?.catchPhrase}</p>
        </div>
        <div className="p-2">
          <p className="">Address : {userData[0]?.address?.city}</p>
          <p className="">Email : {userData[0]?.email}</p>
          <p className="">Phone : {userData[0]?.phone}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 px-5 py-5">
        {postData?.map((val) => {
          return (
            <>
              <div
                className="p-4 text-center border border-current rounded-lg"
                onClick={() => openModal(val)}
              >
                <p className="font-bold">Title : {val?.title}</p>
                <p>Content : {val?.body}</p>
              </div>
            </>
          );
        })}
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-70">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
            <p>{selectedItem.body}</p>
            <button
              className="mt-4  p-2 border border-current rounded-md bg-slate-400"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
