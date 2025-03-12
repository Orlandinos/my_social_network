import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./search.scss";

const Search = () => {
    const [query, setQuery] = useState(""); // Что вводит пользователь
    const [results, setResults] = useState([]); // Список найденных пользователей
    const token = useSelector((state) => state.auth?.token);
    const navigate = useNavigate();

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

    // ✅ Фильтрация списка перед рендером
    const filteredResults = results.filter(user =>
        user.fullName.toLowerCase().startsWith(query.toLowerCase()) // Оставляем только те, что начинаются с query
    );

    const handleUserClick = (username) => {
        navigate(`/user/${username}`);
        setQuery(""); 
        setResults([]);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Поиск..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />

            {filteredResults.length > 0 && (
                <ul className="search-results">
                    {filteredResults.map((user) => (
                        <li key={user._id} onClick={() => handleUserClick(user.username)}>
                            <img src={user.avatar || "https://via.placeholder.com/40"} alt="Avatar" />
                            {user.fullName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
