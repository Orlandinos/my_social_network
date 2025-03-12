import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './header.scss';
import axios from 'axios';

import Search from '../search/Search';

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
                        'x-access-token': token,
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
                    <Search />
                </div>

                {/* Правый блок */}
                <div className="right-section">
                    <a href="/link1" className="nav-link">Link 1</a>
                    <a href="/settings" className="nav-link">settings</a>
                    <a href="/" className="nav-link">exit</a> {/* ✅ Ведет на регистрацию */}

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
