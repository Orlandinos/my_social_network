import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import './profile.scss'
import CustomPanel from '../../elements/customPanel/CustomPanel';



const Profile = () => {

    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [age, setAge] = useState();
    const token = useSelector((state) => state.auth?.token);

    useEffect(() => {
        const fetchUserName = async () => {
            if (!token) {
                console.log("Токен отсутствует в Redux");
                return;
            }

            console.log("Токен найден:", token);

            try {
                const response = await axios.get("http://49.13.31.246:9191/me", {
                    headers: {
                        'x-access-token': token,
                    },
                });
                console.log("Ответ от сервера:", response.data);
                setFullName(response.data.fullName);
                setAvatar(response.data.avatar);
                setAge(response.data.age)
            } catch (error) {
                console.error("Ошибка при запросе данных:", error);
            }
        };

        fetchUserName();
    }, [token]);

    return (

        <div className="container">
            <div className='profile-container'>
                <div className="cover-image"></div>
                <div className="profile-content">
                    <div className="profile-image">
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <div className="profile-info">
                        <h2 className="name">{fullName} <FaCheckCircle className="verified" /></h2>
                        <p className="connections">250 connections</p>
                        <p className="details">
                            <span className="role">Front-end Developer</span>
                            <span className="location"><FaMapMarkerAlt /> from the server</span>
                            <span className="joined"><FaCalendarAlt /> Age - {age}</span>
                        </p>
                    </div>
                    {/* <button className="edit-profile">Edit profile</button> */}
                    
                </div>
                
                <div className='aboutMe'>
                    <CustomPanel />
                </div>
            </div>


        </div>
    );
};

export default Profile;


