import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import './profile.scss'
import CustomPanel from '../../elements/customPanel/CustomPanel';

const Profile = () => {
    const token = useSelector((state) => state.auth?.token);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [age, setAge] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    // ✅ Загружаем основную информацию о пользователе
    useEffect(() => {
        const fetchProfileData = async () => {
            if (!token) {
                console.log("Токен отсутствует в Redux");
                return;
            }

            console.log("Токен найден:", token);

            try {
                // Загружаем данные пользователя
                const userResponse = await axios.get("http://49.13.31.246:9191/me", {
                    headers: { 'x-access-token': token },
                });

                console.log("Ответ от сервера (профиль):", userResponse.data);
                setFullName(userResponse.data.fullName);
                setAvatar(userResponse.data.avatar);
                setAge(userResponse.data.age);
                setUsername(userResponse.data.username); // ✅ Устанавливаем username

            } catch (error) {
                console.error("Ошибка при запросе данных профиля:", error);
            }
        };

        fetchProfileData();
    }, [token]);

    // ✅ Загружаем подписчиков и подписки после установки username
    useEffect(() => {
        if (!username || !token) return; // Ждём, пока username загрузится

        const fetchFollowData = async () => {
            try {
                // Загружаем количество подписчиков
                const followersResponse = await axios.get(`http://49.13.31.246:9191/followers/${username}`, {
                    headers: { 'x-access-token': token },
                });

                // Загружаем количество подписок
                const followingResponse = await axios.get(`http://49.13.31.246:9191/followings/${username}`, {
                    headers: { 'x-access-token': token },
                });

                console.log("Ответ от сервера (подписчики):", followersResponse.data);
                console.log("Ответ от сервера (подписки):", followingResponse.data);

                // ✅ Устанавливаем количество подписчиков и подписок
                setFollowers(followersResponse.data.followers.length || 0);
                setFollowing(followingResponse.data.following.length || 0);

            } catch (error) {
                console.error("Ошибка при запросе данных подписчиков/подписок:", error);
            }
        };

        fetchFollowData();
    }, [username, token]); // 🔥 Запрос делается только когда username установлен

    return (
        <div className="container">
            <div className='profile-container'>
                <div className="cover-image"></div>
                <div className="profile-content">
                    <div className="profile-image">
                        <img src={avatar || "https://via.placeholder.com/80"} alt="Avatar" />
                    </div>
                    <div className="profile-info">
                        <h2 className="name">{fullName} <FaCheckCircle className="verified" /></h2>
                        <div className="connections">
                            <p><strong>Подписчики:</strong> {followers}</p>
                            <p><strong>Подписки:</strong> {following}</p>
                        </div>
                        <p className="details">
                            <span className="role">Front-end Developer</span>
                            <span className="location"><FaMapMarkerAlt /> from the server</span>
                            <span className="joined"><FaCalendarAlt /> Age - {age || "Не указан"}</span>
                        </p>
                    </div>
                </div>

                <div className='customPanel'>
                    <CustomPanel />
                </div>
            </div>
        </div>
    );
};

export default Profile;
