import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./search.scss";

const Search = () => {
    const [query, setQuery] = useState(""); // Что вводит пользователь
    const [results, setResults] = useState([]); // Список найденных пользователей
    const [allUsers, setAllUsers] = useState([]); // Полный список пользователей
    const [showAllUsers, setShowAllUsers] = useState(false); // Флаг для отображения полного списка
    const token = useSelector((state) => state.auth?.token);
    const navigate = useNavigate();

    useEffect(() => {
        // Загружаем полный список пользователей при монтировании
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get("http://49.13.31.246:9191/users", {
                    headers: { "x-access-token": token },
                });
                setAllUsers(response.data);
            } catch (error) {
                console.error("Ошибка загрузки списка пользователей:", error);
            }
        };

        fetchAllUsers();
    }, [token]);

    useEffect(() => {
        if (query.length === 0) {
            setResults([]);
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://49.13.31.246:9191/users?query=${query}`, {
                    headers: { "x-access-token": token },
                });
                setResults(response.data);
            } catch (error) {
                console.error("Ошибка поиска:", error);
                setResults([]);
            }
        };

        fetchUsers();
    }, [query, token]);

    // ✅ Фильтрация списка по username и fullName перед рендером
    const filteredResults = query.length > 0 
        ? results.filter(user =>
            user.username.toLowerCase().startsWith(query.toLowerCase()) ||
            user.fullName.toLowerCase().startsWith(query.toLowerCase())
        )
        : showAllUsers ? allUsers : []; // Показываем весь список пользователей только если включен showAllUsers

    const handleUserClick = (username) => {
        navigate(`/user/${username}`);
        setQuery(""); 
        setResults([]);
        setShowAllUsers(false); // Закрываем список после выбора пользователя
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Поиск..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowAllUsers(true)} // Показываем список только при клике
                onBlur={() => setTimeout(() => setShowAllUsers(false), 200)} // Прячем список, если пользователь ушел с поля ввода
                className="search-input"
            />

            {filteredResults.length > 0 && (
                <ul className="search-results">
                    {filteredResults.map((user) => (
                        <li key={user._id} onClick={() => handleUserClick(user.username)}>
                            <img src={user.avatar || "https://via.placeholder.com/40"} alt="Avatar" />
                            {user.fullName} ({user.username}) {/* Отображаем fullName и username */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
