import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './header.scss'
import axios from 'axios';


const Header = () => {

    const [avatar, setAvatar] = useState('');
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
                        'x-access-token': token, // вместо Authorization: Bearer (Это был треш!)
                    },
                });
                console.log("Ответ от сервера:", response.data);
                setAvatar(response.data.avatar);
            } catch (error) {
                console.error("Ошибка при запросе данных:", error);
            }
        };

        fetchUserName();
    }, [token]);

    return (
        <header className="header">
            <div className="header-container">
                {/* Лого */}
                <a href="/profile" className="logo">MySocial</a>

                {/* Поиск */}
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>

                {/* Правый блок */}
                <div className="right-section">
                    <a href="/link1" className="nav-link">Link 1</a>
                    <a href="/link2" className="nav-link">Link 2</a>
                    <a href="/link3" className="nav-link">Link 3</a>

                    {/* Аватарка */}
                    <a href="/profile" className="profile-link">
                        <img src={avatar} alt="Profile" className="profile-img" />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;